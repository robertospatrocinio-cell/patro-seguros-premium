-- Add ip_address column if it doesn't exist
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- Update the insert policy to be even more robust
DROP POLICY IF EXISTS "Anyone can submit a valid lead" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
ON public.leads
FOR INSERT
WITH CHECK (
  full_name IS NOT NULL AND length(trim(full_name)) >= 3 AND
  email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  phone IS NOT NULL AND length(trim(phone)) >= 10
);

-- Allow users to see leads they just submitted (best effort via IP if we track it, 
-- but usually leads don't need to be read back by the same anonymous user)
-- For now, we keep the SELECT policy as is (authenticated only) to prevent data leakage.
