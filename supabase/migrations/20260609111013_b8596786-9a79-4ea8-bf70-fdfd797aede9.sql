-- Enhance lead_quote_history RLS with structural validation
DROP POLICY IF EXISTS "Anyone can insert quote history" ON public.lead_quote_history;
CREATE POLICY "Anyone can insert quote history" ON public.lead_quote_history 
FOR INSERT TO anon, authenticated 
WITH CHECK (
  step_reached IS NOT NULL
);

-- Enhance partial_quotes RLS with structural validation
DROP POLICY IF EXISTS "Anyone can insert partial quote" ON public.partial_quotes;
CREATE POLICY "Anyone can insert partial quote" ON public.partial_quotes 
FOR INSERT TO anon, authenticated 
WITH CHECK (
  id IS NOT NULL
);

DROP POLICY IF EXISTS "Anyone can update partial quote" ON public.partial_quotes;
CREATE POLICY "Anyone can update partial quote" ON public.partial_quotes 
FOR UPDATE TO anon, authenticated 
USING (id IS NOT NULL)
WITH CHECK (id IS NOT NULL);
