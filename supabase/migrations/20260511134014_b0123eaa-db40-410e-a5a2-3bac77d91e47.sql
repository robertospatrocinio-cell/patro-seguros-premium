-- Table to track rate limits across edge function isolates
CREATE TABLE public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL, -- Format: 'endpoint:ip'
    count INTEGER NOT NULL DEFAULT 1,
    reset_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookup and cleanup
CREATE INDEX idx_rate_limits_key ON public.rate_limits(key);
CREATE INDEX idx_rate_limits_reset_at ON public.rate_limits(reset_at);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Function to check and increment rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_key TEXT,
    p_window_seconds INTEGER,
    p_max_requests INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_now TIMESTAMP WITH TIME ZONE := now();
    v_reset_at TIMESTAMP WITH TIME ZONE;
    v_count INTEGER;
BEGIN
    -- Cleanup expired entries for this specific key to keep table lean
    DELETE FROM public.rate_limits WHERE reset_at < v_now;

    -- Try to find existing bucket
    SELECT count, reset_at INTO v_count, v_reset_at
    FROM public.rate_limits
    WHERE key = p_key
    FOR UPDATE; -- Lock row for atomicity

    IF NOT FOUND THEN
        -- Create new bucket
        INSERT INTO public.rate_limits (key, count, reset_at)
        VALUES (p_key, 1, v_now + (p_window_seconds || ' seconds')::INTERVAL);
        RETURN TRUE;
    END IF;

    -- Check if limit exceeded
    IF v_count >= p_max_requests THEN
        RETURN FALSE;
    END IF;

    -- Increment existing bucket
    UPDATE public.rate_limits
    SET count = count + 1
    WHERE key = p_key;

    RETURN TRUE;
END;
$$;