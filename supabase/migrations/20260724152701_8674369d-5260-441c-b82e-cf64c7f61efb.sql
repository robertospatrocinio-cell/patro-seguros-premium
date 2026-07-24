ALTER TABLE public.conversion_click_events
  ADD COLUMN IF NOT EXISTS lcp_ms integer,
  ADD COLUMN IF NOT EXISTS inp_ms integer,
  ADD COLUMN IF NOT EXISTS tbt_ms integer,
  ADD COLUMN IF NOT EXISTS cls double precision,
  ADD COLUMN IF NOT EXISTS device_type text,
  ADD COLUMN IF NOT EXISTS connection_type text;

CREATE INDEX IF NOT EXISTS idx_conversion_click_events_session
  ON public.conversion_click_events (session_id, created_at DESC);