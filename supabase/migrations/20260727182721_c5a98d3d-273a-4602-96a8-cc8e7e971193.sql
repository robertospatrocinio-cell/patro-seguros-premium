CREATE TABLE public.internal_link_click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  placement text NOT NULL,
  source text NOT NULL,
  destination text NOT NULL,
  label text,
  page_path text NOT NULL,
  session_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  device_type text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ilc_destination_created_at
  ON public.internal_link_click_events (destination, created_at DESC);
CREATE INDEX idx_ilc_source_created_at
  ON public.internal_link_click_events (source, created_at DESC);
CREATE INDEX idx_ilc_created_at
  ON public.internal_link_click_events (created_at DESC);

GRANT INSERT ON public.internal_link_click_events TO anon, authenticated;
GRANT SELECT ON public.internal_link_click_events TO authenticated;
GRANT ALL ON public.internal_link_click_events TO service_role;

ALTER TABLE public.internal_link_click_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public insert internal link clicks"
  ON public.internal_link_click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "admins read internal link clicks"
  ON public.internal_link_click_events
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));