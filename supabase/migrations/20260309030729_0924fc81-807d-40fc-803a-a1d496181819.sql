
DROP POLICY "Service role can insert health_alerts" ON public.health_alerts;
CREATE POLICY "Admins can insert health_alerts" ON public.health_alerts FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete health_alerts" ON public.health_alerts FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));
