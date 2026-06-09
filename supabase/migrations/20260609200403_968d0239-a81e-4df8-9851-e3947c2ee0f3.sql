-- Final lockdown of the remaining SECURITY DEFINER functions to eliminate linter warnings
-- Revoke all permissions from authenticated users for has_role and check_rate_limit

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM authenticated;

-- Ensure ONLY service_role can execute these (they are already revoked from PUBLIC)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;
