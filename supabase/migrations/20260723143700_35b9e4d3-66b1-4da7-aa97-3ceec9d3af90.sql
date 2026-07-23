
CREATE OR REPLACE FUNCTION public.get_web_vitals_correlation(
  p_days integer DEFAULT 30,
  p_device text DEFAULT NULL
)
RETURNS TABLE (
  page text,
  device_type text,
  sessions bigint,
  p75_lcp double precision,
  p75_cls double precision,
  p75_inp double precision,
  good_lcp_pct numeric,
  good_cls_pct numeric,
  good_inp_pct numeric,
  conversions bigint,
  leads_count bigint,
  conversion_rate numeric,
  lead_rate numeric
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  WITH v AS (
    SELECT wv.page, wv.device_type, wv.session_id, wv.metric_name, wv.value, wv.rating
    FROM public.web_vitals_metrics wv
    WHERE wv.created_at >= now() - (p_days || ' days')::interval
      AND (p_device IS NULL OR wv.device_type = p_device)
      AND wv.page IS NOT NULL
  ),
  agg AS (
    SELECT
      v.page,
      v.device_type,
      COUNT(DISTINCT v.session_id) AS sessions,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY v.value) FILTER (WHERE v.metric_name = 'LCP') AS p75_lcp,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY v.value) FILTER (WHERE v.metric_name = 'CLS') AS p75_cls,
      percentile_cont(0.75) WITHIN GROUP (ORDER BY v.value) FILTER (WHERE v.metric_name = 'INP') AS p75_inp,
      ROUND(100.0 * COUNT(*) FILTER (WHERE v.metric_name = 'LCP' AND v.rating = 'good')
            / NULLIF(COUNT(*) FILTER (WHERE v.metric_name = 'LCP'), 0), 1) AS good_lcp_pct,
      ROUND(100.0 * COUNT(*) FILTER (WHERE v.metric_name = 'CLS' AND v.rating = 'good')
            / NULLIF(COUNT(*) FILTER (WHERE v.metric_name = 'CLS'), 0), 1) AS good_cls_pct,
      ROUND(100.0 * COUNT(*) FILTER (WHERE v.metric_name = 'INP' AND v.rating = 'good')
            / NULLIF(COUNT(*) FILTER (WHERE v.metric_name = 'INP'), 0), 1) AS good_inp_pct
    FROM v
    GROUP BY v.page, v.device_type
  ),
  conv AS (
    SELECT
      ce.page_path AS page,
      COALESCE(NULLIF(
        CASE
          WHEN ce.user_agent ILIKE '%mobile%' THEN 'mobile'
          WHEN ce.user_agent ILIKE '%tablet%' OR ce.user_agent ILIKE '%ipad%' THEN 'tablet'
          ELSE 'desktop'
        END, ''), 'desktop') AS device_type,
      COUNT(*) AS conversions
    FROM public.conversion_click_events ce
    WHERE ce.created_at >= now() - (p_days || ' days')::interval
      AND ce.page_path IS NOT NULL
    GROUP BY 1, 2
  ),
  ld AS (
    SELECT l.source_page AS page, COUNT(*) AS leads_count
    FROM public.leads l
    WHERE l.created_at >= now() - (p_days || ' days')::interval
      AND l.source_page IS NOT NULL
    GROUP BY 1
  )
  SELECT
    agg.page,
    agg.device_type,
    agg.sessions,
    agg.p75_lcp,
    agg.p75_cls,
    agg.p75_inp,
    agg.good_lcp_pct,
    agg.good_cls_pct,
    agg.good_inp_pct,
    COALESCE(conv.conversions, 0) AS conversions,
    COALESCE(ld.leads_count, 0) AS leads_count,
    ROUND(100.0 * COALESCE(conv.conversions, 0) / NULLIF(agg.sessions, 0), 2) AS conversion_rate,
    ROUND(100.0 * COALESCE(ld.leads_count, 0) / NULLIF(agg.sessions, 0), 2) AS lead_rate
  FROM agg
  LEFT JOIN conv ON conv.page = agg.page AND conv.device_type = agg.device_type
  LEFT JOIN ld ON ld.page = agg.page
  ORDER BY agg.sessions DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_web_vitals_correlation(integer, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_web_vitals_timeseries(
  p_metric text,
  p_page text DEFAULT NULL,
  p_device text DEFAULT NULL,
  p_days integer DEFAULT 30
)
RETURNS TABLE (
  day date,
  p75_value double precision,
  samples bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT
    date_trunc('day', wv.created_at)::date AS day,
    percentile_cont(0.75) WITHIN GROUP (ORDER BY wv.value) AS p75_value,
    COUNT(*) AS samples
  FROM public.web_vitals_metrics wv
  WHERE wv.created_at >= now() - (p_days || ' days')::interval
    AND wv.metric_name = p_metric
    AND (p_page IS NULL OR wv.page = p_page)
    AND (p_device IS NULL OR wv.device_type = p_device)
  GROUP BY 1
  ORDER BY 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_web_vitals_timeseries(text, text, text, integer) TO authenticated;
