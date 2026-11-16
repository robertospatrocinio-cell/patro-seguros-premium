-- Protege a edição de rascunhos de cotação e valida sessões dos formulários
-- Aplicada no Lovable Cloud pela extensão, com autorização do usuário.
-- Registrada por GeckoAI em 2026-11-16T11:50:29.870Z

-- Network-capable pgsql-http RPCs are not used by the browser.
-- Keep internal/server execution and leave policy helpers untouched.
DO $migration$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS signature
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN (
        'http', 'http_get', 'http_post', 'http_put', 'http_patch',
        'http_delete', 'http_head', 'http_set_curlopt',
        'http_reset_curlopt', 'http_list_curlopt'
      )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn.signature);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn.signature);
  END LOOP;
END;
$migration$;
