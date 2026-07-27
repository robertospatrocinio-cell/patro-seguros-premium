ALTER TABLE public.anchor_priorities
  ADD COLUMN IF NOT EXISTS top_pathname text,
  ADD COLUMN IF NOT EXISTS whatsapp_conversions integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cotacao_conversions integer NOT NULL DEFAULT 0;