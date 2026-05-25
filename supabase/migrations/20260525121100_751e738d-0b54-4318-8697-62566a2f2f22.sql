-- Fix mutable search path for update_updated_at_column
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;

-- Revoke public execute permissions
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;
