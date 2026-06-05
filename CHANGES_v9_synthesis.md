# ELEVATE MOCK — v9 SYNTHESIS PASS
*OpFix · June 5, 2026 · built off the Portal Build Spec + OptiMantra provider-side documentation (Cycle 03)*

Folds the documented OptiMantra PROVIDER side + the cycle-02 net-new build items into the mock
for the next review-production-pass with Emily + team.

## CHANGED THIS PASS (now in the mock)
- **Provider Refills queue** (mlq.jsx): new "Refills" tab in the provider view — one consolidated
  queue with one owner, not blasted to all four providers. Status (Due / Needs review) + owner per row.
  Directly answers the call's refills-consolidation ask and the OptiMantra finding (no refill queue exists today).
- **AI notetaker on Plan of Care** (mlq.jsx): explicit "Generate from visit" action + copy clarifying the
  SOAP is generated from the visit transcript → pulls labs + intake → drafts Plan of Care → provider edits
  and signs (never auto-committed) → writes straight into the chart (kills the Freed.ai copy-paste problem).
- **Titration self-report** (already added v8, confirmed): patient-reported dose changes surface in the meds tab.
- **Education hub** (already 20 lessons from v8): unchanged this pass.

## STILL BACKEND DEV (specced, not a front-end mock affordance)
These are in the Portal Build Spec; the mock shows the UI intent, real build is dev work:
1. **Lab cadence engine** — cadence as a function of active plan, auto-reflag on plan change, overdue → task → outreach.
   (Admin view shows "labs due" count; the engine logic is backend.)
2. **Guide-on-delivery trigger** — fire education on med DELIVERY not order (+ pointer email). Backend trigger.
3. **Cash-pay lab ordering flow** — trigger → quote → patient approves in-portal → charge → slip. Backend + portal.
4. **Fullscript embed** — API in-portal checkout, auto-refill prominent (patient opt-in). Gated on Fullscript login.
5. **AI notetaker generation** — the actual transcript→SOAP model + chart write. Heaviest lift, Greg sign-off, human-in-loop.

## PROVIDER VIEW — now grounded in reality
Reconciled against the documented OptiMantra provider side (see elevate_optimantra_provider_documentation.docx):
- OptiMantra buries ~29 actions in a modal + ~18 in a dropdown → our provider view surfaces the ~8 used actions in-place.
- Patient tags (Monthly Program / Peptide Only / GLP-1 Only / Access Labs) carried as segments.
- Charting standardized to one flow (OptiMantra's is an inconsistent long form).
- Dropped long tail (Implantable Devices, Growth Chart, Form1500, Inventory) — irrelevant to cash-pay HRT telehealth.

## REVIEW FLOW
Re-push v9 → review with Emily + team → feedback → v10. Provider + patient views both demoable now.
