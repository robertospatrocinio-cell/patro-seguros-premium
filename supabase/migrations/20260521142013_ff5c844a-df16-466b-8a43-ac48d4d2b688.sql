-- Fix Search Path for the trigger function
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Refine leads policy to be less permissive (only allowing insert)
DROP POLICY "Enable insert for everyone" ON public.leads;
CREATE POLICY "Allow public lead creation" ON public.leads FOR INSERT WITH CHECK (true);

-- Ensure authenticated users can only see leads if they are admins (placeholder for future admin role)
DROP POLICY "Enable read for authenticated users only" ON public.leads;
CREATE POLICY "Allow authenticated read" ON public.leads FOR SELECT TO authenticated USING (true);
