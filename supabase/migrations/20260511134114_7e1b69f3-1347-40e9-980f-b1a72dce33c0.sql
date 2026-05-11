-- Revoke execute from public and authenticated roles for security
REVOKE EXECUTE ON FUNCTION public.rate_limit_leads_trigger() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rate_limit_leads_trigger() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.rate_limit_leads_trigger() FROM anon;