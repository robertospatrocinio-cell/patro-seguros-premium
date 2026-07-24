
CREATE TABLE public.monitored_urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL UNIQUE,
  label text,
  active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.monitored_urls TO authenticated;
GRANT ALL ON public.monitored_urls TO service_role;

ALTER TABLE public.monitored_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view monitored_urls"
  ON public.monitored_urls FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert monitored_urls"
  ON public.monitored_urls FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update monitored_urls"
  ON public.monitored_urls FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete monitored_urls"
  ON public.monitored_urls FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_monitored_urls_updated_at
  BEFORE UPDATE ON public.monitored_urls
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

INSERT INTO public.monitored_urls (url) VALUES
  ('https://www.patroseguros.com.br/planos-saude-senior-guarulhos'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras'),
  ('https://www.patroseguros.com.br/lp/seguro-acidentes-pessoais'),
  ('https://www.patroseguros.com.br/seguro-carta-verde'),
  ('https://www.patroseguros.com.br/como-comparar-seguradoras-guarulhos'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras/porto-seguro'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras/mapfre'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras/allianz'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras/bradesco-seguros'),
  ('https://www.patroseguros.com.br/seguradoras-parceiras/hdi')
ON CONFLICT (url) DO NOTHING;
