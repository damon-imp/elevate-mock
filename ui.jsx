// ui.jsx — small reusable bits

const useReveal = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isInView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };
    if (isInView()) { el.classList.add("in"); return; }
    const fallback = setTimeout(() => el.classList.add("in"), 400);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            clearTimeout(fallback);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => { clearTimeout(fallback); obs.disconnect(); };
  }, []);
  return ref;
};

function Reveal({ children, delay = 0, as: As = "div", style, className, ...rest }) {
  const ref = useReveal();
  return (
    <As
      ref={ref}
      className={`fade-up ${className || ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}

const btnBase = {
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  border: "none",
  fontFamily: "var(--sans)",
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: "0.005em",
  padding: "13px 22px",
  cursor: "pointer",
  borderRadius: 999,
  transition: "background 200ms ease, color 200ms ease, transform 200ms ease, box-shadow 200ms ease",
  textDecoration: "none",
};

function BtnPrimary({ children, onClick, style, arrow = true, href, ...rest }) {
  const props = {
    onClick, ...rest,
    style: {
      ...btnBase,
      background: "var(--blue)",
      color: "#FFFFFF",
      boxShadow: "var(--shadow-sm)",
      ...style,
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "var(--blue-2)";
      e.currentTarget.style.transform = "translateY(-1px)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "var(--blue)";
      e.currentTarget.style.transform = "translateY(0)";
    },
  };
  const content = (<>
    <span>{children}</span>
    {arrow && <Arrow />}
  </>);
  return href ? <a href={href} {...props}>{content}</a> : <button {...props}>{content}</button>;
}

function BtnDark({ children, onClick, style, arrow = true, href, ...rest }) {
  const props = {
    onClick, ...rest,
    style: {
      ...btnBase,
      background: "var(--ink)",
      color: "var(--bg)",
      ...style,
    },
    onMouseEnter: (e) => (e.currentTarget.style.background = "#3A3A3C"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "var(--ink)"),
  };
  const content = (<>
    <span>{children}</span>
    {arrow && <Arrow />}
  </>);
  return href ? <a href={href} {...props}>{content}</a> : <button {...props}>{content}</button>;
}

function BtnGhost({ children, onClick, style, arrow = true, href, ...rest }) {
  const props = {
    onClick, ...rest,
    style: {
      ...btnBase,
      background: "transparent",
      color: "var(--ink)",
      border: "1px solid var(--rule)",
      ...style,
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.borderColor = "var(--ink)";
      e.currentTarget.style.color = "var(--blue)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.borderColor = "var(--rule)";
      e.currentTarget.style.color = "var(--ink)";
    },
  };
  const content = (<>
    <span>{children}</span>
    {arrow && <Arrow />}
  </>);
  return href ? <a href={href} {...props}>{content}</a> : <button {...props}>{content}</button>;
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6.5L5 9.5L10.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ inverse }) {
  return (
    <a href="Elevate Health.html" style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
      <img
        src={inverse ? "elevate_logo_white.png" : "elevate_logo.png"}
        alt="Elevate Health"
        style={{ height: 38, width: "auto", display: "block" }}
      />
      <span style={{
        fontFamily: "var(--sans)",
        fontSize: 11,
        letterSpacing: "0",
        color: inverse ? "rgba(255,255,255,0.6)" : "var(--ink-soft)",
        fontWeight: 500,
        paddingLeft: 14,
        borderLeft: inverse ? "1px solid rgba(255,255,255,0.18)" : "1px solid var(--rule)",
        lineHeight: 1.3,
        maxWidth: 130,
      }}>Hormones · Peptides · Longevity</span>
    </a>
  );
}

function SectionLabel({ no, label, light }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "baseline",
      gap: 14,
      paddingBottom: 18,
      borderBottom: light ? "1px solid rgba(255,255,255,0.16)" : "1px solid var(--rule)",
      marginBottom: 56,
    }}>
      <span className="eyebrow" style={{ color: light ? "var(--mint)" : "var(--blue)" }}>{no}</span>
      <span className="eyebrow" style={{ color: light ? "rgba(255,255,255,0.7)" : undefined }}>{label}</span>
    </div>
  );
}

// Persist tweaks across pages (in addition to host postMessage)
function useStoredTweaks(defaults) {
  // Load any persisted values from localStorage on init
  const [stored] = React.useState(() => {
    try {
      const raw = localStorage.getItem("eh-tweaks");
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch { return defaults; }
  });
  const [t, setTweakBase] = useTweaks(stored);
  const setTweak = React.useCallback((keyOrObj, val) => {
    setTweakBase(keyOrObj, val);
    // Persist after React state updates
    setTimeout(() => {
      const next = typeof keyOrObj === "object"
        ? { ...t, ...keyOrObj }
        : { ...t, [keyOrObj]: val };
      try { localStorage.setItem("eh-tweaks", JSON.stringify(next)); } catch {}
    }, 0);
  }, [t, setTweakBase]);
  return [t, setTweak];
}

Object.assign(window, {
  Reveal, useReveal, BtnPrimary, BtnDark, BtnGhost, Arrow, Tick, Logo, SectionLabel,
  btnBase, useStoredTweaks,
});
