// page-quiz.jsx — Full Hormone Quiz experience

function QuizPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_QUIZ);
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [phase, setPhase] = React.useState("intro"); // intro | quiz | result
  const [stream, setStream] = React.useState("women"); // women | men
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  const Q = window.QUIZ_FULL;
  const total = Q.length;
  const q = Q[step];
  const isLast = step === total - 1;

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const max = total * 3;
  const pct = max ? score / max : 0;
  const band = pct < 0.34 ? "low" : pct < 0.67 ? "mid" : "high";

  const choose = (v) => {
    setAnswers((a) => ({ ...a, [q.id]: v }));
    if (isLast) {
      setTimeout(() => setPhase("result"), 280);
    } else {
      setTimeout(() => setStep((s) => s + 1), 220);
    }
  };

  const reset = () => { setPhase("intro"); setStep(0); setAnswers({}); };

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Hormone Quiz" />

      {phase === "intro" && (
        <QuizIntro onStart={(s) => { setStream(s); setPhase("quiz"); }} />
      )}
      {phase === "quiz" && (
        <QuizExperience
          step={step}
          total={total}
          q={q}
          answers={answers}
          onChoose={choose}
          onBack={() => setStep((s) => Math.max(0, s - 1))}
          stream={stream}
        />
      )}
      {phase === "result" && (
        <QuizResult score={score} max={max} band={band} stream={stream} answers={answers} reset={reset} />
      )}

      <CTABand />
      <Footer />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function QuizIntro({ onStart }) {
  return (
    <section style={{ padding: "80px 0 120px", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        right: "-10%", top: "-20%",
        width: 700, height: 700,
        display: "none",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 64,
          alignItems: "center",
        }}>
          <div>
            <Reveal>
              <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 22 }}>Hormone Quiz · 2 minutes</div>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={{ fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 1.02, marginBottom: 28, maxWidth: 720 }}>
                Find where your <span style={{ color: "var(--blue)" }}>signal</span> is drifting.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 540, marginBottom: 32, lineHeight: 1.55 }}>
                Seven questions, each tied to a hormonal axis we test. Your result is directional — not a diagnosis — and maps to the services likely to address it.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 380 }}>
                <BtnPrimary onClick={() => onStart("women")}>Start: women's panel →</BtnPrimary>
                <BtnGhost onClick={() => onStart("men")}>Start: men's panel →</BtnGhost>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--rule)",
                display: "flex",
                gap: 40,
                flexWrap: "wrap",
              }}>
                {[
                  { k: "7", v: "Questions" },
                  { k: "2 min", v: "To complete" },
                  { k: "0", v: "Sign-up required" },
                ].map((s) => (
                  <div key={s.v}>
                    <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.02em" }}>{s.k}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{
              background: "var(--bg)",
              border: "1px solid var(--rule)",
              borderRadius: 14,
              padding: "36px 40px",
              boxShadow: "var(--shadow)",
            }}>
              <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 18 }}>What we measure</div>
              {[
                { axis: "HPA axis", what: "Cortisol, DHEA, stress response" },
                { axis: "HPG axis", what: "Sex hormones — estrogen, testosterone, progesterone" },
                { axis: "HPT axis", what: "Thyroid metabolism + autoimmune markers" },
                { axis: "Metabolic", what: "Insulin, glucose, lipid panel" },
                { axis: "Recovery", what: "Inflammation, sleep quality, IGF-1" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "14px 0",
                  borderTop: "1px solid var(--rule)",
                  alignItems: "baseline",
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.04em", color: "var(--blue)" }}>{row.axis}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>{row.what}</div>
                </div>
              ))}
              <div style={{
                marginTop: 24,
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
              }}>
                Confidential · No data stored · No sign-up
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuizExperience({ step, total, q, answers, onChoose, onBack, stream }) {
  return (
    <section style={{
      minHeight: "calc(100vh - 200px)",
      padding: "80px 0 120px",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
    }}>
      <div className="wrap" style={{ width: "100%" }}>
        <div style={{
          maxWidth: 760,
          margin: "0 auto",
        }}>
          {/* Progress strip */}
          <div style={{ marginBottom: 56 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 14,
            }}>
              <div style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                <span style={{ color: "var(--blue)" }}>Q{step + 1}</span>
                <span style={{ color: "var(--ink-mute)" }}> / {total}</span>
              </div>
              <div className="eyebrow" style={{ color: "var(--ink-mute)" }}>
                {stream === "women" ? "Women's panel" : "Men's panel"} · {q.id.toUpperCase()}
              </div>
            </div>
            <div style={{ height: 3, background: "var(--rule)", borderRadius: 999, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                width: `${((step + (answers[q.id] !== undefined ? 1 : 0)) / total) * 100}%`,
                background: "var(--blue)",
                transition: "width 340ms cubic-bezier(0.2, 0.7, 0, 1)",
                borderRadius: 999,
              }}/>
            </div>
          </div>

          {/* Question */}
          <div key={q.id} style={{ animation: "fadeIn 320ms ease both" }}>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.1,
              marginBottom: 40,
            }}>{q.q}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.a.map((opt, i) => {
                const on = answers[q.id] === opt.v;
                return (
                  <button
                    key={i}
                    onClick={() => onChoose(opt.v)}
                    style={{
                      appearance: "none",
                      textAlign: "left",
                      display: "grid",
                      gridTemplateColumns: "32px 1fr auto",
                      gap: 16,
                      alignItems: "center",
                      padding: "20px 24px",
                      background: on ? "var(--blue)" : "var(--bg-2)",
                      color: on ? "#FFFFFF" : "var(--ink)",
                      border: `1px solid ${on ? "var(--blue)" : "var(--rule)"}`,
                      borderRadius: 14,
                      cursor: "pointer",
                      fontSize: 16,
                      fontFamily: "var(--sans)",
                      transition: "all 180ms ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!on) {
                        e.currentTarget.style.borderColor = "var(--blue)";
                        e.currentTarget.style.background = "var(--bg)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!on) {
                        e.currentTarget.style.borderColor = "var(--rule)";
                        e.currentTarget.style.background = "var(--bg-2)";
                      }
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      color: on ? "rgba(255,255,255,0.7)" : "var(--ink-mute)",
                    }}>{String.fromCharCode(65 + i)}</span>
                    <span>{opt.label}</span>
                    <span style={{ opacity: on ? 1 : 0.3, display: "inline-flex" }}>
                      <Arrow size={16} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <button
                onClick={onBack}
                disabled={step === 0}
                style={{
                  appearance: "none", background: "transparent", border: "none",
                  color: step === 0 ? "var(--rule)" : "var(--ink-soft)",
                  fontSize: 13, cursor: step === 0 ? "default" : "pointer",
                  fontFamily: "var(--mono)", letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: 0,
                }}
              >
                ← Back
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: i === step ? "var(--blue)" : (answers[window.QUIZ_FULL[i].id] !== undefined ? "var(--mint)" : "var(--rule)"),
                  }}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

function QuizResult({ score, max, band, stream, answers, reset }) {
  const pct = Math.round((score / max) * 100);
  const r = window.RESULTS[band];

  // Per-axis breakdown
  const axes = [
    { id: "energy",   label: "Energy",         desc: "HPA + thyroid axis" },
    { id: "sleep",    label: "Sleep",          desc: "Cortisol / melatonin" },
    { id: "body",     label: "Body comp.",     desc: "Metabolic / GLP-1 axis" },
    { id: "mood",     label: "Mood + focus",   desc: "Sex hormones, thyroid" },
    { id: "libido",   label: "Libido",         desc: "Sex hormone axis" },
    { id: "stress",   label: "Stress",         desc: "HPA axis" },
    { id: "recovery", label: "Recovery",       desc: "IGF-1, inflammation" },
  ];

  // Recommended services
  const recIds = band === "high" ? (stream === "women" ? ["womens", "thyroid", "peptides"] : ["mens", "thyroid", "peptides"])
                : band === "mid"  ? (stream === "women" ? ["womens", "thyroid"] : ["mens", "thyroid"])
                : ["thyroid"];
  const recServices = recIds.map((id) => window.SERVICES.find((s) => s.id === id)).filter(Boolean);

  return (
    <section style={{ padding: "80px 0 100px", background: "var(--bg-2)" }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 20 }}>Your Result</div>
        </Reveal>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 64,
          marginBottom: 64,
        }}>
          <Reveal>
            <h1 style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1.02,
              marginBottom: 32,
              maxWidth: 640,
            }}>
              {band === "high" ? "Your symptoms map closely to hormonal imbalance." :
               band === "mid"  ? "We're seeing meaningful drift in your hormonal signal." :
               "Mostly baseline — but worth confirming with a panel."}
            </h1>
            <p style={{ fontSize: 17.5, color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 580, marginBottom: 32 }}>
              {r.copy}
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary href="Contact.html">Book a free consult</BtnPrimary>
              <BtnGhost onClick={reset}>↺ Retake quiz</BtnGhost>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{
              background: "var(--bg)",
              border: "1px solid var(--rule)",
              borderRadius: 14,
              padding: 40,
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 28,
                alignItems: "center",
                marginBottom: 28,
              }}>
                <div style={{
                  width: 120, height: 120,
                  borderRadius: "50%",
                  background: `conic-gradient(${band === "high" ? "var(--blue)" : band === "mid" ? "var(--blue)" : "var(--mint)"} ${pct * 3.6}deg, var(--rule) 0deg)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", inset: 6,
                    background: "var(--bg)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column",
                    gap: 0,
                  }}>
                    <span style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>
                      {pct}<span style={{ fontSize: 16 }}>%</span>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 6 }}>Symptom-load</div>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1 }}>
                    {r.band}
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 8 }}>
                    Out of {max} possible.
                  </div>
                </div>
              </div>

              <div className="eyebrow" style={{ marginBottom: 12 }}>By area</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {axes.map((ax) => {
                  const v = answers[ax.id] !== undefined ? answers[ax.id] : 0;
                  return (
                    <div key={ax.id} style={{ display: "grid", gridTemplateColumns: "110px 1fr 30px", gap: 12, alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{ax.label}</div>
                      <div style={{ height: 6, background: "var(--rule)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${(v / 3) * 100}%`,
                          background: v >= 2 ? "var(--blue)" : v >= 1 ? "var(--blue-3)" : "var(--mint)",
                          transition: "width 600ms ease",
                        }}/>
                      </div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", textAlign: "right" }}>{v}/3</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Recommended services */}
        <Reveal>
          <div style={{ paddingTop: 36, borderTop: "1px solid var(--rule)" }}>
            <div className="eyebrow" style={{ marginBottom: 28 }}>Recommended next — services likely to address your signal</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${recServices.length}, 1fr)`, gap: 16 }}>
              {recServices.map((s) => (
                <a key={s.id} href={s.href} style={{
                  background: "var(--bg)",
                  border: "1px solid var(--rule)",
                  borderRadius: 14,
                  padding: 28,
                  textDecoration: "none",
                  color: "var(--ink)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "all 200ms ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span className="eyebrow" style={{ color: "var(--blue)" }}>{s.no}</span>
                  <h3 style={{ fontSize: 22, lineHeight: 1.1 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", flexGrow: 1 }}>{s.blurb}</p>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--blue)", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                    Read more <Arrow size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.TWEAK_DEFAULTS_QUIZ = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<QuizPage />);
