
DROP POLICY IF EXISTS "Allow authenticated users to read claims" ON public.claims;
DROP POLICY IF EXISTS "Allow authenticated users to insert claims" ON public.claims;
DROP POLICY IF EXISTS "Allow authenticated users to update claims" ON public.claims;
DROP POLICY IF EXISTS "Allow authenticated users to delete claims" ON public.claims;

CREATE POLICY "Admins manage claims" ON public.claims
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Enable all for authenticated users on insurance_sales" ON public.insurance_sales;

CREATE POLICY "Admins manage insurance sales" ON public.insurance_sales
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;
