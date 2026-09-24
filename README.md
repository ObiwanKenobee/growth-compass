# ATLAS SANCTUM

## Customer & Marketing Intelligence Dashboard

> **The Growth Radar for a Regenerative Intelligence Platform**

Atlas Sanctum is building infrastructure for a new economy around environmental intelligence, verification, regenerative assets, institutional coordination, and measurable impact.

The **Customer & Marketing Dashboard** is the frontend observability layer for that ecosystem.

It answers one question:

> **Is the Atlas Sanctum ecosystem growing sustainably, or are we simply replacing what we lose?**

Financial dashboards explain whether the company survives.

Customer intelligence explains **why it survives, where growth comes from, and whether that growth compounds**.

---

# 01. North Star

The dashboard should feel less like a conventional SaaS analytics page and more like an **ecosystem health monitor**.

In ecology, system health can be understood through signals such as:

* population growth
* mortality
* resource flows
* diversity
* resilience
* interaction patterns

For a technology company, these become:

| Ecological Signal    | Atlas Sanctum Signal                  |
| -------------------- | ------------------------------------- |
| Birth                | New customers                         |
| Death                | Churn                                 |
| Energy input         | Acquisition spend                     |
| Energy efficiency    | LTV / CAC                             |
| Population diversity | Customer segments                     |
| Migration pathways   | Acquisition channels                  |
| Ecosystem activity   | Product engagement                    |
| Resilience           | Retention                             |
| Expansion            | Net revenue expansion                 |
| Ecosystem formation  | Partnerships + institutional adoption |

The UI should make these relationships visible.

**Do not design a spreadsheet with charts.**

Design a **growth observatory**.

---

# 02. Experience Principle

The interface hierarchy follows a simple strategic sequence:

```text
SYSTEM HEALTH
      ↓
UNIT ECONOMICS
      ↓
GROWTH SOURCES
      ↓
CUSTOMER COMPOSITION
      ↓
RETENTION
      ↓
CONVERSION
      ↓
EXPANSION
      ↓
STRATEGIC CONTEXT
```

The user should be able to understand the state of the customer ecosystem in:

**5 seconds → 30 seconds → 5 minutes**

### At 5 seconds

> Is growth healthy?

### At 30 seconds

> What is driving or damaging it?

### At 5 minutes

> What should the team investigate?

---

# 03. Visual North Star

The visual language should combine:

**Nike × GitHub × Formula 1 telemetry × institutional intelligence × African technological futurism**

But the dashboard itself should remain restrained.

### Desired characteristics

* cinematic
* precise
* calm
* data-dense
* premium
* technical
* institutional
* spatial
* alive
* highly legible

### Avoid

* generic SaaS gradients
* excessive glassmorphism
* dashboard clutter
* rainbow charts
* oversized decorative illustrations
* meaningless animations
* dashboard "gamification"
* visual noise masquerading as intelligence

The interface should feel like something a **chief growth officer, climate fund, enterprise operator, or systems architect could actually use**.

---

# 04. Application Shell

```text
┌─────────────────────────────────────────────────────────────┐
│ ATLAS SANCTUM                         Search   Alerts  User │
├───────────────┬─────────────────────────────────────────────┤
│               │                                             │
│ Overview      │ CUSTOMER & MARKETING                        │
│               │ Growth Observatory                          │
│ Growth        │                                             │
│ Customers     │ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ Acquisition   │ │   CAC   │ │   LTV   │ │ CHURN   │       │
│ Retention     │ └─────────┘ └─────────┘ └─────────┘       │
│ Segments      │                                             │
│ Expansion     │                                             │
│ Intelligence  │                                             │
│               │                                             │
│               │ Unit Economics                              │
│               │ Channels                                    │
│               │ Segments                                    │
│               │ Retention                                   │
│               │ Journey                                     │
│               │ Expansion                                   │
│               │ Intelligence                                │
│               │                                             │
├───────────────┴─────────────────────────────────────────────┤
│ System Status     Data Freshness     Verification Status   │
└─────────────────────────────────────────────────────────────┘
```

The navigation should remain quiet.

The data is the protagonist.

---

# 05. Growth Radar

## The first viewport

The first screen contains the three signals that define the health of the customer engine:

```text
CAC              LTV              CHURN

$4,280            $186K            2.8%
↓ 12.4%           ↑ 18.7%          ↓ 0.6%
```

Each card contains:

1. Primary metric
2. Period comparison
3. Six-month sparkline
4. Direction indicator
5. Contextual interpretation
6. Segment or period selector

---

## CAC

### Customer Acquisition Cost

Measures the average cost required to acquire a paying customer.

Potential Atlas Sanctum customers include:

* climate funds
* governments
* research institutions
* enterprises
* NGOs
* infrastructure partners
* impact investors

### Card structure

```text
CUSTOMER ACQUISITION COST

$4,280
↓ 12.4%

━━━━━━━━━━━━━━━━━━╮
                  ╰──────╮
                         ╰───

Last 6 months

Enterprise     $5.1K
Institutions   $3.8K
Partnerships   $2.2K
```

The chart should not merely show historical movement.

It should reveal **efficiency**.

---

# 06. LTV

## Lifetime Value

LTV estimates the economic value generated by a customer throughout their relationship with Atlas Sanctum.

Display:

```text
LIFETIME VALUE

$186,000

↑ 18.7%

Average Contract
38 months

Expansion Revenue
+24%
```

Secondary information can expose:

* average contract duration
* average annual contract value
* renewal rate
* expansion revenue
* segment-specific LTV

The primary visual remains the long-term trajectory.

---

# 07. Churn

## Customer Churn

Churn represents customer loss over a defined period.

```text
CUSTOMER CHURN

2.8%

↓ 0.6%

MONTHLY
12-MONTH TREND
```

The UI should distinguish:

* logo churn
* revenue churn
* voluntary churn
* involuntary churn
* segment churn

A spike should trigger visual attention, but not panic theater.

Use restrained state transitions:

```text
HEALTHY
NORMAL
WATCH
ALERT
```

The interface should tell the operator:

> "Investigate this."

Not:

> "THE SYSTEM IS ON FIRE."

---

# 08. Unit Economics

The next layer answers:

> **Does acquiring customers create durable economic value?**

## LTV : CAC

```text
             43.5x

        ╭────────────╮
       /              \
      │    LTV:CAC     │
       \     43.5x    /
        ╰────────────╯

       ↑ 8.2% YoY
```

Use a circular visualization or radial gauge only if it communicates the ratio faster than typography.

Avoid decorative gauges.

The number itself should remain dominant.

### Supporting visualization

```text
LTV:CAC TREND

50x ┤                         ╭──
40x ┤              ╭──────────╯
30x ┤        ╭─────╯
20x ┤────────╯
10x ┤
    └────────────────────────────
      Jan  Feb  Mar  Apr  May  Jun
```

The important interaction is **time**.

Operators should understand whether unit economics are improving or deteriorating.

---

# 09. Acquisition Channels

Growth enters through different pathways.

The dashboard should visualize:

```text
CHANNEL                     CUSTOMERS       CAC

Enterprise Partnerships       24            $2.4K
Climate Institutions          17            $3.1K
Direct Outreach               13            $5.2K
Research Collaborations        9            $2.8K
Developer Ecosystem            7            $1.9K
Events                         5            $4.7K
```

### Recommended visualization

A horizontal bar chart with:

* customer volume
* CAC
* conversion rate
* LTV
* channel trend

Hovering a channel should expose a richer intelligence card.

```text
CLIMATE INSTITUTIONS

17 customers
$3.1K CAC
$214K LTV
6.4% conversion

↑ 23% acquisition growth
```

This creates an immediate bridge between **marketing activity and economic outcome**.

---

# 10. Customer Segmentation Map

Atlas Sanctum is not serving one homogeneous customer.

The segmentation layer should recognize organizational archetypes.

### Initial segments

```text
GOVERNMENT
CLIMATE INVESTOR
ENTERPRISE
NGO
RESEARCH
INFRASTRUCTURE
DEVELOPER
```

Visualize each segment through:

* customer count
* ARR
* average contract value
* LTV
* churn
* growth rate
* expansion rate

---

## Bubble / Matrix View

```text
HIGH GROWTH
     │
     │        ● Government
     │
     │   ● Climate Funds
     │
     │                    ● Enterprise
     │
     ├──────────────────────────────
     │
     │  ● Research
     │
     │          ● NGO
     │
     └──────────────────────────────
          LOW VALUE       HIGH VALUE
```

Bubble size can represent revenue.

Bubble movement can represent growth.

Color should represent one semantic dimension only.

**Never encode five variables into one chart.**

---

# 11. Retention Observatory

Churn is an outcome.

Engagement often provides earlier signals.

The Retention layer monitors whether customers are actually using Atlas Sanctum.

Potential engagement signals:

* regenerative assets verified
* simulations executed
* reports generated
* ecosystem metrics analyzed
* data sources connected
* users active
* API calls
* governance actions
* projects monitored
* verification workflows completed

---

# 12. Cohort Analysis

The core retention visualization:

```text
CUSTOMER RETENTION

             Month 0  Month 1  Month 2  Month 3  Month 4
Jan 2026       100%     92%      88%      84%      81%
Feb 2026       100%     95%      90%      87%      84%
Mar 2026       100%     91%      85%      82%
Apr 2026       100%     94%      89%
May 2026       100%     96%
Jun 2026       100%
```

Use a restrained heatmap.

The goal is to identify **retention shape**, not create a visual spectacle.

---

# 13. Customer Journey Funnel

The funnel represents movement from first contact to durable adoption.

```text
INQUIRY
  1,240
    │
    ▼
DEMO
   420
    │
    ▼
PILOT
   180
    │
    ▼
PAID CONTRACT
    72
    │
    ▼
LONG-TERM PARTNER
    49
```

Every stage should expose:

* absolute count
* conversion rate
* average time in stage
* previous-period comparison

### Friction detection

If:

```text
Demo → Pilot

42% → 19%
```

the dashboard should make the transition visibly noticeable.

Clicking the stage opens supporting context:

```text
PILOT CONVERSION

19%

↓ 11%

Possible contributing signals

• procurement delays
• implementation complexity
• unclear ROI
• insufficient technical integration
```

These should be presented as **signals and hypotheses**, not automated conclusions.

---

# 14. Expansion Revenue

New customers are only one part of growth.

Atlas Sanctum should observe how existing organizations deepen their relationship with the ecosystem.

Expansion signals include:

* higher subscription tiers
* additional verification projects
* new geographic regions
* additional users
* new APIs
* policy simulations
* biodiversity intelligence
* climate-risk intelligence
* governance modules

### Visualization

```text
NET EXPANSION

             +32%

New ARR       +$420K
Expansion     +$180K
Contraction   -$42K
Churn         -$71K
```

The interface should clearly distinguish **new logo growth** from **existing-customer expansion**.

---

# 15. Strategic Intelligence

The bottom of the dashboard moves from quantitative telemetry to institutional context.

This is where the numbers acquire a narrative.

Example feed:

```text
● GOVERNMENT PILOT
  New environmental verification pilot launched.

  2 hours ago

● CLIMATE PARTNERSHIP
  Institutional partner connected 4 new projects.

  Yesterday

● ECOSYSTEM MILESTONE
  1,000th regenerative asset verified.

  3 days ago

● ENTERPRISE EXPANSION
  Existing customer expanded into biodiversity intelligence.

  5 days ago
```

This section should feel closer to an **intelligence feed** than a social timeline.

---

# 16. The Ecosystem Health Model

The frontend should conceptually model customer growth as a system.

```text
                    ┌───────────────┐
                    │   AWARENESS   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   ACQUISITION │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   ACTIVATION  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   RETENTION   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   EXPANSION   │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   ADVOCACY    │
                    └───────┬───────┘
                            │
                            └──────────────┐
                                           ↓
                                     NEW DEMAND
```

The dashboard observes the entire loop.

This is important because Atlas Sanctum is intended to become a network.

More customers create:

* more data
* more verification activity
* more institutional relationships
* more network effects
* more ecosystem intelligence
* more opportunities for expansion

The frontend should make that compounding system legible.

---

# 17. Data Architecture

The frontend should never couple directly to raw backend metrics.

Use a normalized analytics domain.

```text
API
 │
 ▼
Analytics Service
 │
 ├── Customer Metrics
 ├── Acquisition Metrics
 ├── Retention Metrics
 ├── Revenue Metrics
 ├── Engagement Metrics
 └── Intelligence Events
 │
 ▼
Frontend Data Layer
 │
 ├── Queries
 ├── Derived Metrics
 ├── Filters
 └── UI State
 │
 ▼
Dashboard Components
```

Example domain model:

```ts
interface CustomerMetric {
  period: string
  customerCount: number
  newCustomers: number
  churnedCustomers: number
  cac: number
  ltv: number
  churnRate: number
}

interface AcquisitionChannel {
  id: string
  name: string
  customersAcquired: number
  acquisitionCost: number
  conversionRate: number
  ltv: number
}

interface CustomerSegment {
  id: string
  name: string
  customerCount: number
  averageContractValue: number
  ltv: number
  churnRate: number
  growthRate: number
  expansionRate: number
}
```

---

# 18. Frontend Component Architecture

Suggested structure:

```text
src/
├── app/
│   ├── dashboard/
│   │   └── marketing/
│   │       └── page.tsx
│
├── components/
│   ├── marketing/
│   │   ├── GrowthRadar/
│   │   ├── MetricCard/
│   │   ├── UnitEconomics/
│   │   ├── AcquisitionChannels/
│   │   ├── CustomerSegments/
│   │   ├── RetentionCohorts/
│   │   ├── CustomerJourney/
│   │   ├── ExpansionRevenue/
│   │   └── IntelligenceFeed/
│   │
│   ├── charts/
│   │   ├── Sparkline/
│   │   ├── LineChart/
│   │   ├── BarChart/
│   │   ├── BubbleChart/
│   │   ├── Heatmap/
│   │   └── FunnelChart/
│   │
│   └── ui/
│       ├── Card/
│       ├── Badge/
│       ├── Tooltip/
│       ├── Tabs/
│       ├── Select/
│       └── DateRange/
│
├── lib/
│   ├── analytics/
│   ├── formatters/
│   └── calculations/
│
└── types/
    └── marketing.ts
```

---

# 19. Interaction Model

The dashboard should support progressive disclosure.

### Level 1

**Scan**

See the major signals.

### Level 2

**Inspect**

Hover, click, filter, compare.

### Level 3

**Investigate**

Open a detailed analytics view.

### Level 4

**Act**

Create an operational follow-up.

Example:

```text
Churn ↑

      ↓

Segment filter

      ↓

Enterprise

      ↓

Customer cohort

      ↓

Account list

      ↓

Engagement history

      ↓

Create intervention
```

The dashboard becomes useful when the path from **signal → explanation → action** is short.

---

# 20. Time Controls

Every major analytical view should support:

```text
7D   30D   90D   6M   12M   YTD   CUSTOM
```

Comparison:

```text
vs previous period
vs previous year
vs target
vs benchmark
```

Avoid hiding time context.

Every metric should answer:

> Compared with what?

---

# 21. Filters

Global filters:

```text
Date
Customer Segment
Geography
Customer Size
Acquisition Channel
Product
Contract Tier
Industry
Region
```

The filter state should persist across compatible panels.

Example:

```text
Region: East Africa
Segment: Government
Period: Last 12 Months
```

Every chart should then reflect the same analytical universe.

---

# 22. Geographic Intelligence

Atlas Sanctum is fundamentally geographic.

Eventually the marketing dashboard should be able to connect customers to the planetary map.

```text
                CUSTOMER ECOSYSTEM

        Europe ●───────● Middle East

             ● Africa
           ● Nairobi
         ● Kigali
       ● Lagos

                  ● India

                         ● Southeast Asia
```

A future geographic mode could visualize:

* customers
* projects
* verification activity
* revenue
* expansion
* ecosystem partnerships

This connects the **customer layer** to the wider Atlas Sanctum intelligence system.

---

# 23. Design Tokens

The visual system should be tokenized.

```ts
const dashboardTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 18
  },

  typography: {
    display: "clamp(2rem, 4vw, 4rem)",
    heading: "1.5rem",
    body: "0.875rem",
    metadata: "0.75rem"
  }
}
```

Color should communicate semantic state rather than decoration.

```text
positive → improvement
warning  → investigate
negative → deterioration
neutral  → informational
```

The interface should work in monochrome before semantic accents are added.

That is a useful test of whether the hierarchy actually works.

---

# 24. Motion System

Motion should communicate state.

### Metric update

Subtle number transition.

### Chart interaction

Crosshair + tooltip.

### Filtering

Content transitions rather than abrupt replacement.

### Alert

Small state transition.

### Navigation

Fast and restrained.

Avoid:

* constant pulsing
* spinning dashboards
* unnecessary parallax
* decorative chart animation

The system should feel **alive because the data changes**, not because everything is moving.

---

# 25. Responsive Strategy

### Desktop

Primary operating environment.

```text
1440px+
```

Full dashboard composition.

### Laptop

```text
1024px - 1439px
```

Compress cards while preserving the hierarchy.

### Tablet

```text
768px - 1023px
```

Two-column analytical layouts.

### Mobile

```text
<768px
```

Transform the dashboard into a prioritized intelligence stream.

```text
Growth Radar
     ↓
CAC
LTV
Churn
     ↓
Unit Economics
     ↓
Channels
     ↓
Retention
     ↓
Intelligence
```

Do not simply shrink the desktop dashboard.

**Recompose it.**

---

# 26. Accessibility

Analytics interfaces frequently fail accessibility because designers prioritize density.

Atlas Sanctum should not.

Requirements:

* keyboard navigation
* semantic HTML
* accessible chart descriptions
* visible focus states
* sufficient contrast
* screen-reader-friendly metric labels
* non-color-dependent status indicators
* reduced-motion support
* accessible tooltips
* responsive text scaling

Charts must have textual equivalents.

For example:

> CAC decreased 12.4% over the last six months.

not merely:

> [green downward line]

---

# 27. Performance

The dashboard may eventually display thousands of organizations and millions of analytical events.

Frontend requirements:

* lazy-load secondary analytics
* virtualize large tables
* memoize expensive transformations
* cache query results
* stream high-priority metrics first
* avoid rendering hidden charts
* use server-side aggregation where appropriate
* progressively hydrate expensive visualizations

The first viewport should become useful before the entire analytics universe arrives.

---

# 28. Trust & Data Freshness

Because Atlas Sanctum deals with institutional and environmental intelligence, metrics must communicate their provenance.

Every major metric can expose:

```text
Updated 4 min ago

Source
Customer Intelligence API

Coverage
98.4%

Confidence
High
```

Future versions may support:

```text
Metric lineage
     ↓
Source systems
     ↓
Transformation
     ↓
Aggregation
     ↓
Displayed value
```

This fits the broader Atlas Sanctum principle:

> **Intelligence should be inspectable.**

---

# 29. Empty States

Do not manufacture fake certainty when data is missing.

Instead:

```text
RETENTION DATA

Not enough cohort history yet.

Atlas Sanctum needs at least
3 completed customer cohorts
to display this analysis.
```

Good empty states preserve trust.

---

# 30. Loading States

Use skeletons that preserve layout geometry.

```text
┌────────────────────────┐
│ █████████              │
│ █████                  │
│                        │
│ ────────────────       │
└────────────────────────┘
```

Avoid blocking the entire dashboard because one analytical service is unavailable.

A missing panel should become:

```text
Retention intelligence temporarily unavailable.

Last successful update:
14:32 EAT
```

---

# 31. Error States

Errors should be specific.

Bad:

> Something went wrong.

Better:

> Acquisition channel data could not be synchronized.

```text
Retry
View last successful snapshot
```

The dashboard should degrade gracefully.

---

# 32. Frontend Technology Direction

Recommended stack:

```text
React
TypeScript
Next.js
Tailwind CSS
Recharts / Visx / ECharts
TanStack Query
Zod
Lucide
```

For highly custom data visualization, prefer **Visx or ECharts** over forcing every analytical problem through a generic chart library.

The architecture should remain framework-flexible.

---

# 33. MVP Priority

### Phase 1: North Star

Build:

* application shell
* Growth Radar
* CAC
* LTV
* Churn
* LTV:CAC
* date filters
* responsive layout
* loading / empty / error states

### Phase 2: Growth Intelligence

Add:

* acquisition channels
* customer segments
* funnel
* retention cohorts
* expansion revenue

### Phase 3: Institutional Intelligence

Add:

* strategic intelligence feed
* geography
* customer health
* engagement signals
* metric provenance

### Phase 4: Atlas Integration

Connect the dashboard to:

* Atlas AI
* Knowledge Graph
* Planetary Map
* RVE
* Verification infrastructure
* Digital Twins
* Command Center
* governance intelligence

---

# 34. Definition of Done

The dashboard is successful when an operator can answer these questions without leaving the interface:

### Growth

> Are we acquiring customers?

### Economics

> Are those customers economically valuable?

### Efficiency

> Is acquisition becoming more efficient?

### Retention

> Are customers staying?

### Engagement

> Are customers actually using the platform?

### Segmentation

> Which organizational groups behave differently?

### Expansion

> Are existing customers increasing their relationship with Atlas?

### Geography

> Where is the ecosystem forming?

### Intelligence

> What institutional events explain the numbers?

### Action

> Where should the team investigate next?

---

# 35. The Deeper Atlas Sanctum Model

The dashboard should ultimately become more than a marketing analytics screen.

It is the first observable layer of the **Atlas Sanctum growth ecosystem**.

```text
                    ATLAS SANCTUM
                          │
          ┌───────────────┼────────────────┐
          │               │                │
       CAPITAL         CUSTOMERS         IMPACT
          │               │                │
          │               ▼                │
          │          GROWTH RADAR          │
          │               │                │
          │       ┌───────┼───────┐        │
          │       │       │       │        │
          ▼       ▼       ▼       ▼        ▼
       Finance  CAC/LTV  Retention  RVE  Verification
                          │
                          ▼
                     NETWORK EFFECTS
                          │
                          ▼
                REGENERATIVE ECONOMY
```

The long-term objective is not simply to know how many customers Atlas Sanctum has.

It is to observe whether a **new economic network is forming around regenerative intelligence**.

That means the frontend eventually connects:

**customer growth → capital flows → verified outcomes → ecosystem activity → institutional adoption → network effects.**

---

# 36. Final North Star

The interface should leave the operator with a feeling of **orientation**.

Not:

> "Here are 47 charts."

But:

> **"Here is the state of the ecosystem."**

The dashboard is a radar.

CAC tells us the energy required to bring new participants into the system.

LTV tells us the value created through sustained relationships.

Churn tells us what is leaving.

Retention tells us what remains alive.

Expansion tells us what is deepening.

Channels tell us where growth enters.

Segments tell us who is participating.

Engagement tells us whether participation is real.

Strategic intelligence tells us what is happening beyond the numbers.

And the combined system answers the larger question:

> **Is Atlas Sanctum becoming a durable network, or merely a collection of transactions?**

That is the frontend north star.

**Build the interface so the answer can be seen before it has to be explained.**

---

## Repository Direction

```text
ATLAS SANCTUM
└── Customer & Marketing Intelligence
    ├── Growth Radar
    ├── Unit Economics
    ├── Acquisition
    ├── Segmentation
    ├── Retention
    ├── Customer Journey
    ├── Expansion
    ├── Geographic Intelligence
    └── Strategic Intelligence
```

> **Observe the system. Understand the pattern. Find the leverage.**
