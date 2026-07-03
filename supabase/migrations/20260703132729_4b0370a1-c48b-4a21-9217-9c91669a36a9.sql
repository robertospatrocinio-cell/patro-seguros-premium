
CREATE TABLE public.seo_audit_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  total_urls INTEGER NOT NULL DEFAULT 0,
  passed INTEGER NOT NULL DEFAULT 0,
  warned INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  new_failures INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER,
  triggered_by TEXT NOT NULL DEFAULT 'cron',
  alert_sent BOOLEAN NOT NULL DEFAULT false,
  error_message TEXT
);
CREATE INDEX idx_seo_audit_runs_started ON public.seo_audit_runs(started_at DESC);

GRANT SELECT ON public.seo_audit_runs TO authenticated;
GRANT ALL ON public.seo_audit_runs TO service_role;
ALTER TABLE public.seo_audit_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read seo_audit_runs" ON public.seo_audit_runs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.seo_audit_findings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES public.seo_audit_runs(id) ON DELETE CASCADE,
  route TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('error','warn')),
  rule TEXT NOT NULL,
  message TEXT NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT false,
  ignored BOOLEAN NOT NULL DEFAULT false,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_seo_findings_run ON public.seo_audit_findings(run_id);
CREATE INDEX idx_seo_findings_route_rule ON public.seo_audit_findings(route, rule);
CREATE INDEX idx_seo_findings_severity ON public.seo_audit_findings(severity) WHERE ignored = false;

GRANT SELECT, UPDATE ON public.seo_audit_findings TO authenticated;
GRANT ALL ON public.seo_audit_findings TO service_role;
ALTER TABLE public.seo_audit_findings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read seo_audit_findings" ON public.seo_audit_findings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update seo_audit_findings" ON public.seo_audit_findings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
