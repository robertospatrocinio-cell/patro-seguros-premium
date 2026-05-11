-- Create a validation function for leads
CREATE OR REPLACE FUNCTION public.validate_lead_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate Full Name
    IF NEW.full_name IS NULL OR length(trim(NEW.full_name)) < 3 THEN
        RAISE EXCEPTION 'Nome completo inválido. Deve ter pelo menos 3 caracteres.';
    END IF;

    -- Validate Email
    IF NEW.email IS NULL OR NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'E-mail inválido.';
    END IF;

    -- Validate Phone
    IF NEW.phone IS NULL OR length(regexp_replace(NEW.phone, '\D', '', 'g')) < 10 THEN
        RAISE EXCEPTION 'Telefone inválido. Informe o DDD e o número completo.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS tr_validate_lead_on_insert ON public.leads;
CREATE TRIGGER tr_validate_lead_on_insert
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.validate_lead_data();