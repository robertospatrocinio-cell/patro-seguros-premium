DROP POLICY IF EXISTS "Anyone can insert quote history" ON public.lead_quote_history;

CREATE POLICY "Quote history insert validated"
ON public.lead_quote_history
FOR INSERT
TO anon, authenticated
WITH CHECK (
  partial_quote_id IS NOT NULL
  AND step_reached IS NOT NULL
  AND step_reached BETWEEN 1 AND 10
  AND EXISTS (SELECT 1 FROM public.partial_quotes pq WHERE pq.id = partial_quote_id)
  AND (snapshot IS NULL OR pg_column_size(snapshot) < 8192)
);