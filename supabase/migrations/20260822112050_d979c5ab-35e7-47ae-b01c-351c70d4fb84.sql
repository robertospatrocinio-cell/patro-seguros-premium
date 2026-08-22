DROP POLICY IF EXISTS "Service role can insert send log" ON public.email_send_log;
DROP POLICY IF EXISTS "Service role can read send log" ON public.email_send_log;
DROP POLICY IF EXISTS "Service role can update send log" ON public.email_send_log;
CREATE POLICY "Service role can insert send log" ON public.email_send_log FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role can read send log" ON public.email_send_log FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can update send log" ON public.email_send_log FOR UPDATE TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage send state" ON public.email_send_state;
CREATE POLICY "Service role can manage send state" ON public.email_send_state FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can insert tokens" ON public.email_unsubscribe_tokens;
DROP POLICY IF EXISTS "Service role can read tokens" ON public.email_unsubscribe_tokens;
DROP POLICY IF EXISTS "Service role can mark tokens as used" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can insert tokens" ON public.email_unsubscribe_tokens FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role can read tokens" ON public.email_unsubscribe_tokens FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can mark tokens as used" ON public.email_unsubscribe_tokens FOR UPDATE TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can insert suppressed emails" ON public.suppressed_emails;
DROP POLICY IF EXISTS "Service role can read suppressed emails" ON public.suppressed_emails;
DROP POLICY IF EXISTS "Service role can delete suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Service role can insert suppressed emails" ON public.suppressed_emails FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role can read suppressed emails" ON public.suppressed_emails FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can delete suppressed emails" ON public.suppressed_emails FOR DELETE TO service_role USING (true);

DROP POLICY IF EXISTS "Anyone can create referrals" ON public.referrals;
CREATE POLICY "Anyone can create referrals"
ON public.referrals FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(referred_name)) BETWEEN 2 AND 120
  AND (referred_email IS NOT NULL OR referred_phone IS NOT NULL)
  AND (status IS NULL OR status = 'pendente')
  AND (reward_given IS NULL OR reward_given = false)
  AND conversion_date IS NULL
);