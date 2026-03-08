
-- Enable realtime for all dashboard tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.dashboard_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.acquisition_channels;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customer_segments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cohort_retention;
ALTER PUBLICATION supabase_realtime ADD TABLE public.funnel_stages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.strategic_intel;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expansion_revenue;
ALTER PUBLICATION supabase_realtime ADD TABLE public.nrr_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customer_health;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pipeline_velocity;
ALTER PUBLICATION supabase_realtime ADD TABLE public.competitive_analysis;
ALTER PUBLICATION supabase_realtime ADD TABLE public.revenue_concentration;
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_data;

-- Create user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS for user_roles: admins can manage, users can read own
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Now update write policies on all data tables to require admin role
-- Drop old permissive auth write policies and replace with admin-only

-- dashboard_metrics
DROP POLICY IF EXISTS "Auth users can insert dashboard_metrics" ON public.dashboard_metrics;
DROP POLICY IF EXISTS "Auth users can update dashboard_metrics" ON public.dashboard_metrics;
DROP POLICY IF EXISTS "Auth users can delete dashboard_metrics" ON public.dashboard_metrics;
CREATE POLICY "Admins can insert dashboard_metrics" ON public.dashboard_metrics FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update dashboard_metrics" ON public.dashboard_metrics FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete dashboard_metrics" ON public.dashboard_metrics FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- acquisition_channels
DROP POLICY IF EXISTS "Auth users can insert acquisition_channels" ON public.acquisition_channels;
DROP POLICY IF EXISTS "Auth users can update acquisition_channels" ON public.acquisition_channels;
DROP POLICY IF EXISTS "Auth users can delete acquisition_channels" ON public.acquisition_channels;
CREATE POLICY "Admins can insert acquisition_channels" ON public.acquisition_channels FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update acquisition_channels" ON public.acquisition_channels FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete acquisition_channels" ON public.acquisition_channels FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- customer_segments
DROP POLICY IF EXISTS "Auth users can insert customer_segments" ON public.customer_segments;
DROP POLICY IF EXISTS "Auth users can update customer_segments" ON public.customer_segments;
DROP POLICY IF EXISTS "Auth users can delete customer_segments" ON public.customer_segments;
CREATE POLICY "Admins can insert customer_segments" ON public.customer_segments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update customer_segments" ON public.customer_segments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete customer_segments" ON public.customer_segments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- cohort_retention
DROP POLICY IF EXISTS "Auth users can insert cohort_retention" ON public.cohort_retention;
DROP POLICY IF EXISTS "Auth users can update cohort_retention" ON public.cohort_retention;
DROP POLICY IF EXISTS "Auth users can delete cohort_retention" ON public.cohort_retention;
CREATE POLICY "Admins can insert cohort_retention" ON public.cohort_retention FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update cohort_retention" ON public.cohort_retention FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete cohort_retention" ON public.cohort_retention FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- funnel_stages
DROP POLICY IF EXISTS "Auth users can insert funnel_stages" ON public.funnel_stages;
DROP POLICY IF EXISTS "Auth users can update funnel_stages" ON public.funnel_stages;
DROP POLICY IF EXISTS "Auth users can delete funnel_stages" ON public.funnel_stages;
CREATE POLICY "Admins can insert funnel_stages" ON public.funnel_stages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update funnel_stages" ON public.funnel_stages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete funnel_stages" ON public.funnel_stages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- strategic_intel
DROP POLICY IF EXISTS "Auth users can insert strategic_intel" ON public.strategic_intel;
DROP POLICY IF EXISTS "Auth users can update strategic_intel" ON public.strategic_intel;
DROP POLICY IF EXISTS "Auth users can delete strategic_intel" ON public.strategic_intel;
CREATE POLICY "Admins can insert strategic_intel" ON public.strategic_intel FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update strategic_intel" ON public.strategic_intel FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete strategic_intel" ON public.strategic_intel FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- expansion_revenue
DROP POLICY IF EXISTS "Auth users can insert expansion_revenue" ON public.expansion_revenue;
DROP POLICY IF EXISTS "Auth users can update expansion_revenue" ON public.expansion_revenue;
DROP POLICY IF EXISTS "Auth users can delete expansion_revenue" ON public.expansion_revenue;
CREATE POLICY "Admins can insert expansion_revenue" ON public.expansion_revenue FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update expansion_revenue" ON public.expansion_revenue FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete expansion_revenue" ON public.expansion_revenue FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- nrr_tracking
DROP POLICY IF EXISTS "Auth users can insert nrr_tracking" ON public.nrr_tracking;
DROP POLICY IF EXISTS "Auth users can update nrr_tracking" ON public.nrr_tracking;
DROP POLICY IF EXISTS "Auth users can delete nrr_tracking" ON public.nrr_tracking;
CREATE POLICY "Admins can insert nrr_tracking" ON public.nrr_tracking FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update nrr_tracking" ON public.nrr_tracking FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete nrr_tracking" ON public.nrr_tracking FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- customer_health
DROP POLICY IF EXISTS "Auth users can insert customer_health" ON public.customer_health;
DROP POLICY IF EXISTS "Auth users can update customer_health" ON public.customer_health;
DROP POLICY IF EXISTS "Auth users can delete customer_health" ON public.customer_health;
CREATE POLICY "Admins can insert customer_health" ON public.customer_health FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update customer_health" ON public.customer_health FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete customer_health" ON public.customer_health FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- pipeline_velocity
DROP POLICY IF EXISTS "Auth users can insert pipeline_velocity" ON public.pipeline_velocity;
DROP POLICY IF EXISTS "Auth users can update pipeline_velocity" ON public.pipeline_velocity;
DROP POLICY IF EXISTS "Auth users can delete pipeline_velocity" ON public.pipeline_velocity;
CREATE POLICY "Admins can insert pipeline_velocity" ON public.pipeline_velocity FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pipeline_velocity" ON public.pipeline_velocity FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pipeline_velocity" ON public.pipeline_velocity FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- competitive_analysis
DROP POLICY IF EXISTS "Auth users can insert competitive_analysis" ON public.competitive_analysis;
DROP POLICY IF EXISTS "Auth users can update competitive_analysis" ON public.competitive_analysis;
DROP POLICY IF EXISTS "Auth users can delete competitive_analysis" ON public.competitive_analysis;
CREATE POLICY "Admins can insert competitive_analysis" ON public.competitive_analysis FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update competitive_analysis" ON public.competitive_analysis FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete competitive_analysis" ON public.competitive_analysis FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- revenue_concentration
DROP POLICY IF EXISTS "Auth users can insert revenue_concentration" ON public.revenue_concentration;
DROP POLICY IF EXISTS "Auth users can update revenue_concentration" ON public.revenue_concentration;
DROP POLICY IF EXISTS "Auth users can delete revenue_concentration" ON public.revenue_concentration;
CREATE POLICY "Admins can insert revenue_concentration" ON public.revenue_concentration FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update revenue_concentration" ON public.revenue_concentration FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete revenue_concentration" ON public.revenue_concentration FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- financial_data
DROP POLICY IF EXISTS "Auth users can insert financial_data" ON public.financial_data;
DROP POLICY IF EXISTS "Auth users can update financial_data" ON public.financial_data;
DROP POLICY IF EXISTS "Auth users can delete financial_data" ON public.financial_data;
CREATE POLICY "Admins can insert financial_data" ON public.financial_data FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update financial_data" ON public.financial_data FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete financial_data" ON public.financial_data FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
