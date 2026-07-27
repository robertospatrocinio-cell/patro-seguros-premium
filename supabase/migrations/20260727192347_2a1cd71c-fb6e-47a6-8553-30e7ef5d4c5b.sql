ALTER TABLE public.internal_link_click_events
  ADD COLUMN IF NOT EXISTS event_kind text NOT NULL DEFAULT 'click';

CREATE INDEX IF NOT EXISTS internal_link_click_events_event_kind_created_at_idx
  ON public.internal_link_click_events (event_kind, created_at DESC);