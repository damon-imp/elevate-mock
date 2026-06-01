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
