DROP POLICY IF EXISTS "Only authenticated users can view leads" ON public.leads;

CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));