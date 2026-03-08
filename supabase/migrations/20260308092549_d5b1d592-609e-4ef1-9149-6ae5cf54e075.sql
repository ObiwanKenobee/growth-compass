
-- Audit log table
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL,
  old_data jsonb,
  new_data jsonb,
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);

-- Index for querying by table and time
CREATE INDEX idx_audit_log_table_time ON public.audit_log (table_name, changed_at DESC);
CREATE INDEX idx_audit_log_changed_by ON public.audit_log (changed_by);

-- Enable RLS
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admins can read audit_log"
  ON public.audit_log FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Generic audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger_fn()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, old_data, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, old_data, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), auth.uid());
    RETURN OLD;
  END IF;
END;
$$;

-- Attach triggers to all dashboard tables
CREATE TRIGGER audit_dashboard_metrics AFTER INSERT OR UPDATE OR DELETE ON public.dashboard_metrics FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_acquisition_channels AFTER INSERT OR UPDATE OR DELETE ON public.acquisition_channels FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_customer_segments AFTER INSERT OR UPDATE OR DELETE ON public.customer_segments FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_funnel_stages AFTER INSERT OR UPDATE OR DELETE ON public.funnel_stages FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_strategic_intel AFTER INSERT OR UPDATE OR DELETE ON public.strategic_intel FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_expansion_revenue AFTER INSERT OR UPDATE OR DELETE ON public.expansion_revenue FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_financial_data AFTER INSERT OR UPDATE OR DELETE ON public.financial_data FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_cohort_retention AFTER INSERT OR UPDATE OR DELETE ON public.cohort_retention FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_nrr_tracking AFTER INSERT OR UPDATE OR DELETE ON public.nrr_tracking FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_customer_health AFTER INSERT OR UPDATE OR DELETE ON public.customer_health FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_pipeline_velocity AFTER INSERT OR UPDATE OR DELETE ON public.pipeline_velocity FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_competitive_analysis AFTER INSERT OR UPDATE OR DELETE ON public.competitive_analysis FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
CREATE TRIGGER audit_revenue_concentration AFTER INSERT OR UPDATE OR DELETE ON public.revenue_concentration FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_fn();
