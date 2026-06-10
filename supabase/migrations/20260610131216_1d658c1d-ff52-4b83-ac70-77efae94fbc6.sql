
-- Leads: remove direct anon insert; service role only
DROP POLICY IF EXISTS "Public lead insertion" ON public.leads;

CREATE POLICY "Service role can insert leads"
ON public.leads
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role');

-- Partial quotes: drop permissive anon insert/update; service role only
DROP POLICY IF EXISTS "Anyone can insert partial quote" ON public.partial_quotes;
DROP POLICY IF EXISTS "Anyone can update partial quote" ON public.partial_quotes;

CREATE POLICY "Service role can insert partial quotes"
ON public.partial_quotes
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update partial quotes"
ON public.partial_quotes
FOR UPDATE
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- customer_responsible_history: add service-role write policies
CREATE POLICY "Service role can insert customer responsible history"
ON public.customer_responsible_history
FOR INSERT
TO public
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update customer responsible history"
ON public.customer_responsible_history
FOR UPDATE
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can delete customer responsible history"
ON public.customer_responsible_history
FOR DELETE
TO public
USING (auth.role() = 'service_role');

-- suppressed_emails: add service-role delete policy
CREATE POLICY "Service role can delete suppressed emails"
ON public.suppressed_emails
FOR DELETE
TO public
USING (auth.role() = 'service_role');
