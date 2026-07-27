DROP POLICY IF EXISTS "public insert internal link clicks" ON public.internal_link_click_events;

CREATE POLICY "public insert internal link clicks"
  ON public.internal_link_click_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(placement) BETWEEN 1 AND 64
    AND length(source) BETWEEN 1 AND 128
    AND length(destination) BETWEEN 1 AND 512
    AND length(page_path) BETWEEN 1 AND 512
    AND (label IS NULL OR length(label) <= 256)
    AND (user_agent IS NULL OR length(user_agent) <= 512)
    AND (referrer IS NULL OR length(referrer) <= 512)
  );