
-- 1) Fix rate limit trigger: prefer real request headers over client-supplied ip_address
CREATE OR REPLACE FUNCTION public.rate_limit_leads_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

    SELECT public.check_rate_limit(
        'leads_insert:' || v_ip,
        300,
        3
    ) INTO v_is_allowed;

    IF NOT v_is_allowed THEN
        RAISE EXCEPTION 'Muitas solicitações em um curto período. Por favor, tente novamente mais tarde.'
            USING ERRCODE = 'P0001';
    END IF;

    RETURN NEW;
END;
$function$;

-- 2) Pin search_path on internal SECURITY DEFINER helper functions
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;

-- 3) Revoke public EXECUTE on internal helpers; only service role should call them
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;

-- check_rate_limit is called by edge functions (service role) and by the leads trigger (security definer, runs as owner)
REVOKE EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

-- validate_lead_data and rate_limit_leads_trigger are trigger functions; no direct EXECUTE needed
REVOKE EXECUTE ON FUNCTION public.validate_lead_data() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rate_limit_leads_trigger() FROM PUBLIC, anon, authenticated;

-- has_role is used in RLS policies; must remain callable by authenticated users
-- (already has stable search_path set)
