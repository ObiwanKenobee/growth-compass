
-- NRR Tracker data
CREATE TABLE public.nrr_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_month text NOT NULL,
  nrr_value numeric NOT NULL,
  expansion numeric NOT NULL DEFAULT 0,
  contraction numeric NOT NULL DEFAULT 0,
  churn numeric NOT NULL DEFAULT 0,
  target numeric NOT NULL DEFAULT 110,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.nrr_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read nrr_tracking" ON public.nrr_tracking FOR SELECT USING (true);
CREATE POLICY "Auth users can insert nrr_tracking" ON public.nrr_tracking FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update nrr_tracking" ON public.nrr_tracking FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete nrr_tracking" ON public.nrr_tracking FOR DELETE TO authenticated USING (true);

-- Customer Health data
CREATE TABLE public.customer_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score integer NOT NULL DEFAULT 50,
  status text NOT NULL DEFAULT 'healthy',
  reason text NOT NULL DEFAULT '',
  revenue numeric NOT NULL DEFAULT 0,
  contract_start date,
  contract_end date,
  last_activity_date date,
  nps_score integer,
  feature_adoption_pct numeric DEFAULT 0,
  support_tickets_open integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_health ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read customer_health" ON public.customer_health FOR SELECT USING (true);
CREATE POLICY "Auth users can insert customer_health" ON public.customer_health FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update customer_health" ON public.customer_health FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete customer_health" ON public.customer_health FOR DELETE TO authenticated USING (true);

-- Pipeline Velocity data
CREATE TABLE public.pipeline_velocity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_month text NOT NULL,
  velocity numeric NOT NULL DEFAULT 0,
  avg_deal_size numeric NOT NULL DEFAULT 0,
  avg_cycle_time integer NOT NULL DEFAULT 0,
  win_rate numeric NOT NULL DEFAULT 0,
  deals_won integer NOT NULL DEFAULT 0,
  deals_lost integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pipeline_velocity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pipeline_velocity" ON public.pipeline_velocity FOR SELECT USING (true);
CREATE POLICY "Auth users can insert pipeline_velocity" ON public.pipeline_velocity FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update pipeline_velocity" ON public.pipeline_velocity FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete pipeline_velocity" ON public.pipeline_velocity FOR DELETE TO authenticated USING (true);

-- Competitive Analysis data
CREATE TABLE public.competitive_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_name text NOT NULL,
  wins integer NOT NULL DEFAULT 0,
  losses integer NOT NULL DEFAULT 0,
  top_reason text NOT NULL DEFAULT '',
  period_month text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.competitive_analysis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read competitive_analysis" ON public.competitive_analysis FOR SELECT USING (true);
CREATE POLICY "Auth users can insert competitive_analysis" ON public.competitive_analysis FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update competitive_analysis" ON public.competitive_analysis FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete competitive_analysis" ON public.competitive_analysis FOR DELETE TO authenticated USING (true);

-- Revenue Concentration data
CREATE TABLE public.revenue_concentration (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  revenue numeric NOT NULL DEFAULT 0,
  revenue_pct numeric NOT NULL DEFAULT 0,
  segment text,
  contract_start date,
  contract_end date,
  growth_trend numeric DEFAULT 0,
  risk_level text DEFAULT 'low',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.revenue_concentration ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read revenue_concentration" ON public.revenue_concentration FOR SELECT USING (true);
CREATE POLICY "Auth users can insert revenue_concentration" ON public.revenue_concentration FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update revenue_concentration" ON public.revenue_concentration FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete revenue_concentration" ON public.revenue_concentration FOR DELETE TO authenticated USING (true);
