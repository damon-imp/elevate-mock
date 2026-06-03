# Elevate site mockup — changes applied (from 05/30 kickoff call)

All edits trace to decisions in the Discovery/Kickoff transcript. Mock data
(providers, patient labs) left in place as placeholders — wire to real data later.

## Global (shared.jsx)
- REMOVED all public phone numbers (nav, CTA band, footer). Per call: "massive page leak."
- REMOVED public email (footer). Booking is online-only so leads route into pipeline.
- ADDED insurance hard-line disclaimer in footer: explicit "self-pay, does not bill insurance,
  HSA/FSA receipts only." Per Emily + her lawyer — legal hard line, must be on site.
- LOCKED light theme (removed dark-mode toggle from tweaks). Emily: "stay that."
- ADDED mobile nav: hamburger drawer under 920px, body-scroll lock, full-width Book consult.

## Homepage (home-sections.jsx)
- REWROTE hero headline to lead with the avatar pains: fatigue + weight loss ("Tired, foggy,
  and gaining weight you can't explain? Get answers").
- REWROTE subhead to speak to BOTH mindsets: "feel like yourself again" (bread-and-butter) +
  "optimize and crush it past 40" (the higher-value patients Emily wants more of).
- SHARPENED insurance manifesto from soft marketing to explicit non-participation statement.

## Contact (page-contact.jsx)
- REMOVED phone + email contact rows. Booking online only. Form still captures lead info.

## Client Portal (page-portal.jsx)
- REMOVED total-spend / billing history. Replaced "Billing" tab with "Payment" = card-on-file
  only. Per Emily (Amazon total-spend concern) — Damon agreed, card on file only.
- ADDED "Education" tab: per-hormone guides + injection how-to videos centralized in portal.
  Solves the "guides go to spam, patients call asking how to use this" problem.
- ADDED "Pharmacy" tab with TWO components:
  - Fullscript supplement dispensary (API integration block — flagged, wire later)
  - Peptide & therapy catalogue with "request info" flow (order or message, no phone call —
    per Emily: "get on a phone call about peptides... that's my nightmare"). Provider approves
    before anything is ordered.

## Mobile optimization (base.css)
- Added responsive layer: grids collapse to single column under 860px, nav burger under 920px,
  portal tabs horizontal-scroll, lab cards reflow, tighter gutters.

## STILL TODO (flagged, not done)
- Providers page uses FAKE providers (Dr. Lena Reyes etc.) — needs Emily's real team bios,
  credentials, licensure, headshots. This is the Phase 1 quick-win.
- Wire Fullscript API, peptide request → care-team message, booking → real calendar.
- Canonical-URL SEO fix, remove LocaliQ template remnants (Phase 2/3 per build checklist).

---

# Apple-minimal visual pass (v3)

Functional structure unchanged (compliance edits, portal IA all intact). Visual only.

## Design tokens (base.css)
- Palette → true neutrals: white + Apple systemGray6 (#F5F5F7), near-black ink (#1D1D1F)
  instead of navy, secondary/tertiary greys. Single accent blue (#0A6CFF).
- Mint demoted to FUNCTIONAL ONLY — success/optimal cues (lab status), not decoration.
- Typography → system font stack (SF on Apple devices), one family, tighter display tracking.
  Removed slab/grotesk font toggles.
- Added shadow scale (one soft tier) + consistent radii tokens (10/14/18/pill).

## Ornament removed
- All decorative gradient orbs / blur blobs (hero, CTA band, quiz, peptides, PageHero texture).
- Heavy navy drop shadows (0 20px 60px etc.) → single soft shadow tier.
- "§" section symbols stripped from every eyebrow.
- Eyebrows: mono-uppercase → quiet sans labels.
- Announcement bar, logo subtitle, treatment marquee: mono-uppercase → calm sentence-case sans.

## Result
- Card radii softened to 14px, consistent across portal + marketing pages.
- Reads like a modern health app / Apple Health surface. Mint only signals health status.
- Fully mobile-optimized (responsive layer from v2 retained + verified at 390px).

---

# Real logo integration (v4)

- Replaced placeholder SVG peak mark with the actual Elevate Health logo (gradient
  mountain + ELEVATE Health wordmark lockup).
- Source logo had a solid black background (RGB, no alpha) — knocked out to transparent
  so it sits cleanly on the light site. Trimmed + exported at retina res (244x144).
- Logo component now renders the image lockup + the "Hormones · Peptides · Longevity"
  tagline with a divider. Dropped the duplicate text wordmark (it's in the logo now).
- elevate_logo.png = color (nav + footer, both light surfaces).
- elevate_logo_white.png = white knockout, wired via inverse prop for any future dark surface.

---

# Telehealth-only correction (v5)

Client has NO physical location and won't for some time (if ever). Removed all
in-person / physical-location framing:
- Contact page: dropped "In-clinic / Brevard County, FL" row. Now: Booking (online only),
  Care model (100% telehealth), Availability (same-week, statewide Florida).
- Home hero eyebrow: "Est. — Brevard County, FL" → "Telehealth · Florida".
- Footer: "Brevard County · Florida" → "Telehealth · Florida".
- Portal mock appointment: "In-clinic" lab review → "Telehealth".
- Kept "self-pay clinic" / "our clinic" language (standard for telehealth practices,
  doesn't imply a building). Florida retained as licensure/service area.

---

# MedLabIQ clinical OS ported into the mock (v6)

ADDITIVE — nothing removed from the existing client portal. Layered the full
MedLabIQ three-portal clinical operating system into Emily's light theme.

## New: three-portal switcher (Patient / Provider / Clinic Admin)
Top-of-portal pill toggle. Patient view keeps ALL existing tabs (Dashboard, Labs,
Protocol, Education, Pharmacy, Messages, Payment) and ADDS two MedLabIQ tabs:
"Lab intelligence" (longitudinal trending) and "Plan of Care" (patient-facing).

## New: Provider view (the one-patient-view clinical OS)
- One patient view: chart header with Message / Order meds / Send notes all actionable
  from the record, patient state (FL) shown inline -> answers Emily's #1 complaint
  (context-switching) and the compound-pharmacy state lookup.
- Flag counts on the view (critical / watch / draws / last contact).
- Sub-tabs: Overview (live flags), Labs & charting (longitudinal trend charts, grouped
  by panel), Plan of Care (SOAP + auto-generated recommendations + export signed PDF),
  Medications (treatment plan, order from chart).

## New: Clinic Admin view
Roster of all patients, KPI tiles (total / active / critical flags / labs overdue),
search + status filter incl. Archived (Emily's "archive don't delete" ask), per-patient
provider / program / flags / status.

## Ported from MedLabIQ (namespaced MLQ_, light-themed)
- Marker definitions (MD), clinical rules engine (RULES + QS_RULES), demo lab dataset
  (6 draws), clinic roster (12 patients). Real logic: runLR/runQR fire live flags.
- Longitudinal trend chart rebuilt in light theme (green reference band, color-coded points).
- SOAP / Plan of Care = Emily's net-new "AI notetaker, SOAP, Plan of Care not from the 90s."

## Files changed
- NEW  mlq.jsx (data + rules + clinical components + provider/admin views)
- EDIT page-portal.jsx (3-portal switcher; patient gets 2 new MLQ tabs)
- EDIT base.css (portal switcher + roster mobile rules)
- EDIT Client Portal.html (loads mlq.jsx before page-portal.jsx)

All three portals verified mobile-optimized at 390px. Dark MedLabIQ -> light Elevate theme.

---

# Emily round-2 feedback applied (v7)

ADDITIVE. Four items from her 6/2 review:

1. TITRATION DOSING (correction, not add). Fixed refill-countdown doesn't model women's
   creams (testosterone/estradiol) adjusted constantly on side effects. Real problem: clinic
   doesn't know current dose unless patient calls back. Build: titrating meds tagged TITRATING,
   patient reports dose change the moment they make it -> captured to chart + next review, no
   callback. Fixed meds keep normal refill flow. Provider meds tab shows patient-reported
   dose-change log. Data-model impact - flagged for Greg.
2. WEIGHT TRACKER (add). Trend card on patient dashboard, GLP-1 oriented.
3. APPOINTMENTS history + future (add + dedup). New Appointments tab: upcoming + history, plus
   the cross-channel "already booked" banner - patient hit email + portal, both resolve to one
   appt, no double-booking. Staff coordination need she described.
4. INTAKE DUE BEFORE LAB REVIEW (keystone). Amber banner on dashboard: intake due before the
   review. This is the AI's INPUT pipeline - labs + intake land together so the provider walks in
   with the full picture. Provider Plan of Care notes it's auto-drafted from intake + labs.
   Ties to trigger system (flag intake due -> nudge patient).

Files changed: page-portal.jsx (protocol/titration, dashboard intake banner + weight, new
AppointmentsView), mlq.jsx (provider dose-change log, plan-of-care intake source note).
All verified mobile-optimized at 390px.
