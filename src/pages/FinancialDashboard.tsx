import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Flame, Clock, BarChart3 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { revenueData, burnRateData, runwayData, revenueBreakdown, cashFlowData, financialKPIs } from "@/data/financialData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Link } from "react-router-dom";

const tooltipStyle = {
  background: "hsl(200, 12%, 9%)",
  border: "1px solid hsl(200, 10%, 16%)",
  borderRadius: "8px",
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
};

const formatCurrency = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`;

const FinancialDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground tracking-tight">Financial Health</h1>
              <p className="text-xs text-muted-foreground">Runway, Revenue & Burn Analytics</p>
            </div>
          </div>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Customer Dashboard
          </Link>
        </motion.header>

        {/* Top Triad: MRR, Burn, Runway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* MRR */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Monthly Recurring Revenue</p>
              <div className="flex items-end gap-3 mt-2">
                <span className="text-4xl font-bold font-display text-foreground">{formatCurrency(revenueData.mrr)}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-mono text-success">+{revenueData.mrrTrend}%</span>
                <span className="text-xs text-muted-foreground ml-1">MoM</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">ARR: <span className="font-mono text-foreground">{formatCurrency(revenueData.arr)}</span></p>
            </div>
            <div className="h-20 -mx-2 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData.history}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(162, 63%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="hsl(162, 63%, 45%)" strokeWidth={2} fill="url(#mrrGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Burn Rate */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Monthly Burn Rate</p>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold font-display text-foreground">{formatCurrency(burnRateData.monthly)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <TrendingDown className="w-4 h-4 text-success" />
              <span className="text-sm font-mono text-success">{burnRateData.trend}%</span>
              <span className="text-xs text-muted-foreground ml-1">declining</span>
            </div>
            <div className="h-20 -mx-2 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={burnRateData.history}>
                  <defs>
                    <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(38, 90%, 55%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(38, 90%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="hsl(38, 90%, 55%)" strokeWidth={2} fill="url(#burnGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Runway */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Runway</p>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold font-display text-foreground">{runwayData.months}</span>
              <span className="text-sm text-muted-foreground mb-1">months</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-mono text-success">+{runwayData.trend} mo</span>
              <span className="text-xs text-muted-foreground ml-1">vs last quarter</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cash: <span className="font-mono text-foreground">{formatCurrency(runwayData.cashOnHand)}</span></p>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((runwayData.months / 36) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground font-mono">0</span>
              <span className="text-xs text-muted-foreground font-mono">36 mo</span>
            </div>
          </motion.div>
        </div>

        {/* Cash Flow */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl border border-border gradient-card shadow-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Cash Flow</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 10%, 14%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(200, 8%, 48%)", fontSize: 12, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(200, 8%, 48%)", fontSize: 12, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatCurrency(v)]} />
                <Bar dataKey="inflow" fill="hsl(162, 63%, 45%)" radius={[4, 4, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} opacity={0.6} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-3 justify-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-primary" /><span className="text-xs text-muted-foreground">Inflow</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-destructive opacity-60" /><span className="text-xs text-muted-foreground">Outflow</span></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Runway Projection */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Runway Projection</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={runwayData.projections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 10%, 14%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(200, 8%, 48%)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(200, 8%, 48%)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatCurrency(v)]} />
                  <Line type="monotone" dataKey="conservative" stroke="hsl(38, 90%, 55%)" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Conservative" />
                  <Line type="monotone" dataKey="optimistic" stroke="hsl(162, 63%, 45%)" strokeWidth={2} dot={false} name="Optimistic" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-3 justify-center">
              <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-accent" style={{ borderTop: "2px dashed" }} /><span className="text-xs text-muted-foreground">Conservative</span></div>
              <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-primary" /><span className="text-xs text-muted-foreground">Optimistic</span></div>
            </div>
          </motion.div>

          {/* Burn Breakdown */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Burn Breakdown</h3>
            <div className="space-y-4">
              {burnRateData.breakdown.map((item, i) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-foreground">{item.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-foreground">{formatCurrency(item.amount)}</span>
                      <span className="text-xs font-mono text-muted-foreground">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.05 }}
                      className="h-full rounded-full bg-accent"
                      style={{ opacity: 1 - i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Revenue Sources */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Revenue Sources</h3>
            <div className="space-y-4">
              {revenueBreakdown.map((source, i) => (
                <div key={source.source}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-foreground">{source.source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-foreground">{formatCurrency(source.amount)}</span>
                      <span className="text-xs font-mono text-muted-foreground">{source.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Financial KPIs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="rounded-xl border border-border gradient-card shadow-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-6">Key Financial Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Gross Margin", value: `${financialKPIs.grossMargin.value}%`, trend: financialKPIs.grossMargin.trend, icon: BarChart3 },
                { label: "Net Margin", value: `${financialKPIs.netMargin.value}%`, trend: financialKPIs.netMargin.trend, icon: DollarSign },
                { label: "Rev / Employee", value: `$${(financialKPIs.revenuePerEmployee.value / 1000).toFixed(1)}k`, trend: financialKPIs.revenuePerEmployee.trend, icon: Flame },
                { label: "Op. Leverage", value: `${financialKPIs.operatingLeverage.value}x`, trend: financialKPIs.operatingLeverage.trend, icon: Clock },
              ].map(kpi => (
                <div key={kpi.label} className="p-4 rounded-lg bg-secondary/40">
                  <kpi.icon className="w-4 h-4 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold font-mono text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground">{kpi.label}</span>
                    <span className="text-xs font-mono text-success">+{kpi.trend}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
