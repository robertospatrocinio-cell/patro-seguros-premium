select cron.schedule(
  'monitor-sitemap-errors-daily',
  '0 9 * * *',
  $$
  select net.http_get(
    url := 'https://vjzsekwkeixbbpldiqmd.supabase.co/functions/v1/monitor-sitemap-errors',
    headers := '{"Content-Type": "application/json"}'
  );
  $$
);