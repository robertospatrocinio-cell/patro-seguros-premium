-- Extend leads table safely
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS cpf_cnpj TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS client_type TEXT DEFAULT 'pessoa_fisica',
ADD COLUMN IF NOT EXISTS source_origin TEXT DEFAULT 'site',
ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'novo',
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    cpf_cnpj TEXT,
    birth_date DATE,
    address_street TEXT,
    address_number TEXT,
    address_complement TEXT,
    address_neighborhood TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    client_type TEXT DEFAULT 'pessoa_fisica',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id)
);

-- Create policies table
CREATE TABLE IF NOT EXISTS public.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    insurance_type TEXT NOT NULL,
    insurer_name TEXT,
    policy_number TEXT,
    start_date DATE,
    end_date DATE,
    premium_amount DECIMAL(12,2),
    commission_amount DECIMAL(12,2),
    payment_status TEXT DEFAULT 'pending',
    installments_total INTEGER DEFAULT 1,
    installments_paid INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    is_renewal BOOLEAN DEFAULT FALSE,
    renewal_from_id UUID REFERENCES public.policies(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID REFERENCES auth.users(id),
    lead_id UUID REFERENCES public.leads(id),
    customer_id UUID REFERENCES public.customers(id),
    policy_id UUID REFERENCES public.policies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_customer_id UUID REFERENCES public.customers(id),
    referred_name TEXT NOT NULL,
    referred_phone TEXT,
    referred_email TEXT,
    insurance_type_interest TEXT,
    status TEXT DEFAULT 'pending',
    conversion_date TIMESTAMP WITH TIME ZONE,
    reward_given BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create whatsapp_history table
CREATE TABLE IF NOT EXISTS public.whatsapp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    lead_id UUID REFERENCES public.leads(id),
    direction TEXT NOT NULL,
    message_body TEXT,
    attachment_url TEXT,
    message_type TEXT DEFAULT 'text',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id),
    policy_id UUID REFERENCES public.policies(id),
    file_name TEXT NOT NULL,
    file_type TEXT,
    file_path TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins manage customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Admins manage policies" ON public.policies FOR ALL USING (true);
CREATE POLICY "Admins manage tasks" ON public.tasks FOR ALL USING (true);
CREATE POLICY "Admins manage referrals" ON public.referrals FOR ALL USING (true);
CREATE POLICY "Admins manage whatsapp" ON public.whatsapp_history FOR ALL USING (true);
CREATE POLICY "Admins manage docs" ON public.documents FOR ALL USING (true);

-- Triggers (Drop if exists to avoid error)
DROP TRIGGER IF EXISTS set_customers_updated_at ON public.customers;
CREATE TRIGGER set_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_policies_updated_at ON public.policies;
CREATE TRIGGER set_policies_updated_at BEFORE UPDATE ON public.policies FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_tasks_updated_at ON public.tasks;
CREATE TRIGGER set_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
