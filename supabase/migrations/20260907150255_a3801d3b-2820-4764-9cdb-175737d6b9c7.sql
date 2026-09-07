CREATE TABLE public.content_overrides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scope text NOT NULL CHECK (scope IN ('cidade','blog')),
  slug text NOT NULL,
  title text,
  summary text,
  intro text,
  body text,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  published boolean NOT NULL DEFAULT false,
  notes text,
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (scope, slug)
);

GRANT SELECT ON public.content_overrides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_overrides TO authenticated;
GRANT ALL ON public.content_overrides TO service_role;

ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_overrides_public_read_published"
ON public.content_overrides FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "content_overrides_admin_read"
ON public.content_overrides FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "content_overrides_admin_insert"
ON public.content_overrides FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "content_overrides_admin_update"
ON public.content_overrides FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "content_overrides_admin_delete"
ON public.content_overrides FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER content_overrides_set_updated_at
BEFORE UPDATE ON public.content_overrides
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();