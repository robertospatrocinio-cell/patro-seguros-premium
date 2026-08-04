CREATE TABLE IF NOT EXISTS public.sitemap_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    filename text NOT NULL,
    hash text NOT NULL,
    submitted_at timestamptz DEFAULT now(),
    UNIQUE (filename, hash)
);

GRANT SELECT, INSERT ON public.sitemap_history TO authenticated;
GRANT ALL ON public.sitemap_history TO service_role;

ALTER TABLE public.sitemap_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated reads on sitemap_history"
ON public.sitemap_history FOR SELECT
TO authenticated
USING (true);
