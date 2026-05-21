ALTER TABLE public.contacts 
ADD COLUMN life_insurance_carrier TEXT,
ADD COLUMN life_insurance_renewal DATE,
ADD COLUMN home_insurance_carrier TEXT,
ADD COLUMN home_insurance_renewal DATE,
ADD COLUMN health_insurance_carrier TEXT,
ADD COLUMN health_insurance_renewal DATE,
ADD COLUMN business_insurance_carrier TEXT,
ADD COLUMN business_insurance_renewal DATE,
ADD COLUMN other_insurance_carrier TEXT,
ADD COLUMN other_insurance_renewal DATE;