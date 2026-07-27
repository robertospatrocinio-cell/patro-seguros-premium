CREATE TABLE public.internal_link_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  destination TEXT NOT NULL,
  placement TEXT NOT NULL,
  sources TEXT[] NOT NULL DEFAULT '{}',
  score NUMERIC,
  reason TEXT,
  period_days INTEGER,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  applied_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX internal_link_applications_dedupe_idx
  ON public.internal_link_applications (destination, placement, sources);

CREATE INDEX internal_link_applications_applied_at_idx
  ON public.internal_link_applications (applied_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.internal_link_applications TO authenticated;
GRANT ALL ON public.internal_link_applications TO service_role;

ALTER TABLE public.internal_link_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view internal link applications"
  ON public.internal_link_applications FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert internal link applications"
  ON public.internal_link_applications FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND applied_by = auth.uid());

CREATE POLICY "Admins can update internal link applications"
  ON public.internal_link_applications FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete internal link applications"
  ON public.internal_link_applications FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_internal_link_applications_updated_at
  BEFORE UPDATE ON public.internal_link_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();