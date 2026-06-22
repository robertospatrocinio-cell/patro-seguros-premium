
DROP POLICY IF EXISTS "Users can update their notifications" ON public.crm_notifications;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.crm_notifications;
CREATE POLICY "Users can view their own notifications" ON public.crm_notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.crm_notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

REVOKE INSERT, UPDATE, DELETE ON public.lead_quote_history FROM anon, authenticated;
CREATE POLICY "Deny client writes to lead_quote_history insert" ON public.lead_quote_history FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Deny client writes to lead_quote_history update" ON public.lead_quote_history FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Deny client writes to lead_quote_history delete" ON public.lead_quote_history FOR DELETE TO anon, authenticated USING (false);
