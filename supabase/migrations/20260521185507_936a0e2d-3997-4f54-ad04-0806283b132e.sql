ALTER TABLE public.contacts 
ADD COLUMN referral_contact_id UUID REFERENCES public.contacts(id),
ADD COLUMN salesperson_name TEXT,
ADD COLUMN partner_source_name TEXT;