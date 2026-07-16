
CREATE TABLE public.web_vitals_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL CHECK (metric_name IN ('LCP','CLS','INP','FCP','TTFB')),
  value DOUBLE PRECISION NOT NULL,
  rating TEXT NOT NULL CHECK (rating IN ('good','needs-improvement','poor')),
  page TEXT NOT NULL,
  device_type TEXT,
  connection_type TEXT,
  user_agent TEXT,
  session_id TEXT,
  metric_id TEXT,
  phase TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_wv_created_at ON public.web_vitals_metrics (created_at DESC);
CREATE INDEX idx_wv_metric_page ON public.web_vitals_metrics (metric_name, page);
CREATE INDEX idx_wv_device ON public.web_vitals_metrics (device_type, metric_name);

GRANT ALL ON public.web_vitals_metrics TO service_role;
GRANT SELECT ON public.web_vitals_metrics TO authenticated;

ALTER TABLE public.web_vitals_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read web vitals"
ON public.web_vitals_metrics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
