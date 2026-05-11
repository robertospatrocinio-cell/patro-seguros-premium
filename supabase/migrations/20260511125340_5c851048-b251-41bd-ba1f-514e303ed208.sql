-- Update function to set search_path and change security context if possible, 
-- but since it's a trigger function, SECURITY DEFINER is often needed if it touches other schemas.
-- The main fix here is SET search_path and REVOKE EXECUTE.

ALTER FUNCTION public.validate_lead_data() SET search_path = public;

-- Revoke execute from public roles to prevent direct calls (though it's a trigger function)
REVOKE EXECUTE ON FUNCTION public.validate_lead_data() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_lead_data() FROM anon;
REVOKE EXECUTE ON FUNCTION public.validate_lead_data() FROM authenticated;