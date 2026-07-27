-- 1. Novas colunas na tabela referrals
ALTER TABLE public.referrals
  ADD COLUMN IF NOT EXISTS referrer_name text,
  ADD COLUMN IF NOT EXISTS referrer_email text,
  ADD COLUMN IF NOT EXISTS referrer_phone text,
  ADD COLUMN IF NOT EXISTS referrer_relationship text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS source_page text,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text;

-- 2. Grants (anon pode INSERT via policy; SELECT continua restrito a admin)
GRANT INSERT ON public.referrals TO anon;
GRANT INSERT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;

-- 3. Validação básica anti-spam via trigger
CREATE OR REPLACE FUNCTION public.validate_referral_data()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.referred_name IS NULL OR length(trim(NEW.referred_name)) < 3 THEN
    RAISE EXCEPTION 'Nome do indicado inválido (mínimo 3 caracteres).';
  END IF;
  IF NEW.referrer_name IS NULL OR length(trim(NEW.referrer_name)) < 3 THEN
    RAISE EXCEPTION 'Seu nome é obrigatório (mínimo 3 caracteres).';
  END IF;
  IF NEW.referrer_email IS NULL OR NEW.referrer_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'E-mail do indicador inválido.';
  END IF;
  IF NEW.referred_phone IS NOT NULL AND length(regexp_replace(NEW.referred_phone, '\D', '', 'g')) < 10 THEN
    RAISE EXCEPTION 'Telefone do indicado inválido.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_referral ON public.referrals;
CREATE TRIGGER trg_validate_referral
BEFORE INSERT ON public.referrals
FOR EACH ROW EXECUTE FUNCTION public.validate_referral_data();

-- 4. Rate-limit trigger (3 envios / 5 min por IP)
CREATE OR REPLACE FUNCTION public.rate_limit_referrals_trigger()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_ip TEXT;
  v_is_allowed BOOLEAN;
BEGIN
  v_ip := COALESCE(
    NULLIF(current_setting('request.headers', true)::json->>'cf-connecting-ip', ''),
    NULLIF(current_setting('request.headers', true)::json->>'x-real-ip', ''),
    NULLIF(split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1), ''),
    NEW.ip_address,
    'unknown'
  );
  NEW.ip_address := v_ip;

  SELECT public.check_rate_limit('referrals_insert:' || v_ip, 300, 3) INTO v_is_allowed;
  IF NOT v_is_allowed THEN
    RAISE EXCEPTION 'Muitas indicações em um curto período. Tente novamente em alguns minutos.'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_rate_limit_referrals ON public.referrals;
CREATE TRIGGER trg_rate_limit_referrals
BEFORE INSERT ON public.referrals
FOR EACH ROW EXECUTE FUNCTION public.rate_limit_referrals_trigger();

-- 5. Policy de INSERT para anon + authenticated (visitantes da LP)
DROP POLICY IF EXISTS "Anyone can create referrals" ON public.referrals;
CREATE POLICY "Anyone can create referrals"
ON public.referrals
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 6. Índice para o admin listar cronologicamente
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals (created_at DESC);