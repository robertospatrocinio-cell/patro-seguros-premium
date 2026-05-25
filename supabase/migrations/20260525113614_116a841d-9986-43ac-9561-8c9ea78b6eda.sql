-- Add opportunities and opportunity_notes columns to contacts table
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS opportunities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS opportunity_notes TEXT;

-- Update RLS if needed (usually not required for new columns on existing tables with active policies)
