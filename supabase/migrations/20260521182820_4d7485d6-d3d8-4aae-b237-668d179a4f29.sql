-- Grant execute on has_role to authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Ensure the user has the admin role in user_roles
INSERT INTO public.user_roles (user_id, role)
VALUES ('6db2b775-dcd8-41c1-913d-2bf546132c32', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Update auth.users metadata to reflect the admin role
UPDATE auth.users 
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE id = '6db2b775-dcd8-41c1-913d-2bf546132c32';
