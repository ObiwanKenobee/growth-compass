import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const healthThreshold = body.health_threshold ?? 40;
    const nrrThreshold = body.nrr_threshold ?? 100;

    // Check customer health
    const { data: atRiskAccounts } = await supabase
      .from("customer_health")
      .select("name, score, status, reason, revenue")
      .lt("score", healthThreshold)
      .order("score", { ascending: true });

    // Check NRR
    const { data: nrrRows } = await supabase
      .from("nrr_tracking")
      .select("nrr_value, target, period_month")
      .order("period_month", { ascending: false })
      .limit(1);

    const latestNRR = nrrRows?.[0];
    const nrrBelowTarget = latestNRR && Number(latestNRR.nrr_value) < nrrThreshold;

    const alerts: { type: string; severity: string; message: string; details: Record<string, unknown> }[] = [];

    if (atRiskAccounts && atRiskAccounts.length > 0) {
      for (const acct of atRiskAccounts) {
        alerts.push({
          type: "customer_health",
          severity: acct.score < 20 ? "critical" : "warning",
          message: `${acct.name} health score dropped to ${acct.score} — ${acct.reason}`,
          details: { name: acct.name, score: acct.score, status: acct.status, revenue: acct.revenue },
        });
      }
    }

    if (nrrBelowTarget && latestNRR) {
      alerts.push({
        type: "nrr_below_target",
        severity: Number(latestNRR.nrr_value) < 95 ? "critical" : "warning",
        message: `NRR at ${latestNRR.nrr_value}% (target: ${latestNRR.target}%) for ${latestNRR.period_month}`,
        details: { nrr: latestNRR.nrr_value, target: latestNRR.target, period: latestNRR.period_month },
      });
    }

    return new Response(JSON.stringify({ alerts, checked_at: new Date().toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
