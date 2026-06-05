# ELEVATE MOCK — v8 SYNTHESIS PASS
*OpFix · June 5, 2026 · built off the Portal Build Spec (Cycle 02)*

This pass folds the 6/5 call requirements + MedLabIQ reference + OptiMantra documentation
into the live mock for the next review-production-pass cycle with Emily + team.

## CHANGED THIS PASS (in the mock now)
- **Education hub** (page-portal.jsx → EducationView): expanded from 8 placeholder guides
  to the real 20-lesson library — Modules 1–3 (expectations, follow-the-plan, sleep/energy),
  Module 7 (per-medication: T for women/men, thyroid, GLP-1s, peptides, sleep peptides, DHEA,
  NAD+, LDN), Module 8 (REACTIONS — the histamine-response lesson Emily asked for, common
  side effects, "it's not working" troubleshooting). Matches the Education Library docs.
- **Titration self-report** (page-portal.jsx → Quick actions): added "Report dose change"
  action — the patient-reports-new-dose feature (data-model change flagged for Greg; titrating
  creams need patient-reported dose, not fixed refill countdown).

## STILL TO BUILD (next dev pass — not clean array edits, need real component work)
These are specced in the Portal Build Spec but need deeper build than this pass:
1. **Refills consolidation** — one folder / one owner / dedicated workflow (provider view).
   Mock has refills (12 refs) but not the consolidated single-queue model yet.
2. **Lab cadence engine** — cadence as a function of active plan, auto-reflag on plan change,
   overdue → task → outreach loop (admin view).
3. **Guide-on-delivery trigger** — fire education on med DELIVERY not order (+ pointer email).
4. **AI notetaker / SOAP / Plan of Care** — mlq.jsx has the SOAP boxes; needs the generation
   layer (transcript → SOAP → pull labs → draft Plan of Care, human-in-loop). Heaviest lift.
5. **Cash-pay lab ordering flow** — trigger → quote → patient approves → charge → slip.
6. **Fullscript embed** — API in-portal checkout, auto-refill prominent (patient opt-in,
   not forced — per research). Mock references Fullscript (3x); needs the real embed.
7. **Provider view confirm** — reconcile against OptiMantra provider login when Emily provides
   it (provider side not yet documented).

## REVIEW FLOW
Re-push this mock → review with Emily + team → collect feedback → next pass.
Patient view is the review focus (it's what Emily + team see). Provider/admin confirm
against OptiMantra provider docs once available.
