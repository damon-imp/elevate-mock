// page-blog.jsx — Blog / Journal index

function BlogPage() {
  const [t, setTweak] = useStoredTweaks(window.TWEAK_DEFAULTS_BLOG);
  React.useEffect(() => { applyTheme(t); }, [t]);

  const [filter, setFilter] = React.useState("All");
  const cats = ["All", ...new Set(window.POSTS.map((p) => p.cat))];
  const filtered = filter === "All" ? window.POSTS : window.POSTS.filter((p) => p.cat === filter);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Blog" />
      <PageHero
        eyebrow="Journal"
        title="Notes from the practice."
        kicker="Long-form writing from our providers on hormones, peptides, weight loss, and the underlying biology. Plain-language deep dives — not SEO chum."
      />

      {/* Filter */}
      <section style={{ padding: "60px 0 24px" }}>
        <div className="wrap">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", paddingBottom: 24, borderBottom: "1px solid var(--rule)" }}>
            <span className="eyebrow" style={{ marginRight: 14 }}>Filter</span>
            {cats.map((c) => {
              const on = filter === c;
              return (
                <button key={c} onClick={() => setFilter(c)} style={{
                  appearance: "none",
                  padding: "8px 14px",
                  fontSize: 13,
                  fontFamily: "var(--sans)",
                  border: `1px solid ${on ? "var(--ink)" : "var(--rule)"}`,
                  background: on ? "var(--ink)" : "transparent",
                  color: on ? "#FFFFFF" : "var(--ink)",
                  cursor: "pointer",
                  borderRadius: 999,
                  transition: "all 160ms ease",
                }}>{c}</button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {filtered.length > 0 && (
        <section style={{ padding: "24px 0 40px" }}>
          <div className="wrap">
            <Reveal>
              <FeaturedCard post={filtered[0]} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="wrap">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {filtered.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter prompt */}
      <section style={{ padding: "100px 0", background: "var(--bg-2)" }}>
        <div className="wrap">
          <div style={{
            background: "var(--bg)",
            border: "1px solid var(--rule)",
            borderRadius: 14,
            padding: "56px 64px",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 56,
            alignItems: "center",
          }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 18 }}>The Practice — monthly</div>
              <h2 style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 16 }}>
                One email a month, no clickbait.
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.55, maxWidth: 480 }}>
                What's actually new in hormone medicine, peptide research, and longevity protocols. Written by our providers, edited for plain English.
              </p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="you@email.com"
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "14px 16px",
                  fontSize: 14,
                  fontFamily: "var(--sans)",
                  border: "1px solid var(--rule)",
                  borderRadius: 999,
                  background: "var(--bg)",
                  color: "var(--ink)",
                  outline: "none",
                }}
              />
              <BtnPrimary>Subscribe</BtnPrimary>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <StickyConsultPill />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function FeaturedCard({ post: p }) {
  return (
    <a href="#" style={{
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 0,
      background: "var(--bg)",
      border: "1px solid var(--rule)",
      borderRadius: 14,
      overflow: "hidden",
      textDecoration: "none",
      color: "var(--ink)",
      transition: "all 200ms ease",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.borderColor = "var(--blue)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)"; e.currentTarget.style.borderColor = "var(--rule)"; }}
    >
      <div className="img-frame" style={{ minHeight: 380 }}>
        <img src={p.image} alt={p.title} loading="lazy" />
      </div>
      <div style={{ padding: "48px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 22 }}>
          <span style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            background: "var(--blue)",
            color: "#FFFFFF",
            borderRadius: 999,
          }}>Featured</span>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>{p.cat}</span>
        </div>
        <h2 style={{ fontSize: 38, lineHeight: 1.1, marginBottom: 20 }}>{p.title}</h2>
        <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 28 }}>{p.excerpt}</p>
        <div style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}>
          <span>{p.date}</span>
          <span style={{ width: 3, height: 3, background: "var(--ink-mute)", borderRadius: "50%" }}/>
          <span>{p.read} read</span>
        </div>
      </div>
    </a>
  );
}

function PostCard({ post: p }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        border: "1px solid var(--rule)",
        borderRadius: 14,
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--ink)",
        transition: "all 200ms ease",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "var(--shadow)" : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <div className="img-frame" style={{ aspectRatio: "16 / 10" }}>
        <img src={p.image} alt={p.title} loading="lazy" style={{
          transition: "transform 600ms cubic-bezier(0.2, 0.7, 0, 1)",
          transform: hover ? "scale(1.04)" : "scale(1)",
        }}/>
      </div>
      <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
        <span className="eyebrow" style={{ color: "var(--blue)" }}>{p.cat}</span>
        <h3 style={{ fontSize: 22, lineHeight: 1.15 }}>{p.title}</h3>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55, flexGrow: 1 }}>{p.excerpt}</p>
        <div style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginTop: 8,
          paddingTop: 14,
          borderTop: "1px solid var(--rule)",
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}>
          <span>{p.date}</span>
          <span style={{ width: 3, height: 3, background: "var(--ink-mute)", borderRadius: "50%" }}/>
          <span>{p.read}</span>
        </div>
      </div>
    </a>
  );
}

window.TWEAK_DEFAULTS_BLOG = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

ReactDOM.createRoot(document.getElementById("root")).render(<BlogPage />);
