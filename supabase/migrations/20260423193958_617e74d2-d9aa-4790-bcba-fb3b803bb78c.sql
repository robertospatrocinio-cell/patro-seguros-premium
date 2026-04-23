CREATE TABLE public.conversion_click_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('cotacao_click', 'whatsapp_click')),
  source TEXT,
  page_path TEXT,
  analytics_loaded BOOLEAN NOT NULL DEFAULT false,
  seconds_since_page_start NUMERIC(10,3),
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.conversion_click_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register conversion click events"
ON public.conversion_click_events
FOR INSERT
WITH CHECK (event_type IN ('cotacao_click', 'whatsapp_click'));

CREATE POLICY "Anyone can view conversion click events dashboard"
ON public.conversion_click_events
FOR SELECT
USING (true);

CREATE INDEX idx_conversion_click_events_created_at
ON public.conversion_click_events (created_at DESC);

CREATE INDEX idx_conversion_click_events_type_loaded
ON public.conversion_click_events (event_type, analytics_loaded, created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.conversion_click_events;