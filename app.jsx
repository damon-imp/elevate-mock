// app.jsx — Homepage root + Tweaks wiring

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "blueShade": "bright",
  "mintShade": "mint",
  "display": "sans",
  "mode": "light"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useStoredTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTheme(t); }, [t]);

  return (
    <React.Fragment>
      <AnnouncementBar />
      <Nav current="Home" />
      <Hero />
      <ServicesGrid />
      <QuizTeaser />
      <Approach />
      <PeptidesShowcase />
      <Testimonials />
      <CTABand />
      <Footer />

      <StickyConsultPill />
      <ElevateTweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
