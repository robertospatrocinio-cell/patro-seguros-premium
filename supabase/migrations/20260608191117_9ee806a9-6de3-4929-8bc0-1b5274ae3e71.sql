CREATE TABLE public.partial_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    phone TEXT,
    name TEXT,
    insurance_type TEXT,
    current_step INTEGER,
    data JSONB,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
    reminder_sent_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partial_quotes TO anon, authenticated, service_role;
ALTER TABLE public.partial_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public access to partial_quotes" ON public.partial_quotes FOR ALL USING (true) WITH CHECK (true);

-- Trigger to update last_activity
CREATE OR REPLACE FUNCTION update_last_activity()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_activity = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_last_activity
BEFORE UPDATE ON public.partial_quotes
FOR EACH ROW EXECUTE FUNCTION update_last_activity();
