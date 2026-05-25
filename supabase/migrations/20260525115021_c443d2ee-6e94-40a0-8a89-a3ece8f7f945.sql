-- Add new contact information columns
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS first_license_date DATE,
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;
