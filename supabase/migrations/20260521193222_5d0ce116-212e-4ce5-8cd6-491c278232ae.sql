-- Desabilitar RLS temporariamente para evitar conflitos durante a migração
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_insurances DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Remover políticas antigas que podem estar causando conflitos ou recursão
DROP POLICY IF EXISTS "Admins can manage contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can create contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;

DROP POLICY IF EXISTS "Admins can manage contact_insurances" ON public.contact_insurances;
DROP POLICY IF EXISTS "Authenticated users can create contact insurances" ON public.contact_insurances;
DROP POLICY IF EXISTS "Authenticated users can view contact insurances" ON public.contact_insurances;

DROP POLICY IF EXISTS "Admins manage documents" ON public.documents;

DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.leads;
DROP POLICY IF EXISTS "Allow public lead creation" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit a valid lead" ON public.leads;

-- Recriar políticas usando a função helper has_role que é SECURITY DEFINER (mais eficiente e segura contra recursão)

-- Contacts
CREATE POLICY "Admins manage all contacts" 
ON public.contacts 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact Insurances
CREATE POLICY "Admins manage all contact_insurances" 
ON public.contact_insurances 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Documents
CREATE POLICY "Admins manage all documents" 
ON public.documents 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Leads
CREATE POLICY "Admins manage all leads" 
ON public.leads 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Permitir criação de leads por usuários não autenticados (formulários do site)
CREATE POLICY "Public lead insertion" 
ON public.leads 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Reabilitar RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_insurances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
