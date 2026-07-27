CREATE TABLE public.breadcrumb_overrides (
  slug TEXT PRIMARY KEY,
  category_label TEXT,
  category_href TEXT,
  pillar_label TEXT,
  pillar_href TEXT,
  notes TEXT,
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.breadcrumb_overrides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.breadcrumb_overrides TO authenticated;
GRANT ALL ON public.breadcrumb_overrides TO service_role;

ALTER TABLE public.breadcrumb_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "breadcrumb_overrides_public_read"
  ON public.breadcrumb_overrides FOR SELECT
  USING (true);

CREATE POLICY "breadcrumb_overrides_admin_insert"
  ON public.breadcrumb_overrides FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "breadcrumb_overrides_admin_update"
  ON public.breadcrumb_overrides FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "breadcrumb_overrides_admin_delete"
  ON public.breadcrumb_overrides FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER breadcrumb_overrides_set_updated_at
  BEFORE UPDATE ON public.breadcrumb_overrides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();