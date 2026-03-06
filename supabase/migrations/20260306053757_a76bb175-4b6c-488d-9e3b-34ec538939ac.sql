
-- Drop existing restrictive policies and add public read access
DROP POLICY "Authenticated users can read dashboard_metrics" ON public.dashboard_metrics;
DROP POLICY "Authenticated users can read acquisition_channels" ON public.acquisition_channels;
DROP POLICY "Authenticated users can read customer_segments" ON public.customer_segments;
DROP POLICY "Authenticated users can read cohort_retention" ON public.cohort_retention;
DROP POLICY "Authenticated users can read funnel_stages" ON public.funnel_stages;
DROP POLICY "Authenticated users can read strategic_intel" ON public.strategic_intel;
DROP POLICY "Authenticated users can read expansion_revenue" ON public.expansion_revenue;
DROP POLICY "Authenticated users can read financial_data" ON public.financial_data;

-- Public read for dashboard viewing
CREATE POLICY "Anyone can read dashboard_metrics" ON public.dashboard_metrics FOR SELECT USING (true);
CREATE POLICY "Anyone can read acquisition_channels" ON public.acquisition_channels FOR SELECT USING (true);
CREATE POLICY "Anyone can read customer_segments" ON public.customer_segments FOR SELECT USING (true);
CREATE POLICY "Anyone can read cohort_retention" ON public.cohort_retention FOR SELECT USING (true);
CREATE POLICY "Anyone can read funnel_stages" ON public.funnel_stages FOR SELECT USING (true);
CREATE POLICY "Anyone can read strategic_intel" ON public.strategic_intel FOR SELECT USING (true);
CREATE POLICY "Anyone can read expansion_revenue" ON public.expansion_revenue FOR SELECT USING (true);
CREATE POLICY "Anyone can read financial_data" ON public.financial_data FOR SELECT USING (true);

-- Authenticated write for admin
CREATE POLICY "Auth users can insert dashboard_metrics" ON public.dashboard_metrics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update dashboard_metrics" ON public.dashboard_metrics FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete dashboard_metrics" ON public.dashboard_metrics FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert acquisition_channels" ON public.acquisition_channels FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update acquisition_channels" ON public.acquisition_channels FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete acquisition_channels" ON public.acquisition_channels FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert customer_segments" ON public.customer_segments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update customer_segments" ON public.customer_segments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete customer_segments" ON public.customer_segments FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert funnel_stages" ON public.funnel_stages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update funnel_stages" ON public.funnel_stages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete funnel_stages" ON public.funnel_stages FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert strategic_intel" ON public.strategic_intel FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update strategic_intel" ON public.strategic_intel FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete strategic_intel" ON public.strategic_intel FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert expansion_revenue" ON public.expansion_revenue FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update expansion_revenue" ON public.expansion_revenue FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete expansion_revenue" ON public.expansion_revenue FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert financial_data" ON public.financial_data FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update financial_data" ON public.financial_data FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete financial_data" ON public.financial_data FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert cohort_retention" ON public.cohort_retention FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update cohort_retention" ON public.cohort_retention FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete cohort_retention" ON public.cohort_retention FOR DELETE TO authenticated USING (true);
