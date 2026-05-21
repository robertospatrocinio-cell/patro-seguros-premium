ALTER TABLE public.documents ADD COLUMN external_drive_link TEXT;
COMMENT ON COLUMN public.documents.external_drive_link IS 'URL link to the document in an external storage like Google Drive';
