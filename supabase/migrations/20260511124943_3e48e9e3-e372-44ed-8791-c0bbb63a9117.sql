-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

-- Create a more restrictive policy with field validation
CREATE POLICY "Anyone can submit a valid lead"
ON public.leads
FOR INSERT
WITH CHECK (
  full_name IS NOT NULL AND length(trim(full_name)) > 2 AND
  email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  phone IS NOT NULL AND length(trim(phone)) >= 8
);