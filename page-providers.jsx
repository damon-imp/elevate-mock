// page-providers.jsx — Providers + About

function ProvidersPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_PROVIDERS);
  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Providers" />
      <PageHero
        eyebrow="Providers"
        title="The team reading your panel."
        kicker="Triple-boarded, sub-specialty trained, with eleven years of average clinical experience. Every patient is seen by a provider — not a coordinator handing off to a coordinator."
      />

      {/* Provider grid */}
      <section style={{ padding: "80px 0 40px" }}>
        <div className="wrap">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {window.PROVIDERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <ProviderCard provider={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practice philosophy / about */}
      <section style={{ padding: "120px 0", background: "var(--bg-2)" }}>
        <div className="wrap">
          <SectionLabel no="02" label="Practice philosophy" />
          <div style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 80,
            alignItems: "start",
          }}>
            <Reveal>
              <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, maxWidth: 480 }}>
                Specialists, not <span style={{ color: "var(--blue)" }}>generalists</span> wearing a hormone hat.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { h: "Sub-specialty trained", p: "Every provider has additional training beyond their primary boards — anti-aging medicine, endocrinology, peptide therapeutics. Hormone medicine is its own discipline." },
                  { h: "Lab-led, not symptom-led", p: "We treat what the panel shows, calibrated against your reported symptoms. Not the other way around. That's how we avoid over- and under-prescribing." },
                  { h: "Long visits, real follow-up", p: "Sixty-minute intake. Forty-minute follow-ups. Direct provider access for the medication questions that come up between visits." },
                  { h: "Self-pay, transparent", p: "Flat pricing for consults, labs, and protocols. No surprise codes. Standard documentation for HSA/FSA submission." },
                ].map((row, i) => (
                  <div key={i} style={{
                    paddingBottom: 28,
                    borderBottom: i === 3 ? "none" : "1px solid var(--rule)",
                  }}>
                    <h3 style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 10 }}>{row.h}</h3>
                    <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 600 }}>{row.p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats / credentials strip */}
      <section style={{ padding: "100px 0", background: "var(--ink)", color: "#FFFFFF" }}>
        <div className="wrap">
          <SectionLabel no="03" label="By the numbers" light />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            borderBottom: "1px solid rgba(255,255,255,0.16)",
          }}>
            {[
              { k: "11", v: "Years average experience" },
              { k: "3", v: "Sub-specialty boards" },
              { k: "1,200+", v: "Active patients" },
              { k: "60min", v: "First-visit length" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80} style={{
                padding: "40px 28px",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.16)",
              }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 64, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--mint)", fontWeight: 600 }}>{s.k}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", marginTop: 14, maxWidth: 220 }}>{s.v}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <Footer />
      <StickyConsultPill />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function ProviderCard({ provider: p }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--rule)",
        borderRadius: 14,
        overflow: "hidden",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow)" : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <div className="img-frame" style={{ aspectRatio: "4 / 5" }}>
        <img src={p.image} alt={p.name} loading="lazy" style={{
          transition: "transform 600ms cubic-bezier(0.2, 0.7, 0, 1)",
          transform: hover ? "scale(1.03)" : "scale(1)",
        }}/>
      </div>
      <div style={{ padding: "26px 28px 28px" }}>
        <h3 style={{ fontSize: 22, lineHeight: 1.1, marginBottom: 6 }}>{p.name}</h3>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--blue)", marginBottom: 16, textTransform: "uppercase" }}>
          {p.role}
        </div>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 20 }}>{p.bio}</p>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          paddingTop: 16,
          borderTop: "1px solid var(--rule)",
        }}>
          {p.creds.map((c) => (
            <span key={c} style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              padding: "5px 9px",
              background: "var(--bg-2)",
              color: "var(--ink-soft)",
              borderRadius: 3,
              textTransform: "uppercase",
            }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

window.TWEAK_DEFAULTS_PROVIDERS = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<ProvidersPage />);
