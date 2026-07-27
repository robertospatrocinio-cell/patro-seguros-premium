ALTER TABLE public.internal_link_click_events
  ADD COLUMN IF NOT EXISTS anchor text;

CREATE INDEX IF NOT EXISTS idx_ilc_anchor_created_at
  ON public.internal_link_click_events (anchor, created_at DESC)
  WHERE anchor IS NOT NULL;