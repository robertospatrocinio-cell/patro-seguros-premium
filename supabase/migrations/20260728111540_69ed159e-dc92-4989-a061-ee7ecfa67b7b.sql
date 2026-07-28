-- anchor_alerts: explicit admin-only INSERT policy
CREATE POLICY "Admins can insert anchor alerts"
  ON public.anchor_alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- gsc_indexation_alerts: explicit admin-only SELECT policy
CREATE POLICY "Admins can view indexation alerts"
  ON public.gsc_indexation_alerts
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- seo_audit_runs: explicit admin-only INSERT policy
CREATE POLICY "Admins can insert audit runs"
  ON public.seo_audit_runs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- seo_rich_results_checks: explicit admin-only INSERT policy
CREATE POLICY "Admins can insert rich results checks"
  ON public.seo_rich_results_checks
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));