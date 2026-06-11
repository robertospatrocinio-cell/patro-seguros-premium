DROP POLICY IF EXISTS "Quote history insert validated" ON public.lead_quote_history;
REVOKE INSERT ON public.lead_quote_history FROM anon;
REVOKE INSERT ON public.lead_quote_history FROM authenticated;