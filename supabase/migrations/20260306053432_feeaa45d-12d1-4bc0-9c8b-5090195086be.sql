
-- Dashboard metrics table for CAC, LTV, Churn, and financial data
CREATE TABLE public.dashboard_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL, -- 'cac', 'ltv', 'churn', 'mrr', 'burn_rate', 'runway', 'cash_on_hand'
  value NUMERIC NOT NULL,
  period_month TEXT NOT NULL, -- e.g. 'Feb 2026'
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Acquisition channels
CREATE TABLE public.acquisition_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  customers INTEGER NOT NULL DEFAULT 0,
  cac NUMERIC NOT NULL DEFAULT 0,
  color TEXT,
  period_month TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Customer segments
CREATE TABLE public.customer_segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contract_value NUMERIC NOT NULL DEFAULT 0,
  ltv NUMERIC NOT NULL DEFAULT 0,
  churn_rate NUMERIC NOT NULL DEFAULT 0,
  growth_rate NUMERIC NOT NULL DEFAULT 0,
  customer_count INTEGER NOT NULL DEFAULT 0,
  period_month TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Cohort retention data
CREATE TABLE public.cohort_retention (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_label TEXT NOT NULL, -- e.g. "Aug '25"
  month_index INTEGER NOT NULL, -- 0, 1, 2, ...
  retention_pct NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Funnel stages
CREATE TABLE public.funnel_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stage_name TEXT NOT NULL,
  stage_order INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  conversion_rate NUMERIC NOT NULL DEFAULT 0,
  period_month TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Strategic intelligence feed
CREATE TABLE public.strategic_intel (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  intel_type TEXT NOT NULL, -- 'partnership', 'adoption', 'pilot', 'verification'
  title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  impact TEXT NOT NULL DEFAULT 'medium', -- 'high', 'medium', 'low'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Expansion revenue
CREATE TABLE public.expansion_revenue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total NUMERIC NOT NULL DEFAULT 0,
  tier_upgrades INTEGER NOT NULL DEFAULT 0,
  new_services INTEGER NOT NULL DEFAULT 0,
  geo_expansion INTEGER NOT NULL DEFAULT 0,
  period_month TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Financial data (burn breakdown, revenue sources, KPIs)
CREATE TABLE public.financial_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type TEXT NOT NULL, -- 'burn_breakdown', 'revenue_source', 'cash_flow', 'kpi'
  label TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  percentage NUMERIC,
  color TEXT,
  period_month TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read for dashboard)
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acquisition_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_retention ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategic_intel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expansion_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data ENABLE ROW LEVEL SECURITY;

-- Public read policies (dashboard is read-only for authenticated users)
CREATE POLICY "Authenticated users can read dashboard_metrics" ON public.dashboard_metrics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read acquisition_channels" ON public.acquisition_channels FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read customer_segments" ON public.customer_segments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read cohort_retention" ON public.cohort_retention FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read funnel_stages" ON public.funnel_stages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read strategic_intel" ON public.strategic_intel FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read expansion_revenue" ON public.expansion_revenue FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read financial_data" ON public.financial_data FOR SELECT TO authenticated USING (true);
