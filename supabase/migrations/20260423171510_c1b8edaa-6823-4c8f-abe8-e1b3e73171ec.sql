
CREATE TABLE public.purge_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  tags TEXT[],
  total_urls INTEGER NOT NULL DEFAULT 0,
  purged_urls TEXT[],
  results JSONB,
  success BOOLEAN NOT NULL DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.purge_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access on purge_logs"
ON public.purge_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anon read purge_logs"
ON public.purge_logs
FOR SELECT
TO anon
USING (true);
