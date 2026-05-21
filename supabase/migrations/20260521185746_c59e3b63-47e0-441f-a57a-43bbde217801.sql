ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS has_consortium BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS consortium_type TEXT,
ADD COLUMN IF NOT EXISTS consortium_carrier TEXT,
ADD COLUMN IF NOT EXISTS consortium_renewal DATE;

-- Update existing satisfaction scores to be within 0-5 if they were higher
UPDATE public.contacts SET satisfaction_score = 5 WHERE satisfaction_score > 5;
