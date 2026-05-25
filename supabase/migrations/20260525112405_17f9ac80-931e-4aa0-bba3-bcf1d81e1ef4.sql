
-- Fix interactions: restrict to admins
DROP POLICY IF EXISTS "Users can view all interactions" ON public.interactions;
DROP POLICY IF EXISTS "Users can insert interactions" ON public.interactions;

-- Fix customer_responsible_history: restrict to admins
DROP POLICY IF EXISTS "Users can view all history" ON public.customer_responsible_history;
CREATE POLICY "Admins view customer responsible history"
ON public.customer_responsible_history
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Fix storage policy: use has_role() instead of mutable app_meta_data
DROP POLICY IF EXISTS "Admins can manage crm documents" ON storage.objects;
CREATE POLICY "Admins can manage crm documents"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'crm_documents' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'crm_documents' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Revoke EXECUTE on SECURITY DEFINER functions that shouldn't be callable directly by signed-in users.
-- These are trigger functions or internal helpers; only the database/triggers need to call them.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.validate_lead_data() FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.rate_limit_leads_trigger() FROM PUBLIC, authenticated, anon;
