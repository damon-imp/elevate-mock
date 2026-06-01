// shared.jsx — Nav, Footer, AnnouncementBar, CTABand, PageHero, theme applier

// Apply CSS variables from tweaks to the document root
function applyTheme(t) {
  const root = document.documentElement;
  const body = document.body;
  // Display font
  body.setAttribute("data-display", t.display || "sans");
  // Color mode
  body.setAttribute("data-mode", t.mode === "dark" ? "dark" : "light");
  // Accent intensity
  if (t.blueShade) {
    const map = {
      bright:   { "--blue": "#1F66FF", "--blue-2": "#1854E0", "--blue-3": "#4E89FF", "--blue-tint": "#DFEAFF" },
      royal:    { "--blue": "#2A4ED1", "--blue-2": "#1F3DAE", "--blue-3": "#577AEA", "--blue-tint": "#DCE3FB" },
      teal:     { "--blue": "#0E7FB6", "--blue-2": "#08699A", "--blue-3": "#37A1D2", "--blue-tint": "#D5ECF8" },
      indigo:   { "--blue": "#3D4FE0", "--blue-2": "#2E3DB7", "--blue-3": "#6B79EA", "--blue-tint": "#E0E4FB" },
    };
    const set = map[t.blueShade] || map.bright;
    Object.entries(set).forEach(([k, v]) => root.style.setProperty(k, v));
  }
  if (t.mintShade) {
    const map = {
      mint:    { "--mint": "#25C996", "--mint-2": "#14A87B", "--mint-tint": "#D6F5E8" },
      sage:    { "--mint": "#6FA37A", "--mint-2": "#4E7E5A", "--mint-tint": "#DEEBE0" },
      forest:  { "--mint": "#3F8C5F", "--mint-2": "#2A6C46", "--mint-tint": "#D6E8DC" },
      lime:    { "--mint": "#5BB85E", "--mint-2": "#3D9540", "--mint-tint": "#DDF0DE" },
    };
    const set = map[t.mintShade] || map.mint;
    Object.entries(set).forEach(([k, v]) => root.style.setProperty(k, v));
  }
}

// ────────────────────────────────────────────────────────
// Announcement bar + Nav

const MENU = [
  { label: "Services",      href: "Services.html" },
  { label: "Hormone Quiz",  href: "Hormone Quiz.html" },
  { label: "Providers",     href: "Providers.html" },
  { label: "Client Portal", href: "Client Portal.html" },
  { label: "Blog",          href: "Blog.html" },
  { label: "Contact",       href: "Contact.html" },
];

function AnnouncementBar() {
  return (
    <div className="announce" style={{
      background: "var(--ink)",
      color: "#FFFFFF",
      fontFamily: "var(--sans)",
      fontSize: 12.5,
      letterSpacing: "0.005em",
      fontWeight: 500,
      padding: "9px 0",
      textAlign: "center",
    }}>
      <span style={{ color: "var(--mint)" }}>●</span>
      &nbsp;Accepting new patients · Self-pay clinic · Free 15-minute consultation
    </div>
  );
}

function Nav({ current }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.92)" : "var(--bg)",
      backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      borderBottom: "1px solid var(--rule)",
      transition: "background 200ms ease",
    }}>
      <div className="nav-wrap" style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 40,
        padding: "16px 40px",
        maxWidth: 1440,
        margin: "0 auto",
      }}>
        <Logo />
        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {MENU.map((l) => {
            const active = current === l.label;
            return (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: active ? "var(--blue)" : "var(--ink)",
                  position: "relative",
                  paddingBottom: 4,
                  transition: "color 180ms ease",
                  borderBottom: active ? "1.5px solid var(--blue)" : "1.5px solid transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--blue)" : "var(--ink)")}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
        {/* Desktop CTA (phone removed — public number is a lead leak) */}
        <div className="nav-cta-desktop" style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BtnPrimary href="Contact.html" style={{ padding: "10px 18px", fontSize: 13 }}>
            Book consult
          </BtnPrimary>
        </div>
        {/* Mobile hamburger */}
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            appearance: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            flexDirection: "column",
            gap: 5,
            justifySelf: "end",
          }}
        >
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, transition: "transform 200ms ease", transform: open ? "translateY(7px) rotate(45deg)" : "none" }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, opacity: open ? 0 : 1, transition: "opacity 150ms ease" }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "var(--ink)", borderRadius: 2, transition: "transform 200ms ease", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}/>
        </button>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="nav-mobile-drawer" style={{
          borderTop: "1px solid var(--rule)",
          background: "var(--bg)",
          padding: "8px 0 24px",
        }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {MENU.map((l) => {
              const active = current === l.label;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: active ? "var(--blue)" : "var(--ink)",
                    padding: "15px 40px",
                    borderBottom: "1px solid var(--rule-soft)",
                  }}
                >
                  {l.label}
                </a>
              );
            })}
            <div style={{ padding: "20px 40px 0" }}>
              <BtnPrimary href="Contact.html" style={{ width: "100%", textAlign: "center", padding: "14px 18px", fontSize: 15, display: "block" }}>
                Book consult
              </BtnPrimary>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// ────────────────────────────────────────────────────────
// Sub-page hero banner

function PageHero({ eyebrow, title, kicker, image, accent }) {
  return (
    <section style={{
      position: "relative",
      padding: "80px 0 96px",
      background: "var(--bg-2)",
      borderBottom: "1px solid var(--rule)",
      overflow: "hidden",
    }}>
      {/* Decorative grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "none", pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 24 }}>{eyebrow}</div>
        <h1 style={{
          fontSize: "clamp(40px, 5.4vw, 76px)",
          lineHeight: 1.02,
          maxWidth: 1000,
          marginBottom: 24,
        }}>{title}</h1>
        {kicker && (
          <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 640, lineHeight: 1.55 }}>
            {kicker}
          </p>
        )}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// CTA band (used on every page)

function CTABand() {
  return (
    <section style={{
      position: "relative",
      padding: "120px 0",
      background: "var(--ink)",
      color: "#FFFFFF",
      overflow: "hidden",
    }}>
      {/* Background gradient orb */}
      <div style={{
        position: "absolute",
        right: "-10%",
        top: "-30%",
        width: 700,
        height: 700,
        display: "none",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute",
        left: "-5%",
        bottom: "-30%",
        width: 600,
        height: 600,
        display: "none",
        pointerEvents: "none",
      }}/>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <div className="eyebrow" style={{ color: "var(--mint)", marginBottom: 28 }}>Begin</div>
        </Reveal>
        <div data-collapse="true" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end" }}>
          <Reveal>
            <h2 style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1.0,
              marginBottom: 0,
            }}>
              Your labs.<br/>
              Your protocol.<br/>
              <span style={{ color: "var(--mint)" }}>Your timeline.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", marginBottom: 32, lineHeight: 1.55 }}>
                A 15-minute consult, no card on file. We'll review your symptoms, walk you through what a full panel measures, and tell you honestly whether we're the right fit.
              </p>
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <BtnPrimary href="Contact.html" style={{
                  background: "var(--mint)",
                  color: "var(--ink)",
                  boxShadow: "var(--shadow-sm)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--mint-2)"; e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--mint)"; e.currentTarget.style.color = "var(--ink)"; }}
                >
                  Book free consult
                </BtnPrimary>
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.55)",
                }}>
                  no card on file · 15 minutes
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────
// Footer

function Footer() {
  return (
    <footer style={{ background: "var(--bg)", color: "var(--ink)", paddingTop: 72, paddingBottom: 32 }}>
      <div className="wrap">
        <div data-collapse="true" style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1.1fr",
          gap: 56,
          paddingBottom: 56,
          borderBottom: "1px solid var(--rule)",
        }}>
          <div>
            <Logo />
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 22, maxWidth: 340, lineHeight: 1.55 }}>
              A self-pay hormone, peptide, and longevity clinic. Comprehensive care, transparent pricing.
            </p>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Hours</div>
              <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>Mon–Fri · 9:00 – 17:00 EST</div>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14, color: "var(--ink)" }}>Services</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {window.SERVICES.map((s) => (
                <li key={s.id}><a href={s.href} style={{ fontSize: 14, color: "var(--ink-soft)" }}>{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14, color: "var(--ink)" }}>Clinic</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><a href="Hormone Quiz.html" style={{ fontSize: 14, color: "var(--ink-soft)" }}>Hormone quiz</a></li>
              <li><a href="Providers.html" style={{ fontSize: 14, color: "var(--ink-soft)" }}>Providers</a></li>
              <li><a href="Client Portal.html" style={{ fontSize: 14, color: "var(--ink-soft)" }}>Client portal</a></li>
              <li><a href="Blog.html" style={{ fontSize: 14, color: "var(--ink-soft)" }}>Journal</a></li>
              <li><a href="Contact.html" style={{ fontSize: 14, color: "var(--ink-soft)" }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14, color: "var(--ink)" }}>Get started</div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 16, maxWidth: 240 }}>
              Booking is online so we can match you with the right provider and protocol from the start.
            </p>
            <div>
              <BtnPrimary href="Contact.html" style={{ padding: "10px 18px", fontSize: 13 }}>Book a consult</BtnPrimary>
            </div>
          </div>
        </div>
        <div style={{
          padding: "22px 0",
          borderBottom: "1px solid var(--rule)",
        }}>
          <p style={{ fontSize: 12.5, color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: 760 }}>
            <span style={{ color: "var(--ink-soft)", fontWeight: 500 }}>A note on insurance:</span> At this time, our clinic operates as a self-pay practice and does not participate with insurance companies or bill insurance directly. We can provide standard receipts and visit summaries for HSA / FSA submission, but we do not assist with insurance reimbursement.
          </p>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>© 2026 Elevate Health & Hormones LLC</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#">Privacy</a>
            <a href="#">Policies</a>
            <a href="#">Accessibility</a>
            <a href="#">Sitemap</a>
          </div>
          <div>Brevard County · Florida</div>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────
// Sticky consult pill

function StickyConsultPill() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a href="Contact.html" style={{
      position: "fixed",
      bottom: 20,
      left: 20,
      zIndex: 40,
      background: "var(--ink)",
      color: "#FFFFFF",
      padding: "13px 22px",
      fontFamily: "var(--sans)",
      fontSize: 13.5,
      fontWeight: 500,
      borderRadius: 999,
      boxShadow: "var(--shadow)",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      animation: "pillIn 360ms cubic-bezier(0.2, 0.7, 0, 1) both",
      textDecoration: "none",
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: "var(--mint)",
        animation: "pulse 2s ease infinite",
      }}/>
      Book free consult
      <Arrow size={12} />
      <style>{`
        @keyframes pillIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.5} }
      `}</style>
    </a>
  );
}

// ────────────────────────────────────────────────────────
// Common Tweaks panel used across pages

function ElevateTweaks({ t, setTweak }) {
  const BLUES = {
    "#1F66FF": "bright",
    "#2A4ED1": "royal",
    "#0E7FB6": "teal",
    "#3D4FE0": "indigo",
  };
  const MINTS = {
    "#25C996": "mint",
    "#6FA37A": "sage",
    "#3F8C5F": "forest",
    "#5BB85E": "lime",
  };
  const blueHex = Object.entries(BLUES).find(([, k]) => k === t.blueShade)?.[0] || "#1F66FF";
  const mintHex = Object.entries(MINTS).find(([, k]) => k === t.mintShade)?.[0] || "#25C996";

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Color" />
      <TweakColor
        label="Blue"
        value={blueHex}
        options={Object.keys(BLUES)}
        onChange={(v) => setTweak("blueShade", BLUES[v])}
      />
      <TweakColor
        label="Mint accent"
        value={mintHex}
        options={Object.keys(MINTS)}
        onChange={(v) => setTweak("mintShade", MINTS[v])}
      />
      <TweakSection label="Typography" />
      <TweakRadio
        label="Headlines"
        value={t.display}
        options={["sans", "slab", "grotesk"]}
        onChange={(v) => setTweak("display", v)}
      />
    </TweaksPanel>
  );
}

Object.assign(window, {
  applyTheme, AnnouncementBar, Nav, PageHero, CTABand, Footer, StickyConsultPill, ElevateTweaks, MENU,
});
