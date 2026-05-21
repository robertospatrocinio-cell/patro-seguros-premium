-- Create leads table for CRM integration
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  insurance_type TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  source TEXT DEFAULT 'website_form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies (Allowing inserts for everyone for the form, but selects only for service role or later admins)
CREATE POLICY "Enable insert for everyone" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users only" ON public.leads FOR SELECT TO authenticated USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
