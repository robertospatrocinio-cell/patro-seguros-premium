DROP POLICY IF EXISTS "Allow anon read purge_logs" ON public.purge_logs;

CREATE POLICY "Deny anon read purge_logs"
ON public.purge_logs
FOR SELECT
TO anon
USING (false);