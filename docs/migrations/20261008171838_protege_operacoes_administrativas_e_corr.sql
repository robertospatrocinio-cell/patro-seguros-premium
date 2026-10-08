-- Protege operações administrativas e corrige permissões de acesso do CRM
-- Aplicada no Lovable Cloud pela extensão, com autorização do usuário.
-- Registrada por GeckoAI em 2026-10-08T20:18:38.743Z

-- Restore the helper permission needed by existing administration and file policies.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Restrict server-side HTTP RPCs; scheduled jobs run as the database owner.
DO $block$
DECLARE f record;
BEGIN
  FOR f IN
    SELECT p.oid::regprocedure AS signature
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname IN (
      'http', 'http_get', 'http_post', 'http_put', 'http_patch',
      'http_delete', 'http_head', 'http_set_curlopt',
      'http_reset_curlopt', 'http_list_curlopt'
    )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', f.signature);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', f.signature);
  END LOOP;
END;
$block$;

-- This operational history is not used by public pages.
DROP POLICY IF EXISTS "Allow authenticated reads on sitemap_history" ON public.sitemap_history;
CREATE POLICY "Allow authenticated reads on sitemap_history"
ON public.sitemap_history FOR SELECT TO authenticated
USING (public.has_role((SELECT auth.uid()), 'admin'::public.app_role));

-- Keep the existing scheduled jobs working after enforcing server authorization.
-- The server key remains in the private vault, never in browser code or SQL text.
DO $block$
DECLARE j record;
DECLARE endpoint text;
BEGIN
  IF EXISTS (
    SELECT 1 FROM cron.job
    WHERE jobname IN ('snapshot-anchor-history-daily', 'seo-audit-daily')
  ) AND NOT EXISTS (
    SELECT 1 FROM vault.decrypted_secrets
    WHERE name = 'email_queue_service_role_key' AND length(decrypted_secret) > 0
  ) THEN
    RAISE EXCEPTION 'A chave interna das tarefas agendadas não está disponível';
  END IF;
  FOR j IN SELECT jobid, jobname FROM cron.job
    WHERE jobname IN ('snapshot-anchor-history-daily', 'seo-audit-daily')
  LOOP
    endpoint := CASE j.jobname
      WHEN 'snapshot-anchor-history-daily' THEN 'snapshot-anchor-history'
      ELSE 'seo-audit-crawler' END;
    PERFORM cron.alter_job(j.jobid, command := format(
      $job$SELECT net.http_post(
        url := %L,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || (
            SELECT decrypted_secret FROM vault.decrypted_secrets
            WHERE name = 'email_queue_service_role_key' LIMIT 1
          )
        ),
        body := '{}'::jsonb
      );$job$,
      'https://vjzsekwkeixbbpldiqmd.supabase.co/functions/v1/' || endpoint
    ));
  END LOOP;
END;
$block$;
