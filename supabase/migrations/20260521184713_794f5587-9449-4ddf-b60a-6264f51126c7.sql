ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS profession TEXT,
ADD COLUMN IF NOT EXISTS income_bracket TEXT,
ADD COLUMN IF NOT EXISTS home_ownership TEXT,
ADD COLUMN IF NOT EXISTS lead_source TEXT,
ADD COLUMN IF NOT EXISTS satisfaction_score INTEGER CHECK (satisfaction_score >= 1 AND satisfaction_score <= 10),
ADD COLUMN IF NOT EXISTS last_interaction_type TEXT;