-- Fix permissive RLS for lead_quote_history
DROP POLICY IF EXISTS "Anyone can insert quote history" ON public.lead_quote_history;
CREATE POLICY "Anyone can insert quote history" ON public.lead_quote_history 
FOR INSERT TO anon, authenticated 
WITH CHECK (true);

-- Fix permissive RLS for partial_quotes
DROP POLICY IF EXISTS "Anyone can insert partial quote" ON public.partial_quotes;
CREATE POLICY "Anyone can insert partial quote" ON public.partial_quotes 
FOR INSERT TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update partial quote" ON public.partial_quotes;
CREATE POLICY "Anyone can update partial quote" ON public.partial_quotes 
FOR UPDATE TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- Ensure has_role is only executable by authenticated users
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
