DO $$ 
DECLARE
  roberto_id UUID;
  sandra_id UUID;
  leticia_id UUID;
BEGIN
  -- Create Roberto
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'roberto@patroseguros.com.br') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 
      'roberto@patroseguros.com.br', crypt('Patro2026@', gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}', '{"full_name":"Roberto Patro"}', now(), now(), '', '', '', ''
    ) RETURNING id INTO roberto_id;

    INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, provider_id)
    VALUES (gen_random_uuid(), roberto_id, format('{"sub":"%s","email":"%s"}', roberto_id::text, 'roberto@patroseguros.com.br')::jsonb, 'email', now(), now(), now(), roberto_id::text);
  END IF;

  -- Create Sandra
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'sandra@patroseguros.com.br') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 
      'sandra@patroseguros.com.br', crypt('Patro2026@', gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}', '{"full_name":"Sandra Patro"}', now(), now(), '', '', '', ''
    ) RETURNING id INTO sandra_id;

    INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, provider_id)
    VALUES (gen_random_uuid(), sandra_id, format('{"sub":"%s","email":"%s"}', sandra_id::text, 'sandra@patroseguros.com.br')::jsonb, 'email', now(), now(), now(), sandra_id::text);
  END IF;

  -- Create Leticia
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'leticia@patroseguros.com.br') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 
      'leticia@patroseguros.com.br', crypt('Patro2026@', gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}', '{"full_name":"Leticia Patro"}', now(), now(), '', '', '', ''
    ) RETURNING id INTO leticia_id;

    INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, provider_id)
    VALUES (gen_random_uuid(), leticia_id, format('{"sub":"%s","email":"%s"}', leticia_id::text, 'leticia@patroseguros.com.br')::jsonb, 'email', now(), now(), now(), leticia_id::text);
  END IF;

END $$;