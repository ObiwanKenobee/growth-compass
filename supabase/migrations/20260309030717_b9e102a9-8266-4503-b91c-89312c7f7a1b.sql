
CREATE TABLE public.health_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type text NOT NULL,
  severity text NOT NULL DEFAULT 'warning',
  message text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  checked_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.health_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read health_alerts" ON public.health_alerts FOR SELECT USING (true);
CREATE POLICY "Service role can insert health_alerts" ON public.health_alerts FOR INSERT WITH CHECK (true);

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
