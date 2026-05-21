-- Fix search_path for the trigger function
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Drop and recreate policies with better security practices (using auth.uid() checks if possible, or roles)
DROP POLICY IF EXISTS "Admins can do everything on contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can do everything on contact_insurances" ON public.contact_insurances;

-- For contacts
CREATE POLICY "Admins can do everything on contacts" 
ON public.contacts 
FOR ALL 
TO authenticated
USING (
  (SELECT (raw_app_meta_data->>'role') FROM auth.users WHERE id = auth.uid()) = 'admin'
);

-- For contact_insurances
CREATE POLICY "Admins can do everything on contact_insurances" 
ON public.contact_insurances 
FOR ALL 
TO authenticated
USING (
  (SELECT (raw_app_meta_data->>'role') FROM auth.users WHERE id = auth.uid()) = 'admin'
);

-- Refine storage policy
DROP POLICY IF EXISTS "Admins can manage crm documents" ON storage.objects;
CREATE POLICY "Admins can manage crm documents"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'crm_documents' AND 
  (SELECT (raw_app_meta_data->>'role') FROM auth.users WHERE id = auth.uid()) = 'admin'
);
