CREATE TABLE public.schema_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_path TEXT NOT NULL,
  has_breadcrumb BOOLEAN NOT NULL DEFAULT false,
  has_faq BOOLEAN NOT NULL DEFAULT false,
  has_rating BOOLEAN NOT NULL DEFAULT false,
  errors JSONB DEFAULT '[]'::jsonb
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.schema_audits TO authenticated;
GRANT ALL ON public.schema_audits TO service_role;

ALTER TABLE public.schema_audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage schema audits" ON public.schema_audits
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Adding a simple index for performance on historical queries
CREATE INDEX idx_schema_audits_executed_at ON public.schema_audits(executed_at DESC);
CREATE INDEX idx_schema_audits_page_path ON public.schema_audits(page_path);