-- 1. anchor_priorities: admin-only read
DROP POLICY IF EXISTS anchor_priorities_public_read ON public.anchor_priorities;
REVOKE SELECT ON public.anchor_priorities FROM anon;
CREATE POLICY anchor_priorities_admin_read ON public.anchor_priorities
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. breadcrumb_overrides: hide internal columns from public readers
REVOKE SELECT ON public.breadcrumb_overrides FROM anon, authenticated;
GRANT SELECT (slug, category_label, category_href, pillar_label, pillar_href, created_at, updated_at)
  ON public.breadcrumb_overrides TO anon;
GRANT SELECT (slug, category_label, category_href, pillar_label, pillar_href, created_at, updated_at)
  ON public.breadcrumb_overrides TO authenticated;
GRANT SELECT (notes, updated_by) ON public.breadcrumb_overrides TO authenticated;
DROP POLICY IF EXISTS breadcrumb_overrides_public_read ON public.breadcrumb_overrides;
CREATE POLICY breadcrumb_overrides_public_read ON public.breadcrumb_overrides
  FOR SELECT USING (true);

-- 3. referrals: validate publicly inserted data
ALTER TABLE public.referrals
  ADD CONSTRAINT referrals_referred_name_valid
    CHECK (char_length(btrim(referred_name)) BETWEEN 2 AND 120) NOT VALID,
  ADD CONSTRAINT referrals_referred_email_valid
    CHECK (referred_email IS NULL OR (char_length(referred_email) <= 254 AND referred_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')) NOT VALID,
  ADD CONSTRAINT referrals_referrer_email_valid
    CHECK (referrer_email IS NULL OR (char_length(referrer_email) <= 254 AND referrer_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')) NOT VALID,
  ADD CONSTRAINT referrals_referred_phone_valid
    CHECK (referred_phone IS NULL OR char_length(referred_phone) BETWEEN 8 AND 30) NOT VALID,
  ADD CONSTRAINT referrals_referrer_phone_valid
    CHECK (referrer_phone IS NULL OR char_length(referrer_phone) BETWEEN 8 AND 30) NOT VALID,
  ADD CONSTRAINT referrals_referrer_name_valid
    CHECK (referrer_name IS NULL OR char_length(referrer_name) <= 120) NOT VALID,
  ADD CONSTRAINT referrals_text_len_valid
    CHECK (
      (insurance_type_interest IS NULL OR char_length(insurance_type_interest) <= 100)
      AND (referrer_relationship IS NULL OR char_length(referrer_relationship) <= 100)
      AND (notes IS NULL OR char_length(notes) <= 2000)
      AND (source_page IS NULL OR char_length(source_page) <= 300)
      AND (user_agent IS NULL OR char_length(user_agent) <= 500)
    ) NOT VALID;