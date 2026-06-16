CREATE INDEX IF NOT EXISTS idx_contact_insurances_contact_id ON public.contact_insurances (contact_id);
CREATE INDEX IF NOT EXISTS idx_documents_contact_id ON public.documents (contact_id);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at_desc ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_kanban_order_created_at ON public.leads (kanban_order ASC, created_at DESC);
ANALYZE public.contacts;
ANALYZE public.contact_insurances;
ANALYZE public.documents;
ANALYZE public.leads;