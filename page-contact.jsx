// page-contact.jsx — Contact + booking form

function ContactPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_CONTACT);
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [form, setForm] = React.useState({
    name: "", email: "", phone: "",
    reason: "",
    pref: "phone",
    when: "morning",
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Contact" />
      <PageHero
        eyebrow="Contact"
        title="Schedule your free 15-minute consult."
        kicker="No card required. We'll review your symptoms, walk you through what a full panel measures, and tell you honestly whether we're the right fit."
      />

      <section style={{ padding: "80px 0 120px" }}>
        <div className="wrap">
          <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64 }}>

            {/* Info column */}
            <Reveal>
              <div style={{ position: "sticky", top: 100 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {[
                    { label: "Booking", value: "Online only", sub: "So we can match you with the right provider", link: null },
                    { label: "In-clinic", value: "Brevard County, FL", sub: "Address on confirmation", link: null },
                    { label: "Telehealth", value: "Available statewide", sub: "Same-week appointments", link: null },
                  ].map((row, i) => (
                    <div key={i} style={{
                      paddingBottom: 24,
                      borderBottom: i === 2 ? "none" : "1px solid var(--rule)",
                    }}>
                      <div className="eyebrow" style={{ marginBottom: 10 }}>{row.label}</div>
                      {row.link ? (
                        <a href={row.link} style={{
                          fontFamily: "var(--display)",
                          fontWeight: 600,
                          fontSize: 24,
                          letterSpacing: "-0.01em",
                          color: "var(--ink)",
                          display: "block",
                          marginBottom: 6,
                        }}>{row.value}</a>
                      ) : (
                        <div style={{
                          fontFamily: "var(--display)",
                          fontWeight: 600,
                          fontSize: 24,
                          letterSpacing: "-0.01em",
                          marginBottom: 6,
                        }}>{row.value}</div>
                      )}
                      <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{row.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32, padding: 24, background: "var(--bg-2)", border: "1px solid var(--rule)", borderRadius: 14 }}>
                  <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 12 }}>Not ready to talk yet?</div>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.55 }}>
                    Take the 2-minute hormone quiz. It'll tell you which services match your symptoms.
                  </p>
                  <BtnGhost href="Hormone Quiz.html" style={{ padding: "8px 14px", fontSize: 12.5 }}>Start the quiz</BtnGhost>
                </div>
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal delay={120}>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--rule)",
                  borderRadius: 14,
                  padding: "40px 44px",
                  position: "relative",
                  minHeight: 600,
                }}
              >
                {!submitted ? (
                  <React.Fragment>
                    <h2 style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 28 }}>
                      Book your consult
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <Field label="First name" required>
                        <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Sarah" required />
                      </Field>
                      <Field label="Phone" required>
                        <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(321) 555-0102" required />
                      </Field>
                    </div>
                    <Field label="Email" required>
                      <input type="email" style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="sarah@email.com" required />
                    </Field>

                    <Field label="What brings you in?">
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {window.SERVICES.map((s) => (
                          <button type="button" key={s.id} onClick={() => set("reason", s.id)} style={{
                            appearance: "none",
                            padding: "8px 14px",
                            border: `1px solid ${form.reason === s.id ? "var(--blue)" : "var(--rule)"}`,
                            background: form.reason === s.id ? "var(--blue)" : "var(--bg)",
                            color: form.reason === s.id ? "#FFFFFF" : "var(--ink)",
                            fontFamily: "var(--sans)",
                            fontSize: 13,
                            cursor: "pointer",
                            borderRadius: 999,
                            transition: "all 160ms ease",
                          }}>{s.title}</button>
                        ))}
                      </div>
                    </Field>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 16 }}>
                      <Field label="Preferred contact">
                        <div style={{ display: "flex", gap: 6 }}>
                          {["phone", "email", "text"].map((p) => (
                            <button type="button" key={p} onClick={() => set("pref", p)} style={{
                              flex: 1,
                              padding: "10px 0",
                              border: `1px solid ${form.pref === p ? "var(--blue)" : "var(--rule)"}`,
                              background: form.pref === p ? "var(--blue-tint)" : "var(--bg)",
                              color: form.pref === p ? "var(--blue)" : "var(--ink)",
                              fontFamily: "var(--sans)",
                              fontSize: 13,
                              textTransform: "capitalize",
                              cursor: "pointer",
                              borderRadius: 10,
                            }}>{p}</button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Best time">
                        <div style={{ display: "flex", gap: 6 }}>
                          {[
                            { id: "morning", label: "AM" },
                            { id: "afternoon", label: "PM" },
                            { id: "anytime", label: "Anytime" },
                          ].map((p) => (
                            <button type="button" key={p.id} onClick={() => set("when", p.id)} style={{
                              flex: 1,
                              padding: "10px 0",
                              border: `1px solid ${form.when === p.id ? "var(--blue)" : "var(--rule)"}`,
                              background: form.when === p.id ? "var(--blue-tint)" : "var(--bg)",
                              color: form.when === p.id ? "var(--blue)" : "var(--ink)",
                              fontFamily: "var(--sans)",
                              fontSize: 13,
                              cursor: "pointer",
                              borderRadius: 10,
                            }}>{p.label}</button>
                          ))}
                        </div>
                      </Field>
                    </div>

                    <Field label="Anything else? (optional)">
                      <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical", fontFamily: "var(--sans)" }} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us what's been going on, or ask a question…" />
                    </Field>

                    <div style={{
                      paddingTop: 20,
                      marginTop: 8,
                      borderTop: "1px solid var(--rule)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 14,
                    }}>
                      <div style={{ fontSize: 12.5, color: "var(--ink-mute)", maxWidth: 320, lineHeight: 1.5 }}>
                        Confidential. We'll never sell your info or contact you for anything other than scheduling.
                      </div>
                      <BtnPrimary>Book my consult</BtnPrimary>
                    </div>
                  </React.Fragment>
                ) : (
                  <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "var(--mint-tint)",
                      color: "var(--mint-2)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 28,
                    }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M4 14L11 21L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 style={{ fontSize: 36, marginBottom: 18 }}>You're booked.</h2>
                    <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.55 }}>
                      A patient coordinator will reach out by {form.pref} within one business day to confirm your appointment time.
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                      <BtnGhost href="Elevate Health.html">Back to home</BtnGhost>
                      <BtnPrimary href="Hormone Quiz.html">Take the quiz while you wait</BtnPrimary>
                    </div>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 18, display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 }}>
        {label}
        {required && <span style={{ color: "var(--blue)" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 15,
  fontFamily: "var(--sans)",
  border: "1px solid var(--rule)",
  borderRadius: 10,
  background: "var(--bg)",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 160ms ease",
};

window.TWEAK_DEFAULTS_CONTACT = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<ContactPage />);
