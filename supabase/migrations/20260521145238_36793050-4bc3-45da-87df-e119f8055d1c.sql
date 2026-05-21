-- Adicionar campos de responsabilidade e score à tabela de clientes
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS assigned_consultant_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS assigned_attendant_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS assigned_manager_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS relationship_score INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS relationship_status TEXT DEFAULT 'active' CHECK (relationship_status IN ('active', 'warning', 'risk')),
ADD COLUMN IF NOT EXISTS last_interaction_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS client_profile TEXT DEFAULT 'common' CHECK (client_profile IN ('premium', 'common', 'business', 'high_risk'));

-- Tabela de Histórico de Responsáveis
CREATE TABLE IF NOT EXISTS public.customer_responsible_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'consultant', 'attendant', 'manager'
    previous_user_id UUID REFERENCES auth.users(id),
    new_user_id UUID REFERENCES auth.users(id),
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Interações
CREATE TABLE IF NOT EXISTS public.interactions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('whatsapp', 'call', 'email', 'meeting', 'visit', 'after_sales', 'renewal', 'support', 'birthday', 'referral', 'claim')),
    interaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id), -- Responsável pela interação
    notes TEXT,
    status TEXT DEFAULT 'completed',
    next_contact_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de Regras de Relacionamento (Configuração)
CREATE TABLE IF NOT EXISTS public.relationship_rules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile TEXT UNIQUE NOT NULL, -- 'premium', 'common', 'business', 'high_risk'
    interaction_interval_days INTEGER NOT NULL,
    alert_threshold_days INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir regras padrão
INSERT INTO public.relationship_rules (profile, interaction_interval_days, alert_threshold_days)
VALUES 
('premium', 15, 20),
('common', 60, 70),
('business', 30, 40),
('high_risk', 7, 10)
ON CONFLICT (profile) DO NOTHING;

-- Tabela de Notificações do CRM
CREATE TABLE IF NOT EXISTS public.crm_notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    customer_id UUID REFERENCES public.customers(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'alert',
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.customer_responsible_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationship_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_notifications ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS (Simplificadas para o contexto do CRM)
CREATE POLICY "Users can view all interactions" ON public.interactions FOR SELECT USING (true);
CREATE POLICY "Users can insert interactions" ON public.interactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all history" ON public.customer_responsible_history FOR SELECT USING (true);
CREATE POLICY "Users can view relationship rules" ON public.relationship_rules FOR SELECT USING (true);

CREATE POLICY "Users can view their own notifications" ON public.crm_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.crm_notifications FOR UPDATE USING (auth.uid() = user_id);

-- Função para atualizar data da última interação no cliente
CREATE OR REPLACE FUNCTION public.update_customer_last_interaction()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.customers
    SET last_interaction_at = NEW.interaction_date
    WHERE id = NEW.customer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trigger_update_customer_last_interaction
AFTER INSERT ON public.interactions
FOR EACH ROW
EXECUTE FUNCTION public.update_customer_last_interaction();
