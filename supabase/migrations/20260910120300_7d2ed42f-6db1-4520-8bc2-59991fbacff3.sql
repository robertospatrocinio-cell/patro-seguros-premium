CREATE OR REPLACE FUNCTION public.trigger_quote_reminders()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE v_key text;
BEGIN
  SELECT decrypted_secret INTO v_key FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key';
  IF v_key IS NULL THEN
    RAISE WARNING 'trigger_quote_reminders: service role key not found in vault';
    RETURN;
  END IF;
  PERFORM net.http_post(
    url := 'https://vjzsekwkeixbbpldiqmd.supabase.co/functions/v1/quote-reminders-cron',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
    body := '{}'::jsonb
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_monitor_rich_results()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE v_key text;
BEGIN
  SELECT decrypted_secret INTO v_key FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key';
  IF v_key IS NULL THEN
    RAISE WARNING 'trigger_monitor_rich_results: service role key not found in vault';
    RETURN;
  END IF;
  PERFORM net.http_post(
    url := 'https://vjzsekwkeixbbpldiqmd.supabase.co/functions/v1/monitor-rich-results',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
    body := '{}'::jsonb
  );
END;
$function$;