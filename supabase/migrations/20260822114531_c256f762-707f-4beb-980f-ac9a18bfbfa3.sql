CREATE TABLE public.domain_health_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hostname text NOT NULL,
  checked_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('ok','drifted','error')),
  reasons jsonb NOT NULL DEFAULT '[]'::jsonb,
  dns_a text[] NOT NULL DEFAULT '{}',
  dns_cname text[] NOT NULL DEFAULT '{}',
  txt_lovable text[] NOT NULL DEFAULT '{}',
  expected_ip text,
  http_status integer,
  final_url text,
  redirect_chain jsonb NOT NULL DEFAULT '[]'::jsonb,
  details jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_domain_health_checks_host_time ON public.domain_health_checks (hostname, checked_at DESC);

GRANT SELECT ON public.domain_health_checks TO authenticated;
GRANT ALL ON public.domain_health_checks TO service_role;

ALTER TABLE public.domain_health_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view domain health checks"
  ON public.domain_health_checks FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));