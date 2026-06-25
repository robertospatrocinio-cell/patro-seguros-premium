CREATE TABLE IF NOT EXISTS public.seo_rich_results_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checked_at timestamptz NOT NULL DEFAULT now(),
  total_errors integer NOT NULL DEFAULT 0,
  total_warnings integer NOT NULL DEFAULT 0,
  summary jsonb NOT NULL,
  issues jsonb NOT NULL
);

GRANT SELECT ON public.seo_rich_results_checks TO authenticated;
GRANT ALL ON public.seo_rich_results_checks TO service_role;

ALTER TABLE public.seo_rich_results_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read rich results checks"
ON public.seo_rich_results_checks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_seo_rrc_checked_at
  ON public.seo_rich_results_checks (checked_at DESC);

CREATE OR REPLACE FUNCTION public.trigger_monitor_rich_results()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM
    net.http_post(
      url := (SELECT value FROM settings WHERE key = 'supabase_url') || '/functions/v1/monitor-rich-results',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (SELECT value FROM settings WHERE key = 'supabase_service_role_key')
      ),
      body := '{}'
    );
END;
$$;

DO $$
BEGIN
  PERFORM cron.unschedule('monitor-rich-results-weekly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'monitor-rich-results-weekly',
  '0 9 * * 1',
  $$SELECT public.trigger_monitor_rich_results();$$
);