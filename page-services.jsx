// page-services.jsx — Full services overview

const SERVICE_DETAILS = {
  womens: {
    overview: "Hormonal optimization for the full arc of a woman's adult life — from menstrual irregularity and PCOS through perimenopause and post-menopause.",
    panel: ["Estrogen (E1, E2, E3)", "Progesterone", "Total + Free Testosterone", "DHEA-S", "Cortisol", "Full Thyroid Panel", "Insulin / HbA1c", "Vitamin D, B12"],
    protocols: ["Bioidentical hormone replacement", "Compounded creams + troches", "Cycle-aware progesterone dosing", "Topical estradiol", "Low-dose testosterone for libido"],
  },
  mens: {
    overview: "Comprehensive testosterone optimization — not the bro-clinic 'TRT for everyone' approach. We test, we titrate, we re-test.",
    panel: ["Total + Free Testosterone", "Estradiol (sensitive)", "SHBG", "DHEA-S", "LH / FSH", "PSA", "Full Thyroid Panel", "CBC / CMP / Lipids"],
    protocols: ["TRT (Cypionate, Enanthate)", "Aromatase management", "HCG for fertility preservation", "Sleep + recovery support", "Peptide adjuncts"],
  },
  thyroid: {
    overview: "TSH alone misses two-thirds of meaningful thyroid dysfunction. We read the full panel and treat sub-clinical and autoimmune presentations.",
    panel: ["TSH", "Free T3", "Free T4", "Reverse T3", "TPO Antibodies", "Thyroglobulin Antibodies", "Iodine (urine)", "Selenium, Zinc"],
    protocols: ["Levothyroxine (T4)", "Liothyronine (T3)", "Natural Desiccated Thyroid", "Compounded T4/T3 combinations", "Hashimoto's protocols"],
  },
  peptides: {
    overview: "Peptide therapy uses short amino-acid chains to signal specific cellular pathways — repair, growth, metabolism, cognition. Highly targeted, well-tolerated.",
    panel: ["IGF-1", "Growth hormone (random)", "Inflammatory markers", "Mitochondrial markers", "Sleep architecture review", "Body composition (DEXA optional)"],
    protocols: ["Sermorelin / Ipamorelin / CJC-1295", "BPC-157 + TB-500", "NAD+ (IV / SubQ)", "IGF-1 LR3", "Methylene Blue", "Glutathione (push or drip)"],
  },
  weight: {
    overview: "Medical weight loss with GLP-1 and emerging GIP/glucagon receptor agonists — paired with the labs, nutrition guidance, and re-testing the medication alone can't replace.",
    panel: ["HbA1c + Fasting Insulin", "Lipid Panel", "Thyroid Panel", "Liver Enzymes", "Body composition baseline", "Hormonal axis screen"],
    protocols: ["Semaglutide", "Tirzepatide", "Retatrutide (emerging)", "Compounded options", "Maintenance + off-ramp planning", "Nutrition + activity programming"],
  },
};

function ServicesPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_SERVICES);
  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Services" />
      <PageHero
        eyebrow="Services"
        title="Five pillars, one panel, a protocol built for you."
        kicker="Every service runs the full comprehensive panel and gives you a one-on-one consultation with a provider. No insurance constraints, no fifteen-minute visits."
      />

      {/* Services overview grid */}
      <section style={{ padding: "80px 0 40px" }}>
        <div className="wrap">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}>
            {window.SERVICES.map((s, i) => {
              const span = i < 3 ? 2 : 3;
              return (
                <Reveal key={s.id} delay={i * 60} style={{ gridColumn: `span ${span}` }}>
                  <a href={`#${s.id}`} style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--bg)",
                    border: "1px solid var(--rule)",
                    borderRadius: 14,
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "var(--ink)",
                    transition: "all 200ms ease",
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--blue)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--rule)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="img-frame" style={{ aspectRatio: "16 / 10" }}>
                      <img src={s.image} alt={s.title} loading="lazy" />
                    </div>
                    <div style={{ padding: "20px 24px 22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span className="eyebrow" style={{ color: "var(--blue)" }}>{s.no}</span>
                        <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>{s.id}</span>
                      </div>
                      <h3 style={{ fontSize: 24, lineHeight: 1.1, marginBottom: 8 }}>{s.title}</h3>
                      <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{s.blurb}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Each service in detail */}
      {window.SERVICES.map((s, idx) => (
        <ServiceDetailBlock key={s.id} service={s} idx={idx} />
      ))}

      <CTABand />
      <Footer />
      <StickyConsultPill />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function ServiceDetailBlock({ service: s, idx }) {
  const d = SERVICE_DETAILS[s.id] || {};
  const isOdd = idx % 2 === 1;
  return (
    <section id={s.id} style={{
      padding: "100px 0",
      background: isOdd ? "var(--bg-2)" : "var(--bg)",
      borderTop: "1px solid var(--rule)",
      scrollMarginTop: 80,
    }}>
      <div className="wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: isOdd ? "0.95fr 1.05fr" : "1.05fr 0.95fr",
          gap: 64,
          alignItems: "center",
        }}>
          <Reveal style={{ order: isOdd ? 2 : 1 }}>
            <div className="img-frame" style={{
              aspectRatio: "4 / 3",
              borderRadius: 14,
              boxShadow: "var(--shadow)",
            }}>
              <img src={s.image} alt={s.title} loading="lazy" />
            </div>
          </Reveal>

          <Reveal delay={120} style={{ order: isOdd ? 1 : 2 }}>
            <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 18 }}>
              {s.no} — {s.id.toUpperCase()}
            </div>
            <h2 style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.05,
              marginBottom: 24,
            }}>{s.title}</h2>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 32, maxWidth: 560 }}>
              {d.overview || s.detail}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginBottom: 32 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>What we test</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {(d.panel || []).map((p) => (
                    <li key={p} style={{ fontSize: 13.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "var(--mint-2)", display: "inline-flex" }}><Tick /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Protocols</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {(d.protocols || []).map((p) => (
                    <li key={p} style={{ fontSize: 13.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "var(--blue)", display: "inline-flex" }}><Tick /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="Contact.html">Book consult for {s.title.toLowerCase()}</BtnPrimary>
              <BtnGhost href="Hormone Quiz.html">Take the quiz</BtnGhost>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.TWEAK_DEFAULTS_SERVICES = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<ServicesPage />);
