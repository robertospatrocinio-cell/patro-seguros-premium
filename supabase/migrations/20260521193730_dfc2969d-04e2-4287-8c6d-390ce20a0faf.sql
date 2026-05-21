-- Grant execute on the has_role function to all authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Reforce/Reset RLS policies for contacts to ensure clean access
DROP POLICY IF EXISTS "Admins manage all contacts" ON public.contacts;
CREATE POLICY "Admins manage all contacts" 
ON public.contacts 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reforce/Reset RLS policies for contact_insurances
DROP POLICY IF EXISTS "Admins manage all contact_insurances" ON public.contact_insurances;
CREATE POLICY "Admins manage all contact_insurances" 
ON public.contact_insurances 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reforce/Reset RLS policies for interactions
DROP POLICY IF EXISTS "Admins manage interactions" ON public.interactions;
CREATE POLICY "Admins manage interactions" 
ON public.interactions 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reforce/Reset RLS policies for tasks
DROP POLICY IF EXISTS "Admins manage tasks" ON public.tasks;
CREATE POLICY "Admins manage tasks" 
ON public.tasks 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reforce/Reset RLS policies for policies
DROP POLICY IF EXISTS "Admins manage policies" ON public.policies;
CREATE POLICY "Admins manage policies" 
ON public.policies 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Ensure user_roles can be checked during RLS execution
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_roles TO service_role;
