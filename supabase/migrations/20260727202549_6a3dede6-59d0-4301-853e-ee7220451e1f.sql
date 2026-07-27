CREATE TABLE IF NOT EXISTS public.anchor_priorities (
  anchor text PRIMARY KEY,
  score numeric NOT NULL DEFAULT 0,
  conversion_rate numeric NOT NULL DEFAULT 0,
  sessions integer NOT NULL DEFAULT 0,
  converting_sessions integer NOT NULL DEFAULT 0,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  position numeric,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.anchor_priorities TO anon, authenticated;
GRANT ALL ON public.anchor_priorities TO service_role;

ALTER TABLE public.anchor_priorities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anchor_priorities_public_read"
  ON public.anchor_priorities FOR SELECT
  USING (true);