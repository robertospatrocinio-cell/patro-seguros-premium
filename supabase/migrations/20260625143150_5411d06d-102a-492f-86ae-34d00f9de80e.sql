REVOKE EXECUTE ON FUNCTION public.trigger_monitor_rich_results() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.trigger_monitor_rich_results() TO service_role, postgres;