# ELEVATE MOCK — v10 (FULL REBUILD against documented OptiMantra + MedLabIQ)
*OpFix · June 5, 2026 · Cycle 03 rework*

## Why v10
v9 documented OptiMantra thoroughly but the documentation didn't actually reshape the mock
(only 3 cosmetic edits). v10 fixes that: the EHR documentation + MedLabIQ reference are now
implemented INTO the provider and admin views, not just written up in the spec.

## WHAT CHANGED (provider view — mlq.jsx)
1. **Actions-in-place** replaces OptiMantra's buried 29-action modal + 18-item dropdown.
   The 8 actions Elevate actually uses (Profile, Charting, eRx, Labs, Fullscript, Messages,
   Superbill, Video) sit on the patient record. Stated explicitly as the anti-pattern fix,
   with a note that the long tail (Form 1500, implantable devices, growth chart, inventory)
   was dropped as irrelevant to cash-pay HRT telehealth.
2. **Overview tab rebuilt** to map OptiMantra's actual dashboard cards into one clean view:
   Clinical Profile, Diagnoses, Health Maintenance (cadence), Lab Results Under Watch (pulled
   from the lab engine), Open Tasks/Orders — then the existing flags/recommendations engine.
3. **Fullscript embed + cash-pay lab ordering** added as real UI in the meds tab (both are
   native OptiMantra features Elevate uses today; rebuilt in-portal). Cash-pay flow shown as
   quote -> patient approves -> charged -> slip auto-sent.
4. Kept the v9 additions: Refills queue (consolidation), AI-notetaker Generate-from-visit,
   patient-reported titration dose changes.

## WHAT CHANGED (admin view — mlq.jsx)
5. **Real Elevate segmentation** drives the roster now. Patient data rewritten with the
   documented tags: **Monthly Program / GLP-1 Only / Peptide Only / Access Labs** (was generic
   TRT/HRT). Provider names corrected to the real team (Jennifer Knapp APRN, Tara Bradstreet).
6. **Program-segment filter** added (filter roster by Monthly Program / GLP-1 Only / Peptide
   Only / Access Labs) — mirrors how the clinic actually thinks about its book.
7. **Roster rows** now show the real tags and a **labs-overdue -> Remind** outreach action
   (was a static flag count) — drives the cadence/outreach loop.

## STILL BACKEND DEV (UI intent shown; real build is dev work)
- Lab cadence ENGINE logic (auto-reflag on plan change) — Health Maintenance card shows cadence,
  engine is backend.
- Guide-on-delivery trigger (fire education on med delivery).
- AI notetaker GENERATION model (transcript -> SOAP -> chart write) — affordance shown.
- Fullscript API embed + cash-pay charge rails — UI shown, integration is dev.

## VALIDATION
All JSX babel-parsed clean (mlq.jsx, page-portal.jsx, data.jsx). Provider + admin + patient
views all demoable. Review with Emily + team -> v11.

## ADDED (v10.1 — flagged call requirements that were missing)
8. **Provider notes section** (charting tab): expandable, full-width encounter-note editor
   (Follow-up / Initial consult / Basic note types) with Save draft + Sign & lock, a
   "Generate from visit" AI hook, and a team-visible prior-notes thread with authorship
   (Jennifer Knapp APRN, Tara Bradstreet). Replaces OptiMantra's tiny notes box — explicit call ask.
9. **Practice-wide audit log** (admin view): HIPAA "log everything, every action" trail —
   When / User / Action / Record, covering record access, eRx, messages/email/text/fax, edits,
   note sign-locks, logins. Filterable by action type, exportable, immutable. Explicit call ask
   + HIPAA requirement. (MedLabIQ has audit; OptiMantra's Timeline was the analog — now built in.)
