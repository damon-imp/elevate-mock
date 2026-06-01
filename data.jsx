// data.jsx — content + constants

// Stock photos: Unsplash IDs that reliably exist
const IMG = {
  hero:        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",  // woman exercising
  heroAlt:     "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=1400&q=80",   // active outdoor
  womens:      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",   // smiling woman
  mens:        "https://images.unsplash.com/photo-1583468982228-19f19164aee2?auto=format&fit=crop&w=900&q=80",   // mature man
  thyroid:     "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",   // lab tubes
  peptides:    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",   // lab/molecular
  peptidesAlt: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",      // active man
  weight:      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",   // active woman/scale
  consult:     "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",  // doctor consult
  consultAlt:  "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=1200&q=80",  // medical
  couple:      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1200&q=80",     // active couple
  calm:        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",  // yoga/meditation
  nature:      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80",  // mountains
  portrait1:   "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  portrait2:   "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
  portrait3:   "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  blog1:       "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  blog2:       "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  blog3:       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80",
  blog4:       "https://images.unsplash.com/photo-1607968565043-36af90dde238?auto=format&fit=crop&w=800&q=80",
};

const SERVICES = [
  {
    id: "womens",
    no: "01",
    title: "Women's hormones",
    blurb: "Estrogen, progesterone, testosterone, thyroid — recalibrated.",
    detail: "Bioidentical hormone therapy tuned to perimenopause, menopause, postpartum, and PCOS. Symptom-led, lab-verified.",
    image: IMG.womens,
    treats: ["Hot flashes & night sweats", "Sleep & mood", "Cycle irregularity", "Libido & energy"],
    href: "Services.html#womens",
  },
  {
    id: "mens",
    no: "02",
    title: "Men's hormones",
    blurb: "Testosterone optimization without the bro-clinic posture.",
    detail: "Comprehensive panels (Total + Free T, E2, SHBG, DHEA, thyroid). TRT protocols when clinically indicated.",
    image: IMG.mens,
    treats: ["Low energy & focus", "Strength & recovery", "Mood & motivation", "Sexual health"],
    href: "Services.html#mens",
  },
  {
    id: "thyroid",
    no: "03",
    title: "Thyroid optimization",
    blurb: "Full panel — not just TSH. Find the signal others miss.",
    detail: "TSH, Free T3, Free T4, Reverse T3, TPO and TG antibodies. Sub-clinical hypothyroid and Hashimoto's protocols.",
    image: IMG.thyroid,
    treats: ["Persistent fatigue", "Stubborn weight gain", "Brain fog", "Cold intolerance"],
    href: "Services.html#thyroid",
  },
  {
    id: "peptides",
    no: "04",
    title: "Peptide therapy",
    blurb: "Targeted signaling for repair, recomposition, and longevity.",
    detail: "Sermorelin, BPC-157, NAD+, IGF-1 LR3, Methylene Blue. Prescribed in research-backed dosing windows.",
    image: IMG.peptidesAlt,
    treats: ["Recovery & sleep", "Body composition", "Cognitive function", "Skin & hair"],
    href: "Services.html#peptides",
  },
  {
    id: "weight",
    no: "05",
    title: "Medical weight loss",
    blurb: "GLP-1 protocols with the labs and follow-up they require.",
    detail: "Semaglutide, Tirzepatide, and emerging Retatrutide programs. Paired with nutrition and metabolic monitoring.",
    image: IMG.weight,
    treats: ["Visceral fat reduction", "Insulin sensitivity", "Appetite regulation", "Sustained loss"],
    href: "Services.html#weight",
  },
];

const SYMPTOMS = [
  { id: "fatigue",  label: "I'm exhausted",            maps: ["thyroid", "mens", "womens"] },
  { id: "weight",   label: "Stubborn weight",          maps: ["weight", "thyroid", "womens"] },
  { id: "mood",     label: "Mood swings or anxiety",   maps: ["womens", "mens", "thyroid"] },
  { id: "sleep",    label: "Sleep is broken",          maps: ["womens", "peptides", "thyroid"] },
  { id: "libido",   label: "Low libido",               maps: ["mens", "womens"] },
  { id: "focus",    label: "Brain fog",                maps: ["thyroid", "peptides", "mens"] },
  { id: "recovery", label: "Slow recovery",            maps: ["peptides", "mens"] },
  { id: "perimeno", label: "Perimenopause symptoms",   maps: ["womens", "thyroid"] },
];

const PEPTIDES = [
  { name: "Sermorelin",       use: "GH secretagogue — recovery, sleep architecture", tone: "mint"  },
  { name: "BPC-157",          use: "Tissue repair, gut lining, joint integrity",      tone: "blue"  },
  { name: "NAD+",             use: "Cellular energy, cognitive longevity",            tone: "ink"   },
  { name: "Glutathione",      use: "Master antioxidant — detox & skin",               tone: "mint"  },
  { name: "IGF-1 LR3",        use: "Lean mass, recomposition",                        tone: "blue"  },
  { name: "Methylene Blue",   use: "Mitochondrial support, cognitive uplift",         tone: "ink"   },
];

const QUIZ = [
  {
    id: "energy",
    q: "By 3pm most days, how do you feel?",
    a: [
      { v: 0, label: "Sharp and steady" },
      { v: 1, label: "Slight dip, manageable" },
      { v: 2, label: "Need caffeine or a nap" },
      { v: 3, label: "Wiped — running on fumes" },
    ],
  },
  {
    id: "sleep",
    q: "When did you last wake up actually rested?",
    a: [
      { v: 0, label: "This week" },
      { v: 1, label: "Within the month" },
      { v: 2, label: "Months ago" },
      { v: 3, label: "I genuinely can't remember" },
    ],
  },
  {
    id: "body",
    q: "Your body composition over the last 12 months:",
    a: [
      { v: 0, label: "Holding steady" },
      { v: 1, label: "Subtle drift" },
      { v: 2, label: "Noticeable change despite effort" },
      { v: 3, label: "Significant change, frustrating" },
    ],
  },
  {
    id: "mood",
    q: "Mood, focus, and motivation lately?",
    a: [
      { v: 0, label: "On point" },
      { v: 1, label: "Some off days" },
      { v: 2, label: "More off than on" },
      { v: 3, label: "I don't feel like myself" },
    ],
  },
];

const QUIZ_FULL = [
  ...QUIZ,
  {
    id: "libido",
    q: "Sexual health & libido over the last 6 months?",
    a: [
      { v: 0, label: "No concerns" },
      { v: 1, label: "Mild drift" },
      { v: 2, label: "Noticeable change" },
      { v: 3, label: "Significant change" },
    ],
  },
  {
    id: "stress",
    q: "How well are you handling stress?",
    a: [
      { v: 0, label: "Resilient" },
      { v: 1, label: "Mostly okay" },
      { v: 2, label: "Wearing thin" },
      { v: 3, label: "Burning out" },
    ],
  },
  {
    id: "recovery",
    q: "Recovery from exercise or illness:",
    a: [
      { v: 0, label: "Bounces back fast" },
      { v: 1, label: "Takes a bit longer" },
      { v: 2, label: "Lingers" },
      { v: 3, label: "Feels permanent" },
    ],
  },
];

const RESULTS = {
  low:  { band: "Baseline",    copy: "Your symptoms are mild. A baseline panel and lifestyle review will catch anything early." },
  mid:  { band: "Imbalance",   copy: "Several markers suggest hormonal drift. A full panel will pinpoint which axis is involved." },
  high: { band: "Significant", copy: "Your symptoms map closely to hormonal imbalance. We'd recommend a comprehensive panel and a one-on-one consultation." },
};

const PROCESS = [
  { n: "01", t: "Consult",       d: "60-minute intake with a provider. No insurance gymnastics — flat self-pay pricing." },
  { n: "02", t: "Panel",         d: "Comprehensive labs (hormonal, metabolic, thyroid, vitamins). Drawn locally or shipped." },
  { n: "03", t: "Protocol",      d: "A written plan: therapies, dosing windows, lifestyle inputs, expected timelines." },
  { n: "04", t: "Recalibration", d: "We measure, adjust, and re-test. Ongoing care, not a one-and-done prescription." },
];

const STATS = [
  { k: "1,200+",  v: "Patients under active care" },
  { k: "48hr",    v: "Median time to first appointment" },
  { k: "Self-pay", v: "Transparent pricing, no insurance" },
  { k: "11 yrs",   v: "Average provider experience" },
];

const PROVIDERS = [
  {
    name: "Dr. Lena Reyes, DO",
    role: "Medical Director · Hormone & Longevity Medicine",
    bio: "Triple board-certified in family, integrative, and anti-aging medicine. Twelve years building peptide and hormone protocols.",
    image: IMG.portrait1,
    creds: ["DO, NYITCOM", "ABFM Diplomate", "A4M Fellow"],
  },
  {
    name: "Marcus Heller, NP-C",
    role: "Nurse Practitioner · Men's Health",
    bio: "Specialist in testosterone optimization and metabolic protocols. Former endurance athlete; reads labs like a coach reads tape.",
    image: IMG.portrait2,
    creds: ["MSN, Duke University", "AANP Certified", "BHRT Clinical"],
  },
  {
    name: "Dr. Priya Chen, MD",
    role: "Endocrinology · Thyroid & Metabolic",
    bio: "Endocrinologist with a sub-specialty in autoimmune thyroid conditions and GLP-1 metabolic medicine.",
    image: IMG.portrait3,
    creds: ["MD, Stanford", "Board-Certified Endo", "AACE Member"],
  },
];

const POSTS = [
  {
    cat: "Hormones",
    title: "What a full thyroid panel actually measures (and why TSH alone misses it)",
    excerpt: "The standard TSH-only test catches frank hypothyroidism but misses sub-clinical and autoimmune cases. Here's the panel we run, and what each marker tells us.",
    date: "May 18, 2026",
    read: "7 min",
    image: IMG.blog1,
  },
  {
    cat: "Peptides",
    title: "Sermorelin vs. injectable GH: what the research actually says",
    excerpt: "Sermorelin is a growth-hormone secretagogue, not GH itself. The mechanism matters — for safety, for tapering, and for who's a candidate.",
    date: "May 04, 2026",
    read: "9 min",
    image: IMG.blog2,
  },
  {
    cat: "Weight loss",
    title: "Tirzepatide, plateaus, and the protocol most clinics get wrong",
    excerpt: "GLP-1 plateaus are not failure — they're a signal. We walk through the dose-titration framework and the labs we re-run at each transition.",
    date: "Apr 22, 2026",
    read: "6 min",
    image: IMG.blog3,
  },
  {
    cat: "Longevity",
    title: "NAD+, methylene blue, and the mitochondrial stack — sorted",
    excerpt: "Two of the most-asked-about longevity therapies, plus what we're seeing in patient panels after 90 days.",
    date: "Apr 09, 2026",
    read: "11 min",
    image: IMG.blog4,
  },
];

Object.assign(window, {
  IMG, SERVICES, SYMPTOMS, PEPTIDES, QUIZ, QUIZ_FULL, RESULTS, PROCESS, STATS, PROVIDERS, POSTS,
});
