-- Create kanban_stages table
CREATE TABLE public.kanban_stages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT DEFAULT '#cbd5e1',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.kanban_stages ENABLE ROW LEVEL SECURITY;

-- Simple policies for authenticated users
CREATE POLICY "Enable read for authenticated users" ON public.kanban_stages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users" ON public.kanban_stages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON public.kanban_stages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON public.kanban_stages FOR DELETE USING (auth.role() = 'authenticated');

-- Add columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS kanban_stage_id UUID REFERENCES public.kanban_stages(id),
ADD COLUMN IF NOT EXISTS kanban_order INTEGER DEFAULT 0;

-- Insert default stages
INSERT INTO public.kanban_stages (name, color, order_index) VALUES
('Novo Lead', '#3b82f6', 1),
('Contato Realizado', '#8b5cf6', 2),
('Proposta Enviada', '#f59e0b', 3),
('Negociação', '#ec4899', 4),
('Fechado / Ganho', '#10b981', 5),
('Perdido', '#ef4444', 6);

-- Function to handle lead_status update based on kanban_stage_id (optional but good for consistency)
CREATE OR REPLACE FUNCTION update_lead_status_from_kanban()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.kanban_stage_id IS NOT NULL THEN
        SELECT name INTO NEW.lead_status FROM public.kanban_stages WHERE id = NEW.kanban_stage_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_lead_status_kanban
BEFORE INSERT OR UPDATE OF kanban_stage_id ON public.leads
FOR EACH ROW EXECUTE FUNCTION update_lead_status_from_kanban();