ALTER TABLE public.conversion_click_events
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS insurance_type text,
  ADD COLUMN IF NOT EXISTS origin text;

CREATE INDEX IF NOT EXISTS idx_conversion_click_events_utm_source
  ON public.conversion_click_events (utm_source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_click_events_origin
  ON public.conversion_click_events (origin, created_at DESC);