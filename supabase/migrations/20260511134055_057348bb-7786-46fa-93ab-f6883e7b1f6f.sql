-- Create a trigger function to rate limit lead insertions by IP
CREATE OR REPLACE FUNCTION public.rate_limit_leads_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_ip TEXT;
    v_is_allowed BOOLEAN;
BEGIN
    -- Extract IP from request headers (if available) or use the ip_address column
    -- Supabase provides 'request.headers' as a config parameter
    v_ip := COALESCE(
        NEW.ip_address,
        current_setting('request.headers', true)::json->>'cf-connecting-ip',
        current_setting('request.headers', true)::json->>'x-real-ip',
        'unknown'
    );

    -- Check rate limit: 3 leads per 5 minutes per IP
    SELECT public.check_rate_limit(
        'leads_insert:' || v_ip,
        300, -- 5 minutes
        3    -- 3 requests
    ) INTO v_is_allowed;

    IF NOT v_is_allowed THEN
        RAISE EXCEPTION 'Muitas solicitações em um curto período. Por favor, tente novamente mais tarde.'
            USING ERRCODE = 'P0001'; -- Custom error code for rate limiting
    END IF;

    RETURN NEW;
END;
$$;

-- Attach trigger to leads table
DROP TRIGGER IF EXISTS trg_rate_limit_leads ON public.leads;
CREATE TRIGGER trg_rate_limit_leads
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.rate_limit_leads_trigger();