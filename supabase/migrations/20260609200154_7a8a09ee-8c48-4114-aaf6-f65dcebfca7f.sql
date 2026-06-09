DROP POLICY IF EXISTS "Admins can manage schema audits" ON public.schema_audits;

CREATE POLICY "Only admins can manage schema audits" ON public.schema_audits
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));