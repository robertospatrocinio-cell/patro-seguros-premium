CREATE TABLE public.lead_quote_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partial_quote_id UUID REFERENCES public.partial_quotes(id) ON DELETE CASCADE,
    step_reached INTEGER NOT NULL,
    field_changed TEXT,
    previous_value TEXT,
    new_value TEXT,
    snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

GRANT SELECT, INSERT ON public.lead_quote_history TO anon, authenticated, service_role;
ALTER TABLE public.lead_quote_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts and reads for history" ON public.lead_quote_history FOR ALL USING (true) WITH CHECK (true);
