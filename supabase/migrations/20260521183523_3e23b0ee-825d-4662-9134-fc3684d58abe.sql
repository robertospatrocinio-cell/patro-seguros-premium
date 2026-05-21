-- Set search_path for the trigger function to improve security
ALTER FUNCTION public.update_lead_status_from_kanban() SET search_path = public;