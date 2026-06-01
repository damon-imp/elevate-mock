// page-portal.jsx — Logged-in client portal dashboard

const PORTAL_USER = {
  first: "Sarah",
  last: "Mitchell",
  initial: "SM",
  since: "March 2024",
  plan: "Comprehensive Hormone Optimization",
};

const PORTAL_LABS = [
  { name: "Free T3", value: "3.4", unit: "pg/mL", range: "2.3 – 4.2", trend: [2.1, 2.4, 2.8, 3.1, 3.4], status: "optimal" },
  { name: "TSH",     value: "1.8", unit: "mIU/L", range: "0.5 – 4.5", trend: [3.2, 2.7, 2.3, 2.0, 1.8], status: "optimal" },
  { name: "Estradiol", value: "82", unit: "pg/mL", range: "30 – 400", trend: [21, 35, 56, 71, 82], status: "improving" },
  { name: "Vitamin D", value: "52", unit: "ng/mL", range: "30 – 100", trend: [22, 31, 38, 45, 52], status: "optimal" },
  { name: "Cortisol AM", value: "14.2", unit: "µg/dL", range: "6 – 18", trend: [22, 19, 17, 15, 14.2], status: "improving" },
  { name: "HbA1c", value: "5.2", unit: "%", range: "< 5.7", trend: [5.8, 5.6, 5.5, 5.3, 5.2], status: "optimal" },
];

const PORTAL_APPTS = [
  { date: "Jun 12", time: "10:00 AM", with: "Dr. Lena Reyes", type: "90-day follow-up", method: "Telehealth", confirmed: true },
  { date: "Aug 04", time: "11:30 AM", with: "Dr. Lena Reyes", type: "Lab review", method: "In-clinic", confirmed: false },
];

const PORTAL_MEDS = [
  { name: "Estradiol", dose: "0.05 mg patch", schedule: "Twice weekly", refills: 3, next: "Due in 14 days" },
  { name: "Progesterone (oral)", dose: "100 mg", schedule: "Nightly", refills: 2, next: "Due in 28 days" },
  { name: "Sermorelin", dose: "300 mcg", schedule: "5 days on, 2 off", refills: 5, next: "Due in 42 days" },
  { name: "Vitamin D3 + K2", dose: "5,000 IU", schedule: "Daily with food", refills: 6, next: "—" },
];

function PortalPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_PORTAL);
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [tab, setTab] = React.useState("dashboard");

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Client Portal" />

      <div style={{
        background: "var(--bg-2)",
        minHeight: "calc(100vh - 200px)",
      }}>
        <div className="wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
          {/* Header strip */}
          <PortalHeader />

          {/* Tab strip */}
          <div className="portal-tabs" style={{
            display: "flex",
            gap: 4,
            marginTop: 32,
            marginBottom: 32,
            borderBottom: "1px solid var(--rule)",
          }}>
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "labs",      label: "Labs & trends" },
              { id: "protocol",  label: "Protocol" },
              { id: "education", label: "Education" },
              { id: "pharmacy",  label: "Pharmacy" },
              { id: "messages",  label: "Messages" },
              { id: "billing",   label: "Payment" },
            ].map((tb) => {
              const on = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  style={{
                    appearance: "none",
                    background: "transparent",
                    border: "none",
                    padding: "12px 18px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: on ? "var(--blue)" : "var(--ink-soft)",
                    borderBottom: on ? "2px solid var(--blue)" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "color 180ms ease",
                    marginBottom: -1,
                    fontFamily: "var(--sans)",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--ink-soft)"; }}
                >
                  {tb.label}
                </button>
              );
            })}
          </div>

          {tab === "dashboard" && <DashboardView />}
          {tab === "labs"      && <LabsView />}
          {tab === "protocol"  && <ProtocolView />}
          {tab === "education" && <EducationView />}
          {tab === "pharmacy"  && <PharmacyView />}
          {tab === "messages"  && <MessagesView />}
          {tab === "billing"   && <BillingView />}
        </div>
      </div>

      <Footer />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function PortalHeader() {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--rule)",
      borderRadius: 14,
      padding: "28px 32px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 24,
      alignItems: "center",
    }} data-collapse="true">
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "var(--blue-tint)",
        color: "var(--blue)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--display)", fontSize: 24, fontWeight: 600,
      }}>{PORTAL_USER.initial}</div>
      <div>
        <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 6 }}>Welcome back</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>
          {PORTAL_USER.first} {PORTAL_USER.last}
        </div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 8, display: "flex", gap: 14, alignItems: "center" }}>
          <span>Patient since {PORTAL_USER.since}</span>
          <span style={{ width: 3, height: 3, background: "var(--ink-mute)", borderRadius: "50%" }}/>
          <span>{PORTAL_USER.plan}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <BtnGhost style={{ padding: "10px 16px", fontSize: 13 }}>Schedule visit</BtnGhost>
        <BtnPrimary style={{ padding: "10px 16px", fontSize: 13 }}>Message provider</BtnPrimary>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Next appointment */}
        <Card title="Upcoming">
          <div className="appt-row" style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 20,
            alignItems: "center",
            padding: "20px 24px",
            background: "var(--blue-tint)",
            border: "1px solid rgba(31,102,255,0.2)",
            borderRadius: 14,
          }}>
            <div style={{
              fontFamily: "var(--display)",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.04em",
              padding: "10px 16px",
              background: "var(--blue)",
              color: "#FFFFFF",
              borderRadius: 10,
              textAlign: "center",
              minWidth: 70,
            }}>
              <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: "0.1em", marginBottom: 2 }}>JUN</div>
              <div style={{ fontSize: 22, lineHeight: 1, fontWeight: 600 }}>12</div>
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 4 }}>{PORTAL_APPTS[0].type}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                {PORTAL_APPTS[0].time} · {PORTAL_APPTS[0].with} · {PORTAL_APPTS[0].method}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={subtleBtn}>Reschedule</button>
              <button style={primaryBtn}>Join call</button>
            </div>
          </div>
        </Card>

        {/* Labs snapshot */}
        <Card title="Recent labs" action="View all →" onActionClick={() => {}}>
          <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {PORTAL_LABS.slice(0, 6).map((lab) => (
              <LabCard key={lab.name} lab={lab} />
            ))}
          </div>
        </Card>

        {/* Active medications */}
        <Card title="Active protocol" action="Full protocol →">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PORTAL_MEDS.map((m, i) => (
              <div key={m.name} style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr auto",
                gap: 20,
                padding: "16px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                alignItems: "center",
                fontSize: 14,
              }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{m.name}</div>
                  <div style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>{m.dose}</div>
                </div>
                <div style={{ color: "var(--ink-soft)" }}>{m.schedule}</div>
                <div style={{ color: "var(--ink-soft)", fontSize: 12.5 }}>
                  <span style={{ color: "var(--mint-2)" }}>{m.refills}</span> refills · {m.next}
                </div>
                <button style={subtleBtn}>Refill</button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Symptom check-in */}
        <Card title="This week's check-in">
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 10 }}>
              How is your energy today?
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <button key={n} style={{
                  appearance: "none",
                  flex: 1,
                  padding: "10px 0",
                  background: n <= 7 ? "var(--blue-tint)" : "var(--bg-2)",
                  border: "1px solid var(--rule)",
                  fontSize: 13,
                  fontFamily: "var(--mono)",
                  color: n === 7 ? "#FFFFFF" : "var(--ink)",
                  cursor: "pointer",
                  borderRadius: 10,
                  ...(n === 7 ? { background: "var(--blue)", borderColor: "var(--blue)" } : {}),
                }}>{n}</button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-mute)", marginTop: 6, fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <span>Low</span><span>High</span>
            </div>
          </div>
          <div style={{ height: 1, background: "var(--rule)", margin: "16px 0" }}/>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>4 more this week</span>
            <button style={subtleBtn}>Next →</button>
          </div>
        </Card>

        {/* Messages preview */}
        <Card title="Messages" action="3 unread →">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { from: "Dr. Lena Reyes", time: "2h ago", subject: "Your latest labs look great — let's discuss adjusting your dose", unread: true },
              { from: "Marcus Heller, NP", time: "Yesterday", subject: "Re: Sermorelin timing question", unread: true },
              { from: "Patient Coordinator", time: "Mon", subject: "Lab kit shipped — tracking attached", unread: false },
            ].map((m, i) => (
              <div key={i} style={{
                padding: "14px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                position: "relative",
                paddingLeft: m.unread ? 14 : 0,
                transition: "padding 200ms ease",
              }}>
                {m.unread && (
                  <span style={{
                    position: "absolute", left: 0, top: 22,
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--blue)",
                  }}/>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontWeight: m.unread ? 500 : 400, fontSize: 13.5 }}>{m.from}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{m.time}</div>
                </div>
                <div style={{ fontSize: 13, color: m.unread ? "var(--ink)" : "var(--ink-soft)" }}>{m.subject}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <Card title="Quick actions">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { label: "Order labs", icon: "🧪" },
              { label: "Refill Rx", icon: "💊" },
              { label: "Update protocol", icon: "📋" },
              { label: "Book visit", icon: "📅" },
            ].map((a) => (
              <button key={a.label} style={{
                appearance: "none",
                background: "var(--bg-2)",
                border: "1px solid var(--rule)",
                borderRadius: 10,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--sans)",
                color: "var(--ink)",
                transition: "all 180ms ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.background = "var(--bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "var(--bg-2)"; }}
              >
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function LabsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
      <Card title="All labs" action="Download PDF →">
        <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {PORTAL_LABS.map((lab) => <LabCard key={lab.name} lab={lab} large />)}
        </div>
      </Card>
    </div>
  );
}

function ProtocolView() {
  return (
    <Card title="Comprehensive Hormone Optimization Protocol">
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {PORTAL_MEDS.map((m, i) => (
          <div key={m.name} style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr auto",
            gap: 24,
            padding: "20px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--rule)",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 16 }}>{m.name}</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2 }}>{m.dose}</div>
            </div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{m.schedule}</div>
            <div style={{ fontSize: 13.5, color: "var(--mint-2)" }}>{m.refills} refills</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{m.next}</div>
            <button style={primaryBtn}>Refill</button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MessagesView() {
  return (
    <Card title="Messages">
      <div style={{ padding: 24, textAlign: "center", color: "var(--ink-soft)" }}>
        Full inbox view (placeholder)
      </div>
    </Card>
  );
}

function BillingView() {
  return (
    <Card title="Payment method">
      <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 24, maxWidth: 560 }}>
        Your card on file is used for your subscription and any approved orders. Update it anytime — no spend history is stored here.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 20,
        alignItems: "center",
        padding: "22px 24px",
        background: "var(--bg-2)",
        border: "1px solid var(--rule)",
        borderRadius: 14,
        maxWidth: 560,
      }}>
        <div style={{
          width: 52, height: 34, borderRadius: 5,
          background: "linear-gradient(135deg, var(--blue), var(--blue-3))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#FFFFFF", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em",
        }}>VISA</div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 15, fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>•••• •••• •••• 4242</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>Expires 08 / 28</div>
        </div>
        <button style={primaryBtn}>Update card</button>
      </div>
    </Card>
  );
}

function EducationView() {
  const GUIDES = [
    { cat: "Getting started", title: "What to expect in your first 30 days", type: "Guide", min: "5 min read" },
    { cat: "Estrogen", title: "Estradiol patch — how to apply and rotate sites", type: "Video", min: "3 min" },
    { cat: "Progesterone", title: "Oral progesterone — timing, sleep, and what's normal", type: "Guide", min: "4 min read" },
    { cat: "Testosterone", title: "Subcutaneous injection — full how-to walkthrough", type: "Video", min: "6 min" },
    { cat: "Peptides", title: "Reconstituting and dosing your peptides safely", type: "Video", min: "7 min" },
    { cat: "Weight loss", title: "GLP-1 titration — managing the first weeks", type: "Guide", min: "5 min read" },
    { cat: "Labs", title: "How to read your panel (and what we watch)", type: "Guide", min: "8 min read" },
    { cat: "Storage", title: "Storing and traveling with your medications", type: "Guide", min: "3 min read" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Your education hub">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 4, maxWidth: 620 }}>
          Every guide and how-to video for your protocol lives here — no more digging through email. Watch how to give an injection, learn what each medication does, and know exactly what to expect at every step.
        </p>
      </Card>
      <Card title="Guides & videos">
        <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {GUIDES.map((g, i) => {
            const isVideo = g.type === "Video";
            return (
              <button key={i} style={{
                appearance: "none",
                textAlign: "left",
                background: "var(--bg-2)",
                border: "1px solid var(--rule)",
                borderRadius: 14,
                padding: 18,
                cursor: "pointer",
                fontFamily: "var(--sans)",
                color: "var(--ink)",
                display: "flex",
                gap: 16,
                alignItems: "center",
                transition: "border-color 180ms ease, background 180ms ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.background = "var(--bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "var(--bg-2)"; }}
              >
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  borderRadius: 8,
                  background: isVideo ? "var(--blue-tint)" : "var(--mint-tint)",
                  color: isVideo ? "var(--blue)" : "var(--mint-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>{isVideo ? "▶" : "📄"}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="eyebrow" style={{ marginBottom: 5, color: "var(--blue)" }}>{g.cat}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 5 }}>{g.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-mute)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>{g.type} · {g.min}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function PharmacyView() {
  const [requested, setRequested] = React.useState({});
  const CATALOG = window.PEPTIDES || [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card title="Pharmacy & peptide menu">
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 620 }}>
          Browse what we offer, read what each one does, and request anything you're curious about. Tap "Request" and our team will review it with you — no phone call required, and nothing is ordered until your provider approves it.
        </p>
      </Card>

      {/* Fullscript supplement dispensary — API integration, wire later */}
      <Card title="Supplements — powered by Fullscript" action="Open dispensary →">
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 20,
          alignItems: "center",
          padding: "20px 24px",
          background: "var(--bg-2)",
          border: "1px solid var(--rule)",
          borderRadius: 14,
        }}>
          <div style={{
            width: 48, height: 48, flexShrink: 0,
            borderRadius: 10,
            background: "var(--mint-tint)",
            color: "var(--mint-2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>℞</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 500, marginBottom: 4 }}>
              Your provider-built supplement protocol
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Order practitioner-grade supplements at your patient pricing, shipped to your door. Your recommendations sync straight from your protocol.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--ink-mute)", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}>
          Fullscript API integration — connects to live dispensary
        </div>
      </Card>

      {/* Peptide / therapy catalogue */}
      <Card title="Peptide & therapy catalogue">
        <div className="pharm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {CATALOG.map((p, i) => {
            const on = requested[p.name];
            return (
              <div key={i} style={{
                background: "var(--bg-2)",
                border: "1px solid var(--rule)",
                borderRadius: 14,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, flex: 1 }}>{p.use}</div>
                <button
                  onClick={() => setRequested({ ...requested, [p.name]: !on })}
                  style={{
                    appearance: "none",
                    alignSelf: "flex-start",
                    marginTop: 4,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "var(--sans)",
                    cursor: "pointer",
                    borderRadius: 10,
                    border: on ? "1px solid var(--mint-2)" : "1px solid var(--blue)",
                    background: on ? "var(--mint-tint)" : "var(--blue)",
                    color: on ? "var(--mint-2)" : "#FFFFFF",
                    transition: "all 160ms ease",
                  }}
                >
                  {on ? "✓ Request sent" : "Request info"}
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18, fontSize: 12.5, color: "var(--ink-mute)", lineHeight: 1.55 }}>
          Requests go to your care team as a message. A provider reviews every request before anything is prescribed or ordered.
        </div>
      </Card>
    </div>
  );
}

function Card({ title, children, action, onActionClick }) {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--rule)",
      borderRadius: 14,
      padding: 28,
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 17, lineHeight: 1.1, fontWeight: 600 }}>{title}</h3>
        {action && (
          <button onClick={onActionClick} style={{
            appearance: "none",
            background: "transparent",
            border: "none",
            color: "var(--blue)",
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--sans)",
          }}>{action}</button>
        )}
      </div>
      {children}
    </div>
  );
}

function LabCard({ lab, large }) {
  const isOptimal = lab.status === "optimal";
  const color = isOptimal ? "var(--mint-2)" : "var(--blue)";
  return (
    <div style={{
      padding: 16,
      background: "var(--bg-2)",
      border: "1px solid var(--rule)",
      borderRadius: 14,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minHeight: large ? 180 : 140,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{lab.name}</span>
        <span style={{
          fontSize: 10,
          fontFamily: "var(--mono)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color,
        }}>● {lab.status}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>{lab.value}</span>
        <span style={{ fontSize: 11, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{lab.unit}</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>Range: {lab.range}</div>
      {/* Sparkline */}
      <Sparkline data={lab.trend} color={color} />
    </div>
  );
}

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 200, h = 30;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 30, marginTop: 4 }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={w} cy={h - ((data[data.length - 1] - min) / (max - min || 1)) * h} r="2.5" fill={color} />
    </svg>
  );
}

const subtleBtn = {
  appearance: "none",
  background: "var(--bg)",
  border: "1px solid var(--rule)",
  padding: "7px 14px",
  fontSize: 12.5,
  fontFamily: "var(--sans)",
  color: "var(--ink)",
  cursor: "pointer",
  borderRadius: 10,
};

const primaryBtn = {
  appearance: "none",
  background: "var(--blue)",
  border: "1px solid var(--blue)",
  padding: "7px 14px",
  fontSize: 12.5,
  fontFamily: "var(--sans)",
  color: "#FFFFFF",
  cursor: "pointer",
  borderRadius: 10,
};

window.TWEAK_DEFAULTS_PORTAL = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<PortalPage />);
