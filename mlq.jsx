// ===== MedLabIQ data + rules (ported, namespaced) =====
const MLQ_MD={
  "Hematocrit":{u:"%",lo:37.5,hi:51.0,c:"CBC"},"Hemoglobin":{u:"g/dL",lo:13.0,hi:17.7,c:"CBC"},"RBC":{u:"x10E6/uL",lo:4.14,hi:5.80,c:"CBC"},"MCV":{u:"fL",lo:79,hi:97,c:"CBC"},"WBC":{u:"x10E3/uL",lo:3.4,hi:10.8,c:"CBC"},"Platelets":{u:"x10E3/uL",lo:150,hi:379,c:"CBC"},"Eosinophils %":{u:"%",lo:0,hi:5,c:"CBC"},
  "ALT":{u:"IU/L",lo:0,hi:50,c:"MET"},"AST":{u:"IU/L",lo:0,hi:40,c:"MET"},"Glucose":{u:"mg/dL",lo:65,hi:99,c:"MET"},"eGFR":{u:"mL/min",lo:60,hi:999,c:"MET"},"HbA1c":{u:"%",lo:4.0,hi:5.6,c:"MET"},"Fasting Insulin":{u:"uIU/mL",lo:2.6,hi:24.9,c:"MET"},
  "Total Cholesterol":{u:"mg/dL",lo:100,hi:199,c:"LIP"},"LDL":{u:"mg/dL",lo:0,hi:129,c:"LIP"},"HDL":{u:"mg/dL",lo:40,hi:999,c:"LIP"},"Triglycerides":{u:"mg/dL",lo:0,hi:149,c:"LIP"},"VLDL":{u:"mg/dL",lo:5,hi:40,c:"LIP"},
  "Total Testosterone":{u:"ng/dL",lo:264,hi:916,c:"HOR"},"Free Testosterone":{u:"pg/mL",lo:8.7,hi:25.1,c:"HOR"},"SHBG":{u:"nmol/L",lo:16.5,hi:55.9,c:"HOR"},"Estradiol":{u:"pg/mL",lo:7.6,hi:42.6,c:"HOR"},"Estrone":{u:"pg/mL",lo:0,hi:68,c:"HOR"},"DHEA-S":{u:"ug/dL",lo:138.5,hi:475.2,c:"HOR"},"IGF-1":{u:"ng/mL",lo:95,hi:290,c:"HOR"},"Prolactin":{u:"ng/mL",lo:3.9,hi:22.7,c:"HOR"},"PSA":{u:"ng/mL",lo:0,hi:4.0,c:"HOR"},"Cortisol AM":{u:"ug/dL",lo:6.2,hi:19.4,c:"HOR"},"Progesterone":{u:"ng/mL",lo:0,hi:0.5,c:"HOR"},
  "TSH":{u:"uIU/mL",lo:0.45,hi:4.5,c:"THY"},"Free T3":{u:"pg/mL",lo:2.0,hi:4.4,c:"THY"},"Total T4":{u:"ug/dL",lo:4.5,hi:12.0,c:"THY"},"Reverse T3":{u:"ng/dL",lo:9.2,hi:24.1,c:"THY"},
  "Ferritin":{u:"ng/mL",lo:30,hi:400,c:"IRN"},
  "Vitamin D":{u:"ng/mL",lo:30,hi:100,c:"VIT"},"B12":{u:"pg/mL",lo:232,hi:1245,c:"VIT"},
};

const MLQ_RULES=[
  {m:"Hematocrit",fn:v=>{const r=v.filter(x=>x!=null).slice(-2);return r.length>=2&&r.every(x=>x>51);},s:"critical",t:"Hematocrit elevated consecutive draws. Therapeutic phlebotomy. Evaluate testosterone dose."},
  {m:"ALT",fn:v=>{const s=v.filter(x=>x!=null);if(s.length<2)return false;return s[s.length-1]>s[s.length-2]&&s[s.length-1]>50;},s:"critical",t:"ALT trending up above reference. Abdominal ultrasound. Audit liver-metabolized supplements."},
  {m:"LDL",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>=160;},s:"critical",t:"LDL high-risk (160+). Dietary intervention. Consider ApoB/Lp(a) testing."},
  {m:"Hemoglobin",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>17.7;},s:"warning",t:"Hemoglobin above reference. Correlates with hematocrit."},
  {m:"MCV",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>97;},s:"warning",t:"MCV elevated (macrocytosis). Check B12/folate."},
  {m:"Eosinophils %",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>5;},s:"info",t:"Eosinophils trending up. Consider allergy panel."},
  {m:"HDL",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l<40;},s:"warning",t:"HDL below protective threshold. Omega-3, aerobic exercise, niacin."},
  {m:"Triglycerides",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>150;},s:"warning",t:"Triglycerides elevated. Verify fasting. Reduce refined carbs."},
  {m:"Ferritin",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>400;},s:"critical",t:"Ferritin above reference. Therapeutic phlebotomy."},
  {m:"Vitamin D",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l<30;},s:"warning",t:"Vitamin D insufficient. Supplement 5-10K IU daily."},
  {m:"Free Testosterone",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l<10;},s:"warning",t:"Free T below optimal. Evaluate SHBG and protocol."},
  {m:"Estradiol",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>42.6;},s:"warning",t:"Estradiol elevated. Consider AI adjustment."},
  {m:"IGF-1",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>290;},s:"info",t:"IGF-1 above range. Monitor GH/peptide dose."},
  {m:"Prolactin",fn:v=>{const l=v.filter(x=>x!=null).slice(-1)[0];return l&&l>20;},s:"info",t:"Prolactin upper range. If trending up, pituitary MRI."},
];

const MLQ_QS_RULES=[
  {check:(a,v)=>a.energy<=2&&v["Vitamin D"]&&v["Vitamin D"].filter(x=>x!=null).slice(-1)[0]<30,sev:"warning",rec:"Low energy + Vitamin D insufficient. Supplement 5-10K IU/day."},
  {check:(a,v)=>a.energy<=2&&v["Free Testosterone"]&&v["Free Testosterone"].filter(x=>x!=null).slice(-1)[0]<15,sev:"warning",rec:"Low energy + Free T low-normal. Optimize protocol."},
  {check:(a,v)=>a.hydration<=2&&v["Hematocrit"]&&v["Hematocrit"].filter(x=>x!=null).slice(-1)[0]>51,sev:"warning",rec:"Poor hydration + elevated hematocrit. Mandate 100+ oz water daily and retest BEFORE further interventions."},
  {check:(a,v)=>a.libido<=2&&v["Free Testosterone"]&&v["Free Testosterone"].filter(x=>x!=null).slice(-1)[0]<15,sev:"warning",rec:"Low libido + Free T low-normal. Primary driver. Optimize."},
  {check:(a,v)=>a.exercise<=1&&v["HDL"]&&v["HDL"].filter(x=>x!=null).slice(-1)[0]<40,sev:"warning",rec:"No exercise + HDL low. Aerobic exercise is #1 for raising HDL. 150+ min/week."},
  {check:(a,v)=>a.digestion<=2&&v["ALT"]&&v["ALT"].filter(x=>x!=null).slice(-1)[0]>40,sev:"info",rec:"Poor digestion + ALT elevated. Liver stress contributing. Audit supplements."},
];

const MLQ_DEMO={patient:{name:"John Doe",dob:"01/15/1985",id:"EH-JD001"},draws:[{date:"Nov 2024",lab:"Labcorp",fasting:true},{date:"Jan 2025",lab:"Labcorp",fasting:true},{date:"Jun 2025",lab:"Labcorp",fasting:true},{date:"Oct 2025",lab:"Quest",fasting:true},{date:"Dec 2025",lab:"Labcorp",fasting:true},{date:"Mar 2026",lab:"Labcorp",fasting:false}],values:{"Hematocrit":[57.3,54.6,null,48.9,51.1,56.1],"Hemoglobin":[19.0,18.6,null,16.2,16.9,17.8],"RBC":[5.82,5.70,null,4.95,5.07,5.59],"MCV":[99,96,null,102,101,100],"WBC":[5.9,6.9,10.1,7.4,6.1,4.6],"Platelets":[227,256,229,187,322,253],"Eosinophils %":[2,null,null,null,null,9],"ALT":[null,39,18,50,44,65],"AST":[null,39,16,36,null,31],"Glucose":[null,79,86,61,null,75],"eGFR":[null,119,116,121,null,118],"Total Cholesterol":[null,184,null,236,218,null],"LDL":[null,139,null,149,null,167],"HDL":[null,28,null,18,null,34],"Triglycerides":[null,89,null,369,null,91],"VLDL":[null,null,null,69,null,null],"Total Testosterone":[null,1500,null,483,1288,601],"Free Testosterone":[null,44.4,null,20.8,null,11.9],"SHBG":[null,null,null,7.8,35.0,36.6],"Estradiol":[null,74.8,null,28.6,null,30.5],"Estrone":[null,null,null,96,null,21],"DHEA-S":[227.1,null,null,247.0,null,null],"IGF-1":[303,null,null,322,null,null],"Prolactin":[18.2,null,null,22.3,null,null],"PSA":[0.3,null,null,0.4,null,null],"Cortisol AM":[21,null,null,15.4,null,null],"Progesterone":[0.5,null,null,0.2,null,null],"TSH":[1.18,null,null,1.56,null,0.607],"Free T3":[3.7,null,null,3.3,null,3.3],"Total T4":[null,null,null,null,null,6.1],"Reverse T3":[null,null,null,18.6,null,11.5],"Ferritin":[null,907,402,1167,313,311],"Vitamin D":[40.9,null,null,22.1,null,null],"B12":[843,null,null,907,null,null],"HbA1c":[4.8,null,null,5.0,null,null],"Fasting Insulin":[4.5,null,null,6.6,null,null]},
  questionnaire:[{date:"Oct 2025",answers:{sleep:3,energy:2,libido:2,mood:3,hydration:2,brain_fog:4,joint_pain:2,digestion:3,stress:4,exercise:2}},{date:"Mar 2026",answers:{sleep:4,energy:3,libido:3,mood:4,hydration:3,brain_fog:2,joint_pain:2,digestion:4,stress:3,exercise:3}}],
  timeline:[{date:"Nov 2024",notes:"Baseline. Hematocrit 57.3% (HIGH). Hemoglobin 19.0 (HIGH). Vitamin D 40.9. IGF-1 303 (above range). Cortisol 21 (elevated)."},{date:"Jan 2025",notes:"Testosterone 1500 (supraphysiologic). Estradiol 74.8 (HIGH). Free T 44.4. ALT/AST 39. Ferritin 907 (HIGH). HDL 28 (LOW)."},{date:"Jun 2025",notes:"Ferritin dropping to 402. ALT improved to 18. Limited panel."},{date:"Oct 2025",notes:"LIPID CRISIS: Trigs 369, HDL 18, VLDL 69. Ferritin peaked 1167. SHBG 7.8 (suppressed). Vitamin D 22.1 (LOW)."},{date:"Dec 2025",notes:"Recovery. Ferritin normalized 313. SHBG 35.0. Testosterone 1288."},{date:"Mar 2026",notes:"Current. Hematocrit 56.1% (CRITICAL). ALT 65 (highest, trending up). LDL 167 (high risk). Trigs corrected 91. HDL 34 (improving). SHBG 36.6. Estradiol 30.5 (normal). TSH 0.607. T 601. Free T 11.9 (low-normal). Non-fasting."}]
};

const MLQ_PATIENTS=[
  {id:"EH-JD001",name:"John Doe",dob:"01/15/1985",gender:"M",phone:"(503) 555-0147",email:"john.doe@email.com",lastDraw:"Mar 2026",draws:6,critFlags:3,warnFlags:4,status:"active",provider:"Dr. Sarah Chen",labsDue:false,planStatus:"signed",lastVisit:"Mar 15, 2026",tags:["TRT","Monthly"],program:"Monthly HRT",referral:"Google",joinDate:"Nov 2024"},
  {id:"EH-SM002",name:"Sarah Mitchell",dob:"06/22/1978",gender:"F",phone:"(503) 555-0293",email:"sarah.m@email.com",lastDraw:"Mar 2026",draws:4,critFlags:0,warnFlags:2,status:"active",provider:"Dr. Sarah Chen",labsDue:true,planStatus:"draft",lastVisit:"Mar 20, 2026",tags:["HRT","Monthly"],program:"Monthly HRT",referral:"Referral - Dr. Adams",joinDate:"Jun 2025"},
  {id:"EH-RJ003",name:"Robert James",dob:"11/03/1990",gender:"M",phone:"(971) 555-0384",email:"r.james@email.com",lastDraw:"Feb 2026",draws:3,critFlags:1,warnFlags:1,status:"active",provider:"Dr. James Ward",labsDue:true,planStatus:"signed",lastVisit:"Feb 10, 2026",tags:["TRT","GLP-1"],program:"Monthly HRT + GLP-1",referral:"Instagram",joinDate:"Sep 2025"},
  {id:"EH-LW004",name:"Linda Watson",dob:"09/14/1972",gender:"F",phone:"(503) 555-0412",email:"linda.w@email.com",lastDraw:"Jan 2026",draws:5,critFlags:0,warnFlags:0,status:"active",provider:"Dr. James Ward",labsDue:true,planStatus:"signed",lastVisit:"Jan 25, 2026",tags:["HRT","Peptides"],program:"Monthly HRT",referral:"Referral - Patient",joinDate:"Mar 2024"},
  {id:"EH-MC005",name:"Michael Chen",dob:"03/30/1988",gender:"M",phone:"(971) 555-0528",email:"m.chen@email.com",lastDraw:"Mar 2026",draws:2,critFlags:2,warnFlags:3,status:"active",provider:"Dr. Sarah Chen",labsDue:false,planStatus:"draft",lastVisit:"Mar 28, 2026",tags:["TRT"],program:"Monthly HRT",referral:"Google",joinDate:"Feb 2026"},
  {id:"EH-AP006",name:"Angela Perez",dob:"12/05/1983",gender:"F",phone:"(503) 555-0637",email:"a.perez@email.com",lastDraw:"Dec 2025",draws:3,critFlags:0,warnFlags:1,status:"active",provider:"Dr. James Ward",labsDue:true,planStatus:"none",lastVisit:"Dec 18, 2025",tags:["HRT"],program:"Monthly HRT",referral:"Facebook",joinDate:"Aug 2025"},
  {id:"EH-TK007",name:"Thomas Kim",dob:"07/19/1975",gender:"M",phone:"(503) 555-0741",email:"t.kim@email.com",lastDraw:"Mar 2026",draws:7,critFlags:0,warnFlags:0,status:"active",provider:"Dr. Sarah Chen",labsDue:false,planStatus:"signed",lastVisit:"Apr 1, 2026",tags:["TRT","Monthly","Peptides"],program:"Monthly HRT + Peptides",referral:"Referral - Patient",joinDate:"Jan 2024"},
  {id:"EH-JB008",name:"Jennifer Brooks",dob:"04/11/1991",gender:"F",phone:"(971) 555-0856",email:"j.brooks@email.com",lastDraw:"Nov 2025",draws:2,critFlags:1,warnFlags:2,status:"inactive",provider:"Dr. James Ward",labsDue:true,planStatus:"none",lastVisit:"Nov 5, 2025",tags:["Cancelled"],program:"None",referral:"Google",joinDate:"Sep 2025"},
  {id:"EH-DW009",name:"David Wilson",dob:"08/27/1969",gender:"M",phone:"(503) 555-0963",email:"d.wilson@email.com",lastDraw:"Feb 2026",draws:4,critFlags:1,warnFlags:3,status:"active",provider:"Dr. Sarah Chen",labsDue:true,planStatus:"draft",lastVisit:"Feb 22, 2026",tags:["TRT","Cash Pay Labs"],program:"Monthly HRT",referral:"Podcast",joinDate:"Jul 2025"},
  {id:"EH-KR010",name:"Karen Rodriguez",dob:"01/08/1980",gender:"F",phone:"(971) 555-1074",email:"k.rod@email.com",lastDraw:"Mar 2026",draws:3,critFlags:0,warnFlags:1,status:"active",provider:"Dr. James Ward",labsDue:false,planStatus:"signed",lastVisit:"Mar 30, 2026",tags:["HRT","Monthly"],program:"Monthly HRT",referral:"Referral - Coach",joinDate:"Dec 2025"},
  {id:"EH-BT011",name:"Brian Taylor",dob:"05/16/1986",gender:"M",phone:"(503) 555-1185",email:"b.taylor@email.com",lastDraw:"Jan 2026",draws:2,critFlags:0,warnFlags:2,status:"active",provider:"Dr. Sarah Chen",labsDue:true,planStatus:"none",lastVisit:"Jan 14, 2026",tags:["TRT","GLP-1","Cash Pay Labs"],program:"Monthly HRT + GLP-1",referral:"Instagram",joinDate:"Dec 2025"},
  {id:"EH-NL012",name:"Nicole Lee",dob:"10/29/1994",gender:"F",phone:"(971) 555-1296",email:"n.lee@email.com",lastDraw:"Mar 2026",draws:4,critFlags:0,warnFlags:0,status:"active",provider:"Dr. James Ward",labsDue:false,planStatus:"signed",lastVisit:"Apr 5, 2026",tags:["HRT","Peptides","Monthly"],program:"Monthly HRT + Peptides",referral:"TikTok",joinDate:"Apr 2025"},
];

const MLQ_st=(v,m)=>{const d=MLQ_MD[m];if(!d||v==null)return"none";if(v<d.lo)return"low";if(v>d.hi)return"high";return"ok";};
const MLQ_tr=(vals)=>{const v=vals.filter(x=>x!=null);if(v.length<2)return"flat";const p=((v[v.length-1]-v[v.length-2])/Math.abs(v[v.length-2]||1))*100;return p>5?"up":p<-5?"dn":"flat";};
function MLQ_runLR(d){const o=[];for(const r of MLQ_RULES){const mv=d.values[r.m];if(!mv)continue;try{if(r.fn(mv))o.push({marker:r.m,sev:r.s,rec:r.t});}catch(e){}}o.sort((a,b)=>({critical:0,warning:1,info:2}[a.sev])-({critical:0,warning:1,info:2}[b.sev]));return o;}
function MLQ_runQR(qs,vals){if(!qs?.length)return[];const a=qs[qs.length-1].answers;const o=[];for(const r of MLQ_QS_RULES){try{if(r.check(a,vals))o.push({sev:r.sev,rec:r.rec});}catch(e){}}return o;}

// ── MARKER CARD ──// ===== MedLabIQ clinical components — Elevate light theme =====
// Depends on MLQ_MD, MLQ_RULES, MLQ_QS_RULES, MLQ_DEMO, MLQ_PATIENTS,
// MLQ_st, MLQ_tr, MLQ_runLR, MLQ_runQR (defined in core block above).
// Uses Elevate CSS vars: --blue, --mint, --ink, --ink-soft, --rule, --bg-2, etc.

const MLQ_sev = {
  critical: { c: "var(--red, #E5484D)", t: "var(--red, #E5484D)", bg: "#FDECEC", label: "Critical" },
  warning:  { c: "var(--amber, #B7791F)", t: "#8A5A00", bg: "#FCF3E6", label: "Watch" },
  info:     { c: "var(--blue)", t: "var(--blue)", bg: "var(--blue-tint)", label: "Info" },
};

// ── Longitudinal trend chart (light) ──
function MLQChart({ marker, values, draws }) {
  const d = MLQ_MD[marker]; if (!d) return null;
  const W = 520, H = 150, pad = { l: 38, r: 14, t: 14, b: 22 };
  const pts = values.map((v, i) => ({ v, i })).filter(p => p.v != null);
  if (pts.length === 0) return null;
  const vals = pts.map(p => p.v);
  let lo = Math.min(d.lo, ...vals), hi = Math.max(d.hi, ...vals);
  const span = (hi - lo) || 1; lo -= span * 0.12; hi += span * 0.12;
  const x = i => pad.l + (i / Math.max(1, values.length - 1)) * (W - pad.l - pad.r);
  const y = v => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const line = pts.map((p, k) => `${k === 0 ? "M" : "L"}${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
  const inRange = (yv) => y(yv);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* reference band */}
      <rect x={pad.l} y={inRange(d.hi)} width={W - pad.l - pad.r} height={Math.max(0, inRange(d.lo) - inRange(d.hi))}
        fill="var(--mint-tint)" opacity="0.55" />
      <line x1={pad.l} y1={inRange(d.hi)} x2={W - pad.r} y2={inRange(d.hi)} stroke="var(--rule)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={pad.l} y1={inRange(d.lo)} x2={W - pad.r} y2={inRange(d.lo)} stroke="var(--rule)" strokeWidth="1" strokeDasharray="3 3" />
      <path d={line} fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, k) => {
        const s = MLQ_st(p.v, marker);
        const col = s === "ok" ? "var(--mint-2)" : s === "high" ? "var(--red,#E5484D)" : "var(--amber,#B7791F)";
        return <circle key={k} cx={x(p.i)} cy={y(p.v)} r="3.5" fill={col} stroke="#fff" strokeWidth="1.5" />;
      })}
      {draws.map((dr, i) => (
        <text key={i} x={x(i)} y={H - 6} fontSize="8" fill="var(--ink-mute)" textAnchor="middle" fontFamily="var(--mono)">{dr.date}</text>
      ))}
      <text x={pad.l - 6} y={inRange(d.hi) + 3} fontSize="8" fill="var(--ink-mute)" textAnchor="end" fontFamily="var(--mono)">{d.hi}</text>
      <text x={pad.l - 6} y={inRange(d.lo) + 3} fontSize="8" fill="var(--ink-mute)" textAnchor="end" fontFamily="var(--mono)">{d.lo}</text>
    </svg>
  );
}

// ── Marker card (light) ──
function MLQMarkerCard({ marker, values, draws, open, onToggle }) {
  const d = MLQ_MD[marker]; if (!d) return null;
  const vv = values.filter(v => v != null); if (!vv.length) return null;
  const last = vv[vv.length - 1];
  const s = MLQ_st(last, marker), t = MLQ_tr(values);
  const col = s === "ok" ? "var(--mint-2)" : s === "high" ? "var(--red,#E5484D)" : "var(--amber,#B7791F)";
  const arrow = t === "up" ? "↑" : t === "dn" ? "↓" : "→";
  return (
    <div style={{ border: "1px solid var(--rule)", borderRadius: 14, background: "var(--bg)", overflow: "hidden" }}>
      <button onClick={onToggle} style={{
        appearance: "none", width: "100%", textAlign: "left", cursor: "pointer",
        background: "transparent", border: "none", padding: "16px 18px",
        display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "center", fontFamily: "var(--sans)",
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{marker}</div>
          <div style={{ fontSize: 12, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{d.c} · {vv.length} draws</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: col, fontFamily: "var(--mono)" }}>{last}<span style={{ fontSize: 11, color: "var(--ink-mute)" }}> {d.u}</span></div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{arrow} {s === "ok" ? "in range" : s}</div>
        </div>
        <div style={{ color: "var(--ink-mute)", fontSize: 14, transform: open ? "rotate(90deg)" : "none", transition: "transform 150ms" }}>›</div>
      </button>
      {open && <div style={{ padding: "0 18px 16px", borderTop: "1px solid var(--rule-soft)" }}>
        <MLQChart marker={marker} values={values} draws={draws} />
      </div>}
    </div>
  );
}

// ── Flags / recommendations panel ──
function MLQFlags({ flags }) {
  if (!flags.length) return (
    <div style={{ padding: 20, textAlign: "center", color: "var(--ink-soft)", fontSize: 14 }}>No active flags. All markers within expected ranges.</div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {flags.map((f, i) => {
        const sv = MLQ_sev[f.sev] || MLQ_sev.info;
        return (
          <div key={i} style={{ display: "flex", gap: 12, padding: "14px 16px", background: sv.bg, borderRadius: 12, border: `1px solid ${sv.c}22` }}>
            <div style={{ flexShrink: 0, alignSelf: "flex-start", fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: sv.t, background: "#fff", padding: "3px 8px", borderRadius: 6, border: `1px solid ${sv.c}33` }}>{sv.label}</div>
            <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>
              {f.marker && <span style={{ fontWeight: 600 }}>{f.marker}: </span>}
              {f.rec}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── SOAP / Plan of Care (the net-new Emily asked for) ──
function MLQPlanOfCare({ patient, flags }) {
  const crit = flags.filter(f => f.sev === "critical");
  const warn = flags.filter(f => f.sev === "warning");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)" }}>Plan of Care</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>{patient.name}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={MLQ_ghostBtn}>Edit</button>
          <button style={MLQ_primBtn}>Export signed PDF</button>
        </div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--ink-soft)", background: "var(--bg-2)", padding: "10px 14px", borderRadius: 10, lineHeight: 1.5 }}>
        Auto-drafted from the patient's pre-review intake (submitted Jun 10) + the labs below. Provider edits and signs. Patient-facing version generated in plain language.
      </div>
      {[
        { k: "S", label: "Subjective", body: "Patient reports persistent low energy and difficulty with recovery despite current protocol adherence. Sleep quality variable." },
        { k: "O", label: "Objective", body: crit.length ? `${crit.length} critical flag(s), ${warn.length} to watch. Key findings below.` : "Markers largely within range; trends reviewed across draws." },
        { k: "A", label: "Assessment", body: "Hormone optimization in progress. Lab-driven adjustments indicated per flagged markers. No contraindications identified in current regimen." },
        { k: "P", label: "Plan", body: "Adjust per recommendations below. Re-draw on protocol cadence. Patient-facing summary generated automatically." },
      ].map(s => (
        <div key={s.k} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 14, alignItems: "start" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-tint)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 17 }}>{s.k}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.55 }}>{s.body}</div>
          </div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", marginBottom: 10 }}>Recommendations (auto-generated from flags)</div>
        <MLQFlags flags={flags} />
      </div>
    </div>
  );
}

// ── Treatment plan builder (compact) ──
function MLQTreatmentPlan() {
  const items = [
    { rx: "Testosterone Cypionate", dose: "100mg / 0.5mL", freq: "Twice weekly", next: "Refill Aug 12" },
    { rx: "Anastrozole", dose: "0.25mg", freq: "Twice weekly", next: "Refill Aug 12" },
    { rx: "Vitamin D3", dose: "5,000 IU", freq: "Daily", next: "OTC" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 14, padding: "14px 0", borderTop: i ? "1px solid var(--rule)" : "none", alignItems: "center", fontSize: 13.5 }}>
          <div style={{ fontWeight: 600, color: "var(--ink)" }}>{it.rx}</div>
          <div style={{ color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>{it.dose}</div>
          <div style={{ color: "var(--ink-soft)" }}>{it.freq}</div>
          <div style={{ fontSize: 11, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{it.next}</div>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-mute)" }}>Interactions checked in real time. No contraindicated pairs.</div>
    </div>
  );
}

const MLQ_primBtn = { appearance: "none", border: "none", background: "var(--blue)", color: "#fff", fontFamily: "var(--sans)", fontWeight: 500, fontSize: 13, padding: "9px 16px", borderRadius: 980, cursor: "pointer" };
const MLQ_ghostBtn = { appearance: "none", border: "1px solid var(--rule)", background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--sans)", fontWeight: 500, fontSize: 13, padding: "9px 16px", borderRadius: 980, cursor: "pointer" };
// ===== Provider view (one-patient-view clinical OS) + Clinic Admin =====

function MLQProviderView() {
  const data = MLQ_DEMO;
  const [exp, setExp] = React.useState(new Set(["Hematocrit", "Total Testosterone", "ALT"]));
  const [sub, setSub] = React.useState("overview"); // overview | charting | plan | meds
  const lr = MLQ_runLR(data);
  const qr = MLQ_runQR(data.questionnaire, data.values);
  const flags = [...lr, ...qr];
  const crit = flags.filter(f => f.sev === "critical").length;
  const warn = flags.filter(f => f.sev === "warning").length;
  const toggle = m => { const n = new Set(exp); n.has(m) ? n.delete(m) : n.add(m); setExp(n); };
  // group markers by category
  const cats = {};
  for (const [m, v] of Object.entries(data.values)) {
    const d = MLQ_MD[m]; if (!d) continue;
    if (v.some(x => x != null)) { (cats[d.c] = cats[d.c] || []).push(m); }
  }
  const subTabs = [
    { id: "overview", label: "Overview" },
    { id: "charting", label: "Labs & charting" },
    { id: "plan", label: "Plan of Care" },
    { id: "meds", label: "Medications" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ONE PATIENT VIEW header — everything actionable, no navigating away */}
      <div className="appt-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", padding: "20px 22px", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 16, boxShadow: "var(--shadow)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--blue-tint)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>JD</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)" }}>Patient chart</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>{data.patient.name}</div>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>DOB {data.patient.dob} · {data.patient.id} · <span style={{ color: "var(--ink)" }}>FL</span> · Monthly HRT</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={MLQ_ghostBtn}>Message</button>
          <button style={MLQ_ghostBtn}>Order meds</button>
          <button style={MLQ_primBtn}>Send notes</button>
        </div>
      </div>

      {/* quick flag counts + last comms, on the view */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="lab-grid">
        {[
          { n: crit, l: "Critical flags", c: "var(--red,#E5484D)" },
          { n: warn, l: "To watch", c: "var(--amber,#B7791F)" },
          { n: data.draws.length, l: "Lab draws", c: "var(--ink)" },
          { n: "Mar 15", l: "Last contact", c: "var(--ink)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", borderRadius: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* sub-tabs */}
      <div className="portal-tabs" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--rule)" }}>
        {subTabs.map(tb => {
          const on = sub === tb.id;
          return <button key={tb.id} onClick={() => setSub(tb.id)} style={{
            appearance: "none", background: "transparent", border: "none", cursor: "pointer",
            padding: "12px 14px", fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: on ? 600 : 500,
            color: on ? "var(--blue)" : "var(--ink-soft)", borderBottom: on ? "2px solid var(--blue)" : "2px solid transparent", marginBottom: -1,
          }}>{tb.label}</button>;
        })}
      </div>

      {sub === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Active flags & recommendations</div>
          <MLQFlags flags={flags} />
        </div>
      )}
      {sub === "charting" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Every marker, trended across {data.draws.length} draws. Click to expand. Notes-to-patient sent inline — no click-out.</div>
          {Object.entries(cats).map(([cat, ms]) => (
            <div key={cat}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.04em", margin: "6px 0 10px" }}>{cat}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ms.map(m => <MLQMarkerCard key={m} marker={m} values={data.values[m]} draws={data.draws} open={exp.has(m)} onToggle={() => toggle(m)} />)}
              </div>
            </div>
          ))}
        </div>
      )}
      {sub === "plan" && <MLQPlanOfCare patient={data.patient} flags={flags} />}
      {sub === "meds" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Treatment plan</div>
            <button style={MLQ_primBtn}>Order from chart</button>
          </div>
          <MLQTreatmentPlan />
          <div style={{ marginTop: 18, padding: 16, background: "var(--blue-tint)", borderRadius: 12, border: "1px solid rgba(31,102,255,0.18)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)", marginBottom: 8 }}>Patient-reported dose changes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 13.5, color: "var(--ink)" }}><span style={{ fontWeight: 600 }}>Estradiol cream</span> - patient reported <span style={{ fontFamily: "var(--mono)" }}>0.5 mL twice daily</span> on Jun 3 (was 0.25 mL). Self-adjusted for symptom relief.</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Titrating meds update here the moment the patient reports them - no waiting for a callback. Captured into the chart and the next review.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MLQAdminView() {
  const pts = MLQ_PATIENTS;
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const total = pts.length;
  const active = pts.filter(p => p.status === "active").length;
  const critFlags = pts.reduce((s, p) => s + (p.critFlags || 0), 0);
  const labsDue = pts.filter(p => p.labsDue).length;
  const filtered = pts.filter(p => {
    if (status !== "all" && p.status !== status) return false;
    if (q && !(`${p.name} ${p.email} ${p.phone}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="lab-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { n: total, l: "Total patients" },
          { n: active, l: "Active" },
          { n: critFlags, l: "Critical flags", c: "var(--red,#E5484D)" },
          { n: labsDue, l: "Labs overdue", c: "var(--amber,#B7791F)" },
        ].map((s, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", borderRadius: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.c || "var(--ink)", fontFamily: "var(--mono)" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, email, phone"
          style={{ flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 980, border: "1px solid var(--rule)", fontFamily: "var(--sans)", fontSize: 14, background: "var(--bg)", color: "var(--ink)" }} />
        {["all", "active", "archived"].map(s => (
          <button key={s} onClick={() => setStatus(s)} style={{
            appearance: "none", cursor: "pointer", padding: "9px 16px", borderRadius: 980, fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500,
            border: status === s ? "1px solid var(--blue)" : "1px solid var(--rule)",
            background: status === s ? "var(--blue)" : "var(--bg)", color: status === s ? "#fff" : "var(--ink-soft)", textTransform: "capitalize",
          }}>{s}</button>
        ))}
      </div>
      <div style={{ border: "1px solid var(--rule)", borderRadius: 14, overflow: "hidden" }}>
        <div className="mlq-roster-head" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.8fr", gap: 12, padding: "12px 18px", background: "var(--bg-2)", fontSize: 11, fontWeight: 600, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <div>Patient</div><div>Provider</div><div>Program</div><div>Flags</div><div>Status</div>
        </div>
        {filtered.map((p, i) => (
          <div key={p.id} className="mlq-roster-row" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 0.8fr", gap: 12, padding: "14px 18px", borderTop: "1px solid var(--rule)", alignItems: "center", fontSize: 13.5 }}>
            <div>
              <div style={{ fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-mute)", fontFamily: "var(--mono)" }}>{p.id} · {p.gender}</div>
            </div>
            <div style={{ color: "var(--ink-soft)" }}>{p.provider}</div>
            <div style={{ color: "var(--ink-soft)" }}>{p.program}</div>
            <div>
              {p.critFlags ? <span style={{ fontSize: 11, fontWeight: 700, color: "var(--red,#E5484D)", background: "#FDECEC", padding: "2px 8px", borderRadius: 6 }}>{p.critFlags}</span>
                : <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>—</span>}
            </div>
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "capitalize", color: p.status === "active" ? "var(--mint-2)" : "var(--ink-mute)", background: p.status === "active" ? "var(--mint-tint)" : "var(--bg-2)", padding: "3px 9px", borderRadius: 6 }}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
