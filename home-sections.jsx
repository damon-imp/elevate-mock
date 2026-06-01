// home-sections.jsx — Hero, Stats, Services (card grid w/ symptom filter), Approach, Peptides, Testimonials

function Hero() {
  return (
    <section style={{ position: "relative", padding: "64px 0 80px", overflow: "hidden" }}>
      {/* Soft ambient blob */}
      <div style={{
        position: "absolute",
        right: "-20%", top: "-10%",
        width: 800, height: 800,
        display: "none",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 28,
        }}>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>Hormone &amp; longevity medicine</span>
          <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>Est. — Brevard County, FL</span>
        </Reveal>

        <div data-collapse="true" style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 56,
          alignItems: "center",
        }}>
          <div>
            <Reveal>
              <h1 style={{
                fontSize: "clamp(40px, 5.4vw, 76px)",
                lineHeight: 1.02,
                marginBottom: 28,
                maxWidth: 720,
              }}>
                Tired, foggy, and gaining weight you can't explain? <span style={{ color: "var(--blue)" }}>Get answers</span>.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p style={{
                fontSize: 18,
                lineHeight: 1.55,
                maxWidth: 540,
                color: "var(--ink-soft)",
                marginBottom: 36,
              }}>
                Whether you just want to feel like yourself again or you're ready to optimize and crush it past 40, Elevate finds the hormonal root cause and builds a protocol around your labs. Hormones, peptides, and medical weight loss. Self-pay, no insurance gymnastics.
              </p>
            </Reveal>
            <Reveal delay={200} style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <BtnPrimary href="Hormone Quiz.html">Take the 2-minute quiz</BtnPrimary>
              <BtnGhost href="Contact.html">Book a consult</BtnGhost>
            </Reveal>

            {/* Inline trust strip */}
            <Reveal delay={280}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                borderTop: "1px solid var(--rule)",
                paddingTop: 24,
              }}>
                {[
                  { k: "1,200+", v: "Patients in care" },
                  { k: "48hr",   v: "Median to first visit" },
                  { k: "$0",     v: "First consult" },
                ].map((s, i) => (
                  <div key={i} style={{
                    paddingRight: 16,
                    borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                    paddingLeft: i === 0 ? 0 : 24,
                  }}>
                    <div style={{
                      fontFamily: "var(--display)",
                      fontWeight: 600,
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                    }}>{s.k}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div style={{ position: "relative" }}>
              <div className="img-frame" style={{
                aspectRatio: "4 / 5",
                width: "100%",
                borderRadius: 10,
                boxShadow: "var(--shadow)",
              }}>
                <img src={window.IMG.hero} alt="Patient outdoors" loading="eager" />
              </div>

              {/* Floating metric card */}
              <div style={{
                position: "absolute",
                bottom: -20,
                left: -28,
                background: "var(--bg)",
                border: "1px solid var(--rule)",
                padding: "18px 22px",
                width: 250,
                boxShadow: "var(--shadow)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderRadius: 10,
              }}>
                <div className="eyebrow" style={{ color: "var(--mint-2)" }}>↑ 90-day outcome</div>
                <div style={{
                  fontFamily: "var(--display)",
                  fontWeight: 600,
                  fontSize: 38,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}>
                  +38<span style={{ fontSize: 20 }}>%</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                  Reported energy &amp; sleep quality on protocol.
                </div>
              </div>

              {/* Pill stamp */}
              <div style={{
                position: "absolute",
                top: 20, right: 20,
                background: "var(--mint)",
                color: "var(--ink)",
                padding: "6px 12px",
                borderRadius: 999,
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink)" }}/>
                Accepting patients
              </div>
            </div>
          </Reveal>
        </div>

        {/* Treatment marquee */}
        <div style={{
          marginTop: 80,
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          padding: "14px 0",
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}>
          <div style={{
            display: "flex",
            gap: 56,
            animation: "marq 40s linear infinite",
            whiteSpace: "nowrap",
            fontFamily: "var(--sans)",
            fontSize: 14,
            letterSpacing: "0",
            color: "var(--ink-soft)",
            fontWeight: 500,
          }}>
            {Array.from({ length: 3 }).map((_, k) => (
              <React.Fragment key={k}>
                <span><span style={{ color: "var(--mint-2)" }}>—</span>&nbsp; Bioidentical Hormones</span>
                <span><span style={{ color: "var(--blue)" }}>—</span>&nbsp; Sermorelin · BPC-157 · NAD+</span>
                <span><span style={{ color: "var(--mint-2)" }}>—</span>&nbsp; Semaglutide / Tirzepatide</span>
                <span><span style={{ color: "var(--blue)" }}>—</span>&nbsp; Full Thyroid Panel</span>
                <span><span style={{ color: "var(--mint-2)" }}>—</span>&nbsp; Methylene Blue</span>
                <span><span style={{ color: "var(--blue)" }}>—</span>&nbsp; IGF-1 LR3 · Glutathione</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// Services as a card grid w/ symptom filter chips

function ServicesGrid() {
  const [picked, setPicked] = React.useState([]);
  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // Compute which services are relevant (highlighted)
  const relevantIds = React.useMemo(() => {
    if (picked.length === 0) return new Set();
    const set = new Set();
    picked.forEach((sid) => {
      const sym = window.SYMPTOMS.find((s) => s.id === sid);
      sym?.maps.forEach((id) => set.add(id));
    });
    return set;
  }, [picked]);

  return (
    <section id="services" style={{ padding: "120px 0 60px" }}>
      <div className="wrap">
        <SectionLabel no="01" label="Services" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 64,
          alignItems: "end",
          marginBottom: 56,
        }}>
          <Reveal>
            <h2 style={{
              fontSize: "var(--h1)",
              lineHeight: 1.03,
              maxWidth: 780,
            }}>
              Five focused pillars. <span style={{ color: "var(--blue)" }}>One body</span>, addressed in concert.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: 16.5, color: "var(--ink-soft)", maxWidth: 480 }}>
              Each service runs the full panel. We treat what the labs show — not a checkbox of symptoms.
            </p>
          </Reveal>
        </div>

        {/* Symptom filter (the "where to start" interaction, integrated) */}
        <Reveal>
          <div style={{
            padding: "20px 24px",
            background: "var(--bg-2)",
            border: "1px solid var(--rule)",
            borderRadius: 14,
            marginBottom: 28,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Filter ↓</span>
            <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>What have you been feeling?</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {window.SYMPTOMS.map((s) => {
                const on = picked.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    style={{
                      appearance: "none",
                      fontFamily: "var(--sans)",
                      fontSize: 12.5,
                      padding: "6px 12px",
                      border: `1px solid ${on ? "var(--blue)" : "var(--rule)"}`,
                      background: on ? "var(--blue)" : "var(--bg)",
                      color: on ? "#FFFFFF" : "var(--ink)",
                      cursor: "pointer",
                      borderRadius: 999,
                      transition: "all 160ms ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {on && <Tick />}
                    {s.label}
                  </button>
                );
              })}
              {picked.length > 0 && (
                <button onClick={() => setPicked([])} style={{
                  appearance: "none",
                  background: "transparent",
                  border: "none",
                  color: "var(--ink-mute)",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.05em",
                  padding: "6px 8px",
                }}>
                  ↺ clear
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 16,
        }}>
          {window.SERVICES.map((s, i) => {
            // First card spans 2 cols, rest span 2 cols ... no wait, we have 5 — use grid template 6col, cards span 2 each (3 per row), last centered. Or do 3-2 split.
            // Let's do row 1: 2-2-2 (first three services), row 2: 3-3 (last two)
            const span = i < 3 ? 2 : 3;
            const dimmed = picked.length > 0 && !relevantIds.has(s.id);
            const isRecommended = relevantIds.has(s.id);
            return (
              <Reveal key={s.id} delay={i * 70} style={{ gridColumn: `span ${span}` }}>
                <ServiceCard service={s} dimmed={dimmed} recommended={isRecommended} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s, dimmed, recommended }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={s.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        border: `1px solid ${recommended ? "var(--blue)" : "var(--rule)"}`,
        borderRadius: 14,
        overflow: "hidden",
        opacity: dimmed ? 0.4 : 1,
        transition: "opacity 200ms ease, transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow)" : "0 0 0 rgba(0,0,0,0)",
        position: "relative",
        textDecoration: "none",
        color: "var(--ink)",
      }}
    >
      {recommended && (
        <div style={{
          position: "absolute",
          top: 14, right: 14,
          background: "var(--blue)",
          color: "#FFFFFF",
          padding: "4px 10px",
          borderRadius: 999,
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 600,
          zIndex: 2,
        }}>
          ✓ Recommended
        </div>
      )}
      <div className="img-frame" style={{ aspectRatio: "16 / 10", width: "100%" }}>
        <img src={s.image} alt={s.title} loading="lazy" style={{
          transition: "transform 600ms cubic-bezier(0.2, 0.7, 0, 1)",
          transform: hover ? "scale(1.04)" : "scale(1)",
        }}/>
      </div>
      <div style={{ padding: "24px 26px 26px", flexGrow: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>{s.no}</span>
          <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>{s.id}</span>
        </div>
        <h3 style={{
          fontSize: 26,
          lineHeight: 1.1,
          marginTop: 4,
        }}>{s.title}</h3>
        <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5, flexGrow: 1 }}>{s.blurb}</p>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingTop: 16,
          borderTop: "1px solid var(--rule)",
          marginTop: 8,
          fontSize: 13,
          fontWeight: 500,
          color: hover ? "var(--blue)" : "var(--ink)",
          transition: "color 200ms ease",
        }}>
          <span>Learn about {s.title.toLowerCase()}</span>
          <span style={{ transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform 200ms ease", display: "inline-flex" }}>
            <Arrow size={14} />
          </span>
        </div>
      </div>
    </a>
  );
}

// ────────────────────────────────────────────────────────
// Approach

function Approach() {
  return (
    <section style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionLabel no="02" label="Our approach" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 80,
          alignItems: "start",
          marginBottom: 80,
        }}>
          <div style={{ position: "sticky", top: 100 }}>
            <Reveal>
              <h2 style={{
                fontSize: "var(--h1)",
                lineHeight: 1.03,
                marginBottom: 28,
                maxWidth: 540,
              }}>
                The opposite of the <span style={{ color: "var(--blue)" }}>fifteen-minute</span> visit.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 460, marginBottom: 28 }}>
                We're self-pay by design. That buys us time — to read your full panel, to write a real protocol, and to recalibrate as your body responds.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="img-frame" style={{
                aspectRatio: "5 / 4",
                width: "100%",
                borderRadius: 10,
              }}>
                <img src={window.IMG.consult} alt="Provider consultation" loading="lazy" />
              </div>
            </Reveal>
          </div>

          <div>
            {window.PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: 32,
                  padding: "32px 0",
                  borderTop: "1px solid var(--rule)",
                  borderBottom: i === window.PROCESS.length - 1 ? "1px solid var(--rule)" : "none",
                  alignItems: "start",
                }}>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: "var(--blue)",
                    paddingTop: 6,
                  }}>{p.n}</div>
                  <div>
                    <h3 style={{ fontSize: 28, lineHeight: 1.05, marginBottom: 12 }}>{p.t}</h3>
                    <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 540, lineHeight: 1.55 }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Self-pay manifesto */}
        <Reveal>
          <div style={{
            border: "1px solid var(--rule)",
            background: "var(--bg)",
            borderRadius: 14,
            padding: "44px 56px",
            display: "grid",
            gridTemplateColumns: "1fr 1.8fr",
            gap: 56,
            alignItems: "center",
          }} data-collapse="true">
            <div>
              <div className="eyebrow" style={{ color: "var(--mint-2)", marginBottom: 14 }}>A note on insurance</div>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 600,
                fontSize: 30,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>Self-pay, by choice.</div>
            </div>
            <div>
              <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.65 }}>
                Our clinic operates as a self-pay practice. We do not participate with insurance companies or bill insurance directly. That's a deliberate choice — it means we spend a full hour with you, order the complete panel, and design a protocol that responds to your labs instead of a billing code. Standard receipts and visit summaries are available for HSA / FSA submission.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// Peptides showcase

function PeptidesShowcase() {
  return (
    <section style={{ padding: "120px 0", background: "var(--bg)" }}>
      <div className="wrap">
        <SectionLabel no="03" label="Peptide & bioregulator library" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "end",
          marginBottom: 56,
        }}>
          <Reveal>
            <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, maxWidth: 600 }}>
              Targeted signaling, <span style={{ color: "var(--mint-2)" }}>not</span> shotgun supplementation.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 480 }}>
              Each peptide acts on a specific receptor pathway. We prescribe — and pulse — in research-backed dosing windows, with periodic labs to track response.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {window.PEPTIDES.map((p, i) => {
            const tone = p.tone === "mint" ? "var(--mint)" : p.tone === "blue" ? "var(--blue)" : "var(--ink)";
            const bg = p.tone === "mint" ? "var(--mint-tint)" : p.tone === "blue" ? "var(--blue-tint)" : "var(--bg-2)";
            return (
              <Reveal key={p.name} delay={i * 60}>
                <div style={{
                  padding: "32px 28px 26px",
                  background: "var(--bg)",
                  border: "1px solid var(--rule)",
                  borderRadius: 14,
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tone;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--rule)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                >
                  <div>
                    <div style={{
                      width: 44, height: 44,
                      borderRadius: 999,
                      background: bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 24,
                    }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: tone }}/>
                    </div>
                    <div style={{ fontSize: 22, lineHeight: 1.1, marginBottom: 8, fontFamily: "var(--display)", fontWeight: 600 }}>{p.name}</div>
                    <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{p.use}</p>
                  </div>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-mute)",
                    marginTop: 22,
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span>Rx · {String(i + 1).padStart(2, "0")}</span>
                    <span style={{ color: tone }}>Protocol →</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// Testimonials

function Testimonials() {
  const items = [
    { q: "I'd been told my labs were 'normal' for three years. Elevate ordered the full panel and rebuilt my thyroid protocol from scratch.", a: "K.M., 42", cat: "Thyroid" },
    { q: "Honest about timelines, honest about what wouldn't work. The first clinic that didn't try to sell me a stack on day one.", a: "D.R., 38", cat: "Men's hormones" },
    { q: "Down 27 pounds in five months on a tirzepatide protocol I actually understand. They explained every dose change.", a: "S.A., 51", cat: "Weight loss" },
  ];
  return (
    <section style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="wrap">
        <SectionLabel no="04" label="From the practice" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure style={{
                margin: 0,
                padding: "36px 32px 32px",
                background: "var(--bg)",
                border: "1px solid var(--rule)",
                borderRadius: 14,
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
                <div style={{
                  fontFamily: "var(--display)",
                  fontWeight: 500,
                  fontSize: 19,
                  lineHeight: 1.4,
                  letterSpacing: "-0.005em",
                }}>
                  <span style={{ color: "var(--blue)", fontFamily: "var(--display)" }}>“</span>{it.q}<span style={{ color: "var(--blue)" }}>”</span>
                </div>
                <figcaption style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 28,
                  paddingTop: 18,
                  borderTop: "1px solid var(--rule)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}>
                  <span>— {it.a}</span>
                  <span style={{ color: "var(--mint-2)" }}>{it.cat}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// Mini quiz teaser

function QuizTeaser() {
  return (
    <section style={{
      padding: "120px 0",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative shape */}
      <div style={{
        position: "absolute",
        right: "5%", top: "20%",
        width: 360, height: 360,
        display: "none",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <SectionLabel no="05" label="Hormone Quiz · 2 minutes" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 64,
          alignItems: "center",
        }}>
          <div>
            <Reveal>
              <h2 style={{ fontSize: "var(--h1)", lineHeight: 1.03, marginBottom: 28, maxWidth: 600 }}>
                A quick read on where your <span style={{ color: "var(--blue)" }}>signal</span> is drifting.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize: 17, color: "var(--ink-soft)", marginBottom: 32, maxWidth: 500 }}>
                Seven questions, each tied to a hormonal axis we test. Your result is directional — not a diagnosis — and maps to the services likely to address it.
              </p>
            </Reveal>
            <Reveal delay={180} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="Hormone Quiz.html">Start the quiz</BtnPrimary>
              <BtnGhost href="Contact.html">Or skip to a consult</BtnGhost>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div style={{
              background: "var(--bg)",
              border: "1px solid var(--rule)",
              borderRadius: 14,
              padding: "32px 36px",
              boxShadow: "var(--shadow)",
            }}>
              <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 22 }}>Q1 / 7</div>
              <div style={{
                fontFamily: "var(--display)",
                fontWeight: 500,
                fontSize: 26,
                lineHeight: 1.2,
                marginBottom: 24,
              }}>
                By 3pm most days, how do you feel?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {window.QUIZ[0].a.map((opt, i) => (
                  <div key={i} style={{
                    padding: "14px 18px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--rule)",
                    borderRadius: 10,
                    fontSize: 14.5,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    color: "var(--ink-soft)",
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)",
                      }}>{String.fromCharCode(65 + i)}</span>
                      {opt.label}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 22,
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
              }}>
                Confidential · No sign-up · 2 min total
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, ServicesGrid, ServiceCard, Approach, PeptidesShowcase, Testimonials, QuizTeaser });
