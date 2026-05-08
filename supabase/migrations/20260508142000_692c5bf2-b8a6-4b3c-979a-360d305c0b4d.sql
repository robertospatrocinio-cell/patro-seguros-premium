
CREATE TABLE IF NOT EXISTS public.pagespeed_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  strategy text NOT NULL CHECK (strategy IN ('mobile','desktop')),
  performance_score integer,
  accessibility_score integer,
  best_practices_score integer,
  seo_score integer,
  lcp_ms numeric,
  fcp_ms numeric,
  tbt_ms numeric,
  cls numeric,
  speed_index_ms numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pagespeed_audits_created_at ON public.pagespeed_audits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pagespeed_audits_url_strategy ON public.pagespeed_audits (url, strategy, created_at DESC);

ALTER TABLE public.pagespeed_audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pagespeed audits"
  ON public.pagespeed_audits FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert pagespeed audits"
  ON public.pagespeed_audits FOR INSERT
  TO service_role
  WITH CHECK (true);
