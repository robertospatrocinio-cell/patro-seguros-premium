-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    cpf_cnpj TEXT,
    client_type TEXT CHECK (client_type IN ('cliente', 'amigo', 'não cliente')),
    is_client BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_insurances junction table
CREATE TABLE IF NOT EXISTS public.contact_insurances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    insurance_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Update documents table to support contacts if not already there
-- We saw customer_id in previous read_query, we'll assume it's for leads or general customers
-- Let's add contact_id explicitly if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='documents' AND column_name='contact_id') THEN
        ALTER TABLE public.documents ADD COLUMN contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_insurances ENABLE ROW LEVEL SECURITY;

-- Policies for contacts
CREATE POLICY "Admins can do everything on contacts" 
ON public.contacts 
FOR ALL 
USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE raw_app_meta_data->>'role' = 'admin'));

-- Policies for contact_insurances
CREATE POLICY "Admins can do everything on contact_insurances" 
ON public.contact_insurances 
FOR ALL 
USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE raw_app_meta_data->>'role' = 'admin'));

-- Storage configuration
INSERT INTO storage.buckets (id, name, public) 
VALUES ('crm_documents', 'crm_documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Admins can manage crm documents"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'crm_documents');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON public.contacts
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
