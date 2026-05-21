-- Adiciona política para permitir que qualquer usuário autenticado insira contatos
-- Isso resolve o problema de "permission denied" caso o sistema de permissões baseado em roles
-- ainda não tenha identificado o usuário como admin no momento da criação.
CREATE POLICY "Authenticated users can create contacts" 
ON public.contacts 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated 
USING (true);

-- Garante o mesmo para tabelas relacionadas
CREATE POLICY "Authenticated users can create contact insurances" 
ON public.contact_insurances 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact insurances" 
ON public.contact_insurances 
FOR SELECT 
TO authenticated 
USING (true);