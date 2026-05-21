-- Drop the problematic policy that tries to access auth.users directly
DROP POLICY IF EXISTS "Admins can do everything on contacts" ON public.contacts;

-- Create a new policy for contacts using the user_roles table or app_metadata via auth.jwt()
-- Using auth.jwt() is the standard way to check metadata in RLS without querying auth.users
CREATE POLICY "Admins can manage contacts" 
ON public.contacts 
FOR ALL 
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  OR 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Ensure leads table has correct admin access
DROP POLICY IF EXISTS "Only admins can view leads" ON public.leads;
CREATE POLICY "Admins can manage leads" 
ON public.leads 
FOR ALL 
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  OR 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Grant access to the user_roles table itself for check
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);
