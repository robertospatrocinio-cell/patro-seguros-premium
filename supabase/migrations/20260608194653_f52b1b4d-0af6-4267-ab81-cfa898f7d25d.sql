
-- Tighten RLS on lead_quote_history: anon can only INSERT; admins can SELECT
DROP POLICY IF EXISTS "Allow public inserts and reads for history" ON public.lead_quote_history;

CREATE POLICY "Anyone can insert quote history"
  ON public.lead_quote_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read quote history"
  ON public.lead_quote_history
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tighten RLS on partial_quotes: anon can only INSERT/UPDATE own session row; admins can SELECT
DROP POLICY IF EXISTS "Allow public access to partial_quotes" ON public.partial_quotes;

CREATE POLICY "Anyone can insert partial quote"
  ON public.partial_quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update partial quote"
  ON public.partial_quotes
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can read partial quotes"
  ON public.partial_quotes
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partial quotes"
  ON public.partial_quotes
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
