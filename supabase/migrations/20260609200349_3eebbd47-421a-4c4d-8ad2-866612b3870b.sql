-- Switch internal utility functions to SECURITY INVOKER
-- These functions perform operations on tables where we want the calling role's permissions to apply

ALTER FUNCTION public.validate_lead_data() SECURITY INVOKER;
ALTER FUNCTION public.enqueue_email(text, jsonb) SECURITY INVOKER;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SECURITY INVOKER;
ALTER FUNCTION public.delete_email(text, bigint) SECURITY INVOKER;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SECURITY INVOKER;
ALTER FUNCTION public.rate_limit_leads_trigger() SECURITY INVOKER;

-- Re-verify permissions for the remaining SECURITY DEFINER functions
-- we already revoked from PUBLIC and granted to service_role/authenticated in the previous migration.
