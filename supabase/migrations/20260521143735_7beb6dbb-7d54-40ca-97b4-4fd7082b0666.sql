-- First, let's ensure we have a robust way to check for admin status
-- We already have user_roles table, let's use it.

-- DROP permissive policies
DROP POLICY IF EXISTS "Admins manage customers" ON public.customers;
DROP POLICY IF EXISTS "Admins manage policies" ON public.policies;
DROP POLICY IF EXISTS "Admins manage tasks" ON public.tasks;
DROP POLICY IF EXISTS "Admins manage referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins manage whatsapp" ON public.whatsapp_history;
DROP POLICY IF EXISTS "Admins manage docs" ON public.documents;

-- Re-create with proper auth checks (assuming user_roles table is used for roles)
-- If user_roles doesn't have a 'role' column or similar, we might need to adjust.
-- Usually it's (user_id, role)

CREATE POLICY "Admins manage customers" ON public.customers 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins manage policies" ON public.policies 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins manage tasks" ON public.tasks 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins manage referrals" ON public.referrals 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins manage whatsapp" ON public.whatsapp_history 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins manage docs" ON public.documents 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
