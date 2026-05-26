DROP POLICY IF EXISTS "Users can view relationship rules" ON public.relationship_rules;

CREATE POLICY "Admins can view relationship rules"
ON public.relationship_rules
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));