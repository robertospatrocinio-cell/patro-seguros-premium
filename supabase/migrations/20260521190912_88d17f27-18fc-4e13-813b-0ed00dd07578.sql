ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS responsible_name TEXT;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS responsible_name TEXT;