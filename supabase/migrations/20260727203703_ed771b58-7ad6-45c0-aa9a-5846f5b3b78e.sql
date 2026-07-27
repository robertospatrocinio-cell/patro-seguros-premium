
CREATE TABLE public.anchor_priority_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anchor TEXT NOT NULL,
  snapshot_date DATE NOT NULL,
  score NUMERIC NOT NULL DEFAULT 0,
  conversion_rate NUMERIC NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0,
  converting_sessions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  position NUMERIC,
  top_pathname TEXT,
  whatsapp_conversions INTEGER NOT NULL DEFAULT 0,
  cotacao_conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (anchor, snapshot_date)
);
CREATE INDEX idx_anchor_history_date ON public.anchor_priority_history (snapshot_date DESC);
CREATE INDEX idx_anchor_history_anchor ON public.anchor_priority_history (anchor, snapshot_date DESC);
GRANT SELECT ON public.anchor_priority_history TO authenticated;
GRANT ALL ON public.anchor_priority_history TO service_role;
ALTER TABLE public.anchor_priority_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read anchor history" ON public.anchor_priority_history
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.anchor_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anchor TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('sustained_potential', 'efficiency_drop')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'dismissed')),
  streak_days INTEGER NOT NULL DEFAULT 1,
  first_detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  cluster_id TEXT,
  top_pathname TEXT,
  current_score NUMERIC,
  current_conversion_rate NUMERIC,
  previous_conversion_rate NUMERIC,
  metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_anchor_alerts_open_unique
  ON public.anchor_alerts (anchor, kind)
  WHERE status = 'open';
CREATE INDEX idx_anchor_alerts_status ON public.anchor_alerts (status, last_detected_at DESC);

GRANT SELECT, UPDATE ON public.anchor_alerts TO authenticated;
GRANT ALL ON public.anchor_alerts TO service_role;
ALTER TABLE public.anchor_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read anchor alerts" ON public.anchor_alerts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update anchor alerts" ON public.anchor_alerts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER anchor_alerts_updated_at
  BEFORE UPDATE ON public.anchor_alerts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
