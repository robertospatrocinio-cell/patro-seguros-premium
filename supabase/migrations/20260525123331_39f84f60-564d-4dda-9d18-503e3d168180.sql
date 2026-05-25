-- Create claims table
CREATE TABLE IF NOT EXISTS public.claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    description TEXT,
    claim_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'Aberto', -- Aberto, Em Análise, Concluído, Cancelado
    has_third_party BOOLEAN DEFAULT FALSE,
    third_party_count INTEGER DEFAULT 0,
    third_party_name TEXT,
    third_party_phone TEXT,
    tracking_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Create policies (Simplifying for now to allow authenticated access, adjust as needed)
CREATE POLICY "Allow authenticated users to read claims" ON public.claims
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert claims" ON public.claims
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update claims" ON public.claims
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete claims" ON public.claims
    FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
CREATE TRIGGER update_claims_updated_at
    BEFORE UPDATE ON public.claims
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
