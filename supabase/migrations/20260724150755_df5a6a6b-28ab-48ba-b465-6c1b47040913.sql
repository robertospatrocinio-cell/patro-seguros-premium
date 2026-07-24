
CREATE TABLE public.gsc_indexation_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  coverage_state TEXT,
  indexing_state TEXT,
  verdict TEXT,
  last_crawl_time TIMESTAMPTZ,
  google_canonical TEXT,
  user_canonical TEXT,
  page_fetch_state TEXT,
  robots_txt_state TEXT,
  raw JSONB,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_gsc_idx_url_checked ON public.gsc_indexation_status (url, checked_at DESC);
GRANT SELECT ON public.gsc_indexation_status TO authenticated;
GRANT ALL ON public.gsc_indexation_status TO service_role;
ALTER TABLE public.gsc_indexation_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read gsc status" ON public.gsc_indexation_status FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gsc_indexation_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  previous_state TEXT,
  new_state TEXT NOT NULL,
  transition_type TEXT NOT NULL,
  notified_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_gsc_alerts_notified ON public.gsc_indexation_alerts (notified_at DESC);
GRANT SELECT ON public.gsc_indexation_alerts TO authenticated;
GRANT ALL ON public.gsc_indexation_alerts TO service_role;
ALTER TABLE public.gsc_indexation_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read gsc alerts" ON public.gsc_indexation_alerts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
