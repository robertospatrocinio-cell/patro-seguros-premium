-- Create insurance_sales table for volume and growth tracking
CREATE TABLE IF NOT EXISTS public.insurance_sales (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    carrier TEXT NOT NULL,
    insurance_type TEXT NOT NULL,
    sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.insurance_sales ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable all for authenticated users on insurance_sales" 
ON public.insurance_sales 
FOR ALL 
USING (auth.role() = 'authenticated');

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for insurance_sales
CREATE TRIGGER update_insurance_sales_updated_at
BEFORE UPDATE ON public.insurance_sales
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed some initial data if empty to show the feature
INSERT INTO public.insurance_sales (carrier, insurance_type, sale_date, amount)
SELECT 'Porto Seguro', 'Auto', '2026-05-15', 2500.00 WHERE NOT EXISTS (SELECT 1 FROM public.insurance_sales LIMIT 1);
INSERT INTO public.insurance_sales (carrier, insurance_type, sale_date, amount)
SELECT 'Porto Seguro', 'Auto', '2026-04-15', 2200.00 WHERE NOT EXISTS (SELECT 1 FROM public.insurance_sales WHERE carrier = 'Porto Seguro' AND sale_date = '2026-04-15');
INSERT INTO public.insurance_sales (carrier, insurance_type, sale_date, amount)
SELECT 'Tokio Marine', 'Vida', '2026-05-10', 1200.00 WHERE NOT EXISTS (SELECT 1 FROM public.insurance_sales WHERE carrier = 'Tokio Marine');
INSERT INTO public.insurance_sales (carrier, insurance_type, sale_date, amount)
SELECT 'Allianz', 'Residencial', '2026-05-05', 800.00 WHERE NOT EXISTS (SELECT 1 FROM public.insurance_sales WHERE carrier = 'Allianz');
INSERT INTO public.insurance_sales (carrier, insurance_type, sale_date, amount)
SELECT 'Porto Seguro', 'Auto', '2025-05-15', 2000.00 WHERE NOT EXISTS (SELECT 1 FROM public.insurance_sales WHERE sale_date = '2025-05-15');
