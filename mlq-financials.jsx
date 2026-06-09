// mlq-financials.jsx — Admin > Financials dashboard (Emily-only view)
// Aggregate financial data only. No per-patient line items (HIPAA-safe).
// Auto-pulls from Stripe + Fullscript (live) + cost/margin model (periodic).
// Mirrors elevate_master_financials.xlsx + elevate_weekly_tracker.xlsx.

// ── Real aggregate data (from master financials + weekly tracker) ──
const FIN = {
  revenueMo: 133927,
  runRate: 1607124,
  grossProfit: 42255,
  grossMargin: 0.316,
  ebitda: 36556,
  ebitdaMargin: 0.273,
  mrr: 68257,
  alaCarte: 62000,
  activeSubs: 411,
  arpu: 166,
  churn: 0.0486,
  fullscript: 3670,
  founderHrs: 11,
  cogsTotal: 91672,
  clinicalLabor: 21900,
  opexSoftware: 595,
  opexOverhead: 5104,
};

// MRR trend — last 6 months (from baselines + tracker)
const FIN_MRR_TREND = [
  { m: "Jan", v: 48954 },
  { m: "Feb", v: 53200 },
  { m: "Mar", v: 58100 },
  { m: "Apr", v: 62400 },
  { m: "May", v: 68169 },
  { m: "Jun", v: 68257 },
];

// Revenue split
const FIN_SPLIT = [
  { label: "Recurring subscriptions", v: 68257, color: "var(--blue)" },
  { label: "A la carte (peptides/GLP-1)", v: 62000, color: "var(--blue-3)" },
  { label: "Fullscript (net)", v: 3670, color: "var(--mint)" },
];

// Plan margins (from Membership Plans tab)
const FIN_PLANS = [
  { name: "Men's Testosterone", price: 169, margin: 0.484 },
  { name: "Progesterone + Thyroid", price: 139, margin: 0.461 },
  { name: "BHRT / TRT (blended)", price: 200, margin: 0.460 },
  { name: "Women's Test + Prog + Thyroid", price: 179, margin: 0.391 },
  { name: "Women's full (Test+Est+Prog+Thy)", price: 225, margin: 0.360 },
  { name: "Thyroid only", price: 69, margin: 0.231 },
];

// OPEX breakdown (monthly, from OPEX tab)
const FIN_OPEX = [
  { label: "Content / marketing agency", v: 3000 },
  { label: "Continuing ed / travel", v: 833 },
  { label: "Malpractice insurance", v: 679 },
  { label: "Accounting / CPA", v: 300 },
  { label: "Legal", v: 292 },
  { label: "OptiMantra (EHR)", v: 210 },
  { label: "Website / hosting", v: 99 },
  { label: "Freed.ai", v: 99 },
  { label: "GoHighLevel", v: 97 },
  { label: "Calendly", v: 45 },
  { label: "JotForm", v: 45 },
];

const fmtK = (n) => "$" + (n / 1000).toFixed(n >= 100000 ? 0 : 1) + "K";
const fmtUSD = (n) => "$" + Math.round(n).toLocaleString();
const fmtPct = (n) => (n * 100).toFixed(1) + "%";

// ── Mini line chart (MRR trend) ──
function FinTrend({ data }) {
  const W = 520, H = 140, pad = { l: 44, r: 14, t: 14, b: 22 };
  const vals = data.map(d => d.v);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const span = (hi - lo) || 1; lo -= span * 0.3; hi += span * 0.15;
  const x = i => pad.l + (i / Math.max(1, data.length - 1)) * (W - pad.l - pad.r);
  const y = v => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const line = data.map((p, k) => `${k === 0 ? "M" : "L"}${x(k).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1).toFixed(1)},${(H - pad.b).toFixed(1)} L${x(0).toFixed(1)},${(H - pad.b).toFixed(1)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <path d={area} fill="var(--blue-tint)" opacity="0.6" />
      <path d={line} fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((p, k) => (
        <circle key={k} cx={x(k)} cy={y(p.v)} r="3.5" fill="var(--blue)" stroke="#fff" strokeWidth="1.5" />
      ))}
      {data.map((p, k) => (
        <text key={k} x={x(k)} y={H - 6} fontSize="9" fill="var(--ink-mute)" textAnchor="middle" fontFamily="var(--mono)">{p.m}</text>
      ))}
      <text x={pad.l - 8} y={y(hi - span * 0.15) + 3} fontSize="8.5" fill="var(--ink-mute)" textAnchor="end" fontFamily="var(--mono)">{fmtK(Math.max(...vals))}</text>
    </svg>
  );
}

function MLQFinancials() {
  const opexTotal = FIN.opexSoftware + FIN.opexOverhead;
  const maxOpex = Math.max(...FIN_OPEX.map(o => o.v));
  const splitTotal = FIN_SPLIT.reduce((s, x) => s + x.v, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Sync status strip */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "11px 16px", background: "var(--bg-2)", borderRadius: 12, flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 7, height: 7, borderRadius: 980, background: "var(--mint)", display: "inline-block" }} />
          <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
            Auto-synced from Stripe + Fullscript · cost model last updated Jun 8
          </span>
        </div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--blue)", background: "var(--blue-tint)", padding: "3px 10px", borderRadius: 6 }}>Owner view only</span>
          <button style={{ ...MLQ_ghostBtn, padding: "6px 13px", fontSize: 12.5 }}>Export</button>
        </div>
      </div>

      {/* Headline KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="lab-grid">
        {[
          { n: fmtK(FIN.revenueMo), l: "Revenue / mo", sub: fmtUSD(FIN.runRate) + " run-rate" },
          { n: fmtPct(FIN.grossMargin), l: "Gross margin", sub: fmtK(FIN.grossProfit) + " gross profit" },
          { n: fmtK(FIN.ebitda), l: "Profit / mo (pre-pay)", sub: fmtPct(FIN.ebitdaMargin) + " margin", c: "var(--mint-2)" },
          { n: FIN.founderHrs + " hrs", l: "Founder hours / wk", sub: "the bottleneck metric", c: FIN.founderHrs > 8 ? "var(--amber,#B7791F)" : "var(--mint-2)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", borderRadius: 14 }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: s.c || "var(--ink)", fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>{s.l}</div>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-col: MRR trend + revenue split */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }} className="lab-grid">
        <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: 18, background: "var(--bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Recurring revenue (MRR)</div>
            <div style={{ fontSize: 12, color: "var(--mint-2)", fontWeight: 600 }}>+39% / 6 mo</div>
          </div>
          <FinTrend data={FIN_MRR_TREND} />
        </div>
        <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: 18, background: "var(--bg)" }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 14 }}>Revenue mix</div>
          {FIN_SPLIT.map((s, i) => {
            const pct = s.v / splitTotal;
            return (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                  <span style={{ color: "var(--ink-soft)" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--ink)", fontWeight: 600 }}>{fmtK(s.v)}</span>
                </div>
                <div style={{ height: 7, background: "var(--bg-3)", borderRadius: 980, overflow: "hidden" }}>
                  <div style={{ width: (pct * 100) + "%", height: "100%", background: s.color, borderRadius: 980 }} />
                </div>
              </div>
            );
          })}
          <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 10, lineHeight: 1.5 }}>
            A la carte is ~half the business. Converting repeat peptide buyers to recurring lifts margin and value.
          </div>
        </div>
      </div>

      {/* Plan margins */}
      <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: 18, background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Margin by plan</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-mute)" }}>price · gross margin %</div>
        </div>
        {FIN_PLANS.map((p, i) => {
          const low = p.margin < 0.35;
          const col = low ? "var(--amber,#B7791F)" : "var(--blue)";
          return (
            <div key={i} style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  {p.name}
                  <span style={{ color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 11.5, marginLeft: 8 }}>${p.price}/mo</span>
                </span>
                <span style={{ fontFamily: "var(--mono)", color: col, fontWeight: 700 }}>{fmtPct(p.margin)}</span>
              </div>
              <div style={{ height: 8, background: "var(--bg-3)", borderRadius: 980, overflow: "hidden" }}>
                <div style={{ width: (p.margin * 100) + "%", height: "100%", background: col, borderRadius: 980 }} />
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 12, lineHeight: 1.5, paddingTop: 12, borderTop: "1px solid var(--rule)" }}>
          <span style={{ color: "var(--amber,#B7791F)", fontWeight: 600 }}>Thyroid-only runs 23%</span> — provider labor eats it. Reprice or make it an add-on, not a standalone plan.
        </div>
      </div>

      {/* Cost structure + OPEX */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="lab-grid">
        {/* Cost waterfall (simple) */}
        <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: 18, background: "var(--bg)" }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 14 }}>Where the money goes</div>
          {[
            { l: "Revenue", v: FIN.revenueMo, c: "var(--ink)", bold: true },
            { l: "− Product COGS", v: -(FIN.cogsTotal - FIN.clinicalLabor), c: "var(--ink-soft)" },
            { l: "− Clinical labor", v: -FIN.clinicalLabor, c: "var(--ink-soft)" },
            { l: "= Gross profit", v: FIN.grossProfit, c: "var(--blue)", bold: true },
            { l: "− Operating costs", v: -(FIN.opexSoftware + FIN.opexOverhead), c: "var(--ink-soft)" },
            { l: "= Profit before pay", v: FIN.ebitda, c: "var(--mint-2)", bold: true },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "9px 0",
              borderTop: i === 0 ? "none" : "1px solid var(--rule-soft)",
              fontSize: 13.5,
            }}>
              <span style={{ color: row.c, fontWeight: row.bold ? 600 : 400 }}>{row.l}</span>
              <span style={{ fontFamily: "var(--mono)", color: row.c, fontWeight: row.bold ? 700 : 500 }}>{fmtUSD(row.v)}</span>
            </div>
          ))}
        </div>
        {/* OPEX breakdown */}
        <div style={{ border: "1px solid var(--rule)", borderRadius: 14, padding: 18, background: "var(--bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>Operating costs</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{fmtUSD(opexTotal)}/mo</div>
          </div>
          {FIN_OPEX.slice(0, 7).map((o, i) => (
            <div key={i} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 3 }}>
                <span style={{ color: "var(--ink-soft)" }}>{o.label}</span>
                <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>{fmtUSD(o.v)}</span>
              </div>
              <div style={{ height: 5, background: "var(--bg-3)", borderRadius: 980, overflow: "hidden" }}>
                <div style={{ width: (o.v / maxOpex * 100) + "%", height: "100%", background: "var(--blue-3)", borderRadius: 980 }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: "var(--ink-mute)", marginTop: 8 }}>+ {FIN_OPEX.length - 7} smaller line items</div>
        </div>
      </div>

      {/* Secondary stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="lab-grid">
        {[
          { n: FIN.activeSubs, l: "Active subscribers" },
          { n: "$" + FIN.arpu, l: "ARPU / mo" },
          { n: fmtPct(FIN.churn), l: "Monthly churn", c: "var(--amber,#B7791F)" },
          { n: fmtK(FIN.fullscript), l: "Fullscript net / mo", c: "var(--mint-2)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 14, background: "var(--bg-2)", borderRadius: 12 }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: s.c || "var(--ink)", fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, color: "var(--ink-mute)", textAlign: "center", lineHeight: 1.5 }}>
        Aggregate financials only · no patient-identifiable data · refreshed on schedule
      </div>
    </div>
  );
}
