-- Refinar a política de inserção pública de leads para ser mais segura
DROP POLICY IF EXISTS "Public lead insertion" ON public.leads;

CREATE POLICY "Public lead insertion" 
ON public.leads 
FOR INSERT 
TO public 
WITH CHECK (
  full_name IS NOT NULL AND 
  length(trim(full_name)) >= 2 AND 
  (email IS NOT NULL OR phone IS NOT NULL)
);

-- Restringir execução da função SECURITY DEFINER has_role
-- Primeiro revogamos de todos (public)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM public;

-- Depois concedemos apenas para usuários autenticados (que precisam para o RLS)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
-- E para o role service_role (usado pelo sistema/Lovable)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
