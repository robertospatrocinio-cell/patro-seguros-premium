-- Adiciona campos de controle de contato
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS last_contact_date DATE,
ADD COLUMN IF NOT EXISTS next_contact_date DATE;

-- Comentário explicativo
COMMENT ON COLUMN public.contacts.last_contact_date IS 'Data do último contato realizado com o cliente';
COMMENT ON COLUMN public.contacts.next_contact_date IS 'Data sugerida para o próximo contato com base no intervalo escolhido';