-- Restrict purge_logs SELECT access to admin users only.
-- Currently no SELECT policy exists for authenticated, but adding an
-- explicit admin-only policy makes the intent clear and protects against
-- any future overly-permissive policy additions.

CREATE POLICY "Admins can view purge logs"
ON public.purge_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));