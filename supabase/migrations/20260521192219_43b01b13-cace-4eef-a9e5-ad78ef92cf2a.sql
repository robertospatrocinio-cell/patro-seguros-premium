-- Unified administrative access policy for all CRM tables
-- This migration ensures that any user with the 'admin' role in user_roles has full access.

-- CONTACTS
DROP POLICY IF EXISTS "Admins can manage contacts" ON public.contacts;
CREATE POLICY "Admins can manage contacts" ON public.contacts
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- CONTACT_INSURANCES
DROP POLICY IF EXISTS "Admins can do everything on contact_insurances" ON public.contact_insurances;
CREATE POLICY "Admins can manage contact_insurances" ON public.contact_insurances
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- LEADS
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
CREATE POLICY "Admins can manage leads" ON public.leads
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- CUSTOMERS
DROP POLICY IF EXISTS "Admins manage customers" ON public.customers;
CREATE POLICY "Admins manage customers" ON public.customers
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- POLICIES
DROP POLICY IF EXISTS "Admins manage policies" ON public.policies;
CREATE POLICY "Admins manage policies" ON public.policies
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- TASKS
DROP POLICY IF EXISTS "Admins manage tasks" ON public.tasks;
CREATE POLICY "Admins manage tasks" ON public.tasks
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- REFERRALS
DROP POLICY IF EXISTS "Admins manage referrals" ON public.referrals;
CREATE POLICY "Admins manage referrals" ON public.referrals
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- WHATSAPP HISTORY
DROP POLICY IF EXISTS "Admins manage whatsapp" ON public.whatsapp_history;
CREATE POLICY "Admins manage whatsapp" ON public.whatsapp_history
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- INTERACTIONS
DROP POLICY IF EXISTS "Admins manage interactions" ON public.interactions;
CREATE POLICY "Admins manage interactions" ON public.interactions
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- DOCUMENTS
DROP POLICY IF EXISTS "Admins manage docs" ON public.documents;
CREATE POLICY "Admins manage documents" ON public.documents
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- RELATIONSHIP RULES
DROP POLICY IF EXISTS "Admins manage relationship rules" ON public.relationship_rules;
CREATE POLICY "Admins manage relationship rules" ON public.relationship_rules
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- KANBAN STAGES
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.kanban_stages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.kanban_stages;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.kanban_stages;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.kanban_stages;

CREATE POLICY "Admins manage kanban stages" ON public.kanban_stages
FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
