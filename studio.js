/* Cardio-Diabetic Brand Desk — strategy studio
   ---------------------------------------------
   1. CTX        clinical context per therapy class (words the activities and plan use)
   2. STORY      big-idea platforms per class, one per company orientation
   3. ORIENT     sales / marketing / scientific playbooks for the brand plan
   4. ACTIVITIES library of professional in-clinic activities
   5. generate() picks and fills activities for a molecule, orientation and goal

   Everything is rule-based and runs in the browser. Text in {curly} braces is filled per molecule.
   All activities are written to sit inside UCPMP 2024; have medical, legal and compliance review
   each one before use. */
(function () {
  "use strict";

  /* ---------- 1. Clinical context per class ---------- */
  const CTX = {
    CTD:      { tags: ["htn", "renal"], area: "hypertension", cond: "uncontrolled hypertension", pts: "hypertensive patients on two or more BP drugs", metric: "BP", goal: "BP below 130/80 mmHg", test: "7-day home BP log", safety: "sodium and potassium at baseline and 2–4 weeks" },
    ARB:      { tags: ["htn", "renal", "dm"], area: "hypertension", cond: "hypertension", pts: "hypertensive patients, especially diabetics", metric: "BP", goal: "BP below 130/80 mmHg", test: "7-day home BP log", safety: "creatinine and potassium after starting" },
    CCB:      { tags: ["htn"], area: "hypertension", cond: "hypertension", pts: "hypertensive patients", metric: "BP", goal: "BP below 130/80 mmHg", test: "7-day home BP log", safety: "ankle oedema at each visit" },
    BB:       { tags: ["htn", "hf", "cad"], area: "hypertension and heart disease", cond: "hypertension with a high heart rate or heart disease", pts: "patients with hypertension, angina or a past heart attack", metric: "resting heart rate and BP", goal: "resting heart rate 60–70 and BP at goal", test: "pulse and BP diary", safety: "heart rate and symptoms of bradycardia" },
    SGLT2:    { tags: ["dm", "renal", "hf"], area: "cardio-renal-metabolic disease", cond: "type 2 diabetes with heart or kidney risk", pts: "type 2 diabetics with hypertension, CKD or breathlessness", metric: "HbA1c, eGFR and UACR", goal: "HbA1c below 7% with kidneys and heart protected", test: "UACR and eGFR", safety: "genital hygiene and sick-day rules" },
    DPP4:     { tags: ["dm"], area: "type 2 diabetes", cond: "type 2 diabetes not at goal on metformin", pts: "type 2 diabetics on metformin", metric: "HbA1c", goal: "HbA1c below 7%", test: "HbA1c every 3 months", safety: "renal dose check where needed" },
    SUMET:    { tags: ["dm"], area: "type 2 diabetes", cond: "type 2 diabetes needing dual therapy", pts: "type 2 diabetics needing intensification", metric: "HbA1c and fasting glucose", goal: "HbA1c below 7% without hypoglycaemia", test: "fasting and post-meal glucose log", safety: "hypoglycaemia awareness and meal timing" },
    BIG:      { tags: ["dm"], area: "type 2 diabetes and prediabetes", cond: "newly diagnosed type 2 diabetes or prediabetes", pts: "newly diagnosed diabetics and prediabetics", metric: "HbA1c", goal: "HbA1c below 7% (or regression from prediabetes)", test: "HbA1c every 3 months", safety: "GI tolerability and B12 over time" },
    STATIN:   { tags: ["lipid", "cad"], area: "dyslipidaemia and ASCVD prevention", cond: "high LDL cholesterol or high ASCVD risk", pts: "diabetics over 40 and patients with heart disease", metric: "LDL cholesterol", goal: "LDL at the risk-based target (below 70 or 55 mg/dL)", test: "lipid profile at 6–8 weeks", safety: "muscle symptoms and liver enzymes if indicated" },
    ARNI:     { tags: ["hf"], area: "heart failure", cond: "heart failure with reduced ejection fraction", pts: "patients with HFrEF", metric: "dose step, NYHA class and BP", goal: "target dose reached within 8–12 weeks", test: "titration checklist", safety: "BP, potassium and creatinine at each step" },
    ANTIPLT:  { tags: ["cad"], area: "coronary artery disease", cond: "acute coronary syndrome or recent PCI", pts: "patients after ACS or a stent", metric: "days on uninterrupted DAPT", goal: "12 months of uninterrupted DAPT unless stopped by the cardiologist", test: "DAPT adherence calendar", safety: "bleeding signs and drug interactions" },
    GLITAZAR: { tags: ["lipid", "liver", "dm"], area: "diabetic dyslipidaemia and fatty liver", cond: "diabetic dyslipidaemia or NAFLD/MASLD", pts: "diabetics with high triglycerides or fatty liver", metric: "triglycerides and liver fat markers", goal: "triglycerides below 150 mg/dL and improving liver markers", test: "FIB-4 score and lipid profile", safety: "liver enzymes and weight" },
    MRA:      { tags: ["renal", "dm"], area: "diabetic kidney disease", cond: "CKD with type 2 diabetes and albuminuria", pts: "type 2 diabetics with albuminuria", metric: "UACR, eGFR and potassium", goal: "UACR falling and eGFR preserved", test: "UACR and potassium", safety: "potassium at 4 weeks and after dose changes" },
    OTHER:    { tags: ["htn", "dm"], area: "cardio-metabolic disease", cond: "cardio-metabolic disease", pts: "cardio-metabolic patients", metric: "the key treatment target", goal: "treatment goals", test: "follow-up log", safety: "routine safety checks" }
  };

  /* ---------- 2. Big-idea platforms per class ---------- */
  const STORY = {
    CTD: {
      need: "Most hypertensive patients need two or three drugs, yet many stay above goal because the regimen is too long or not strong enough.",
      mech: "Chlorthalidone is a thiazide-like diuretic with a 40–60 hour half-life, so its effect runs well past the 24-hour dosing interval.",
      practice: "Add the diuretic early, in one tablet, and titrate on strengths rather than adding pills.",
      sales: { name: "The Third Drug, Built In", line: "For every patient on two BP drugs and still above goal: one tablet, not one more." },
      marketing: { name: "Control That Outlasts the Day", line: "Twenty-four hours is the minimum, not the promise.", visual: "A clock whose hand keeps sweeping past midnight while the BP trace stays flat." },
      scientific: { name: "The Thiazide-Like Difference", line: "Half-life, outcome trials and guideline preference: why the choice of diuretic matters." }
    },
    ARB: {
      need: "Hypertension in diabetics damages kidneys and heart long before symptoms appear.",
      mech: "Angiotensin receptor blockade lowers BP and protects the kidney and vessels.",
      practice: "Start early, reach target dose, and combine rather than switch.",
      sales: { name: "Every Diabetic, Protected", line: "The default BP choice for every diabetic in the practice." },
      marketing: { name: "Pressure Off", line: "Calm numbers, protected organs.", visual: "A tightened valve slowly opening, colour moving from red to calm blue." },
      scientific: { name: "Beyond the Number", line: "Organ protection is the outcome; BP is the marker." }
    },
    CCB: {
      need: "Patients want steady BP control without side effects that make them stop.",
      mech: "Calcium channel blockade relaxes arteries for steady 24-hour control.",
      practice: "Choose the CCB that patients keep taking.",
      sales: { name: "Steady Every Hour", line: "Control your patients notice, side effects they don't." },
      marketing: { name: "Calm Control", line: "Steady pressure, steady life.", visual: "A smooth horizon line replacing a jagged one." },
      scientific: { name: "Smooth 24-Hour Control", line: "Trough-to-peak, tolerability and adherence in one story." }
    },
    BB: {
      need: "A fast heart rate quietly adds risk in hypertension and heart disease.",
      mech: "Beta-1 selective blockade slows the heart and lowers cardiac workload.",
      practice: "Treat heart rate as a target, not a bystander.",
      sales: { name: "Rate It Right", line: "Every high-heart-rate hypertensive, on the right beta blocker." },
      marketing: { name: "Slow the Strain", line: "A calmer heart works longer.", visual: "A metronome slowing to a calm, even beat." },
      scientific: { name: "Heart Rate Is a Target", line: "From MERIT-HF to everyday practice." }
    },
    SGLT2: {
      need: "Type 2 diabetics die of heart and kidney disease more than of high sugar.",
      mech: "SGLT2 inhibition lowers glucose and protects heart and kidney through haemodynamic and metabolic effects.",
      practice: "Start early in every diabetic with heart or kidney risk, regardless of HbA1c.",
      sales: { name: "One Pill, Three Organs", line: "Sugar, heart and kidney: one decision covers all three." },
      marketing: { name: "Heart. Kidney. Sugar. Sorted.", line: "Protection that reaches past the glucose meter.", visual: "Three organs inside one shield-shaped tablet outline." },
      scientific: { name: "The Cardio-Renal Shield", line: "Four outcome programmes, one consistent signal." }
    },
    DPP4: {
      need: "Patients on metformin need a second drug that will not cause lows or weight gain.",
      mech: "DPP-4 inhibition raises incretins, lowering glucose only when it is high.",
      practice: "The safe second step after metformin.",
      sales: { name: "The Safe Second Step", line: "The next tablet after metformin, for every patient not at goal." },
      marketing: { name: "Control Without the Lows", line: "Steady sugar, no surprises.", visual: "A glucose line held inside a soft safety band." },
      scientific: { name: "Glucose-Dependent Control", line: "Mechanism, cardiovascular safety and renal flexibility." }
    },
    SUMET: {
      need: "Many patients need dependable dual therapy that they can afford for years.",
      mech: "A sulfonylurea plus metformin targets insulin secretion and insulin resistance together.",
      practice: "Titrate to target on one brand across all strengths.",
      sales: { name: "Trusted Twin Control", line: "Every intensification, on one familiar brand." },
      marketing: { name: "Dependable, Every Day", line: "The combination families trust.", visual: "Two hands clasped around a daily calendar." },
      scientific: { name: "Titrate to Target", line: "Dose ladders, hypoglycaemia safety and durability." }
    },
    BIG: {
      need: "The first year after diagnosis decides long-term control.",
      mech: "Metformin reduces hepatic glucose output and improves insulin sensitivity.",
      practice: "Start right, at the right form and dose.",
      sales: { name: "Start Right", line: "Every new diagnosis, on the right metformin from day one." },
      marketing: { name: "The Foundation", line: "Everything else is built on this.", visual: "A foundation stone carrying a house." },
      scientific: { name: "The Foundation of Therapy", line: "From UKPDS legacy to tolerability science." }
    },
    STATIN: {
      need: "Most high-risk patients never reach their LDL target.",
      mech: "Statins lower LDL and stabilise plaque.",
      practice: "Set the number, treat to it, and recheck at 6–8 weeks.",
      sales: { name: "Lower Is Better, Sooner", line: "Every high-risk patient at target within 8 weeks." },
      marketing: { name: "Know Your Number", line: "A target every patient can name.", visual: "A single bold number on a prescription pad." },
      scientific: { name: "The LDL Target Agenda", line: "Risk categories, targets and intensity, made practical." }
    },
    ARNI: {
      need: "Heart-failure patients are rarely up-titrated to the dose that changes outcomes.",
      mech: "Neprilysin inhibition with angiotensin receptor blockade unloads the failing heart.",
      practice: "Start early and reach target dose in weeks, not months.",
      sales: { name: "Every Patient Up-Titrated", line: "Start, step up, stay: the three visits that matter." },
      marketing: { name: "More Good Days", line: "Fewer hospital nights.", visual: "A calendar where hospital days give way to ordinary ones." },
      scientific: { name: "Beyond ACE Inhibition", line: "PARADIGM-HF to PIONEER-HF, in practice." }
    },
    ANTIPLT: {
      need: "Stopping antiplatelet therapy early after a stent is a leading avoidable risk.",
      mech: "Potent P2Y12 inhibition prevents platelet-driven thrombosis.",
      practice: "Twelve months, no gaps, unless the cardiologist says otherwise.",
      sales: { name: "No Gaps After the Stent", line: "Every discharge, on the right DAPT, for the full course." },
      marketing: { name: "Twelve Months Strong", line: "The stent is day one.", visual: "A 12-link chain with no missing link." },
      scientific: { name: "Potent Platelet Protection", line: "PLATO evidence and real-world adherence." }
    },
    GLITAZAR: {
      need: "Diabetic dyslipidaemia and fatty liver travel together and are often untreated.",
      mech: "Dual PPAR alpha/gamma agonism lowers triglycerides and improves insulin sensitivity and liver fat.",
      practice: "Check the liver in every diabetic with high triglycerides.",
      sales: { name: "Two Targets, One Tablet", line: "Triglycerides and liver, in every metabolic patient." },
      marketing: { name: "Lift the Liver", line: "The organ diabetes forgets.", visual: "A liver outline lightening from heavy to clear." },
      scientific: { name: "Dual PPAR Science", line: "From PRESS trials to MASLD practice." }
    },
    MRA: {
      need: "Diabetic kidney disease keeps progressing despite RAS blockade.",
      mech: "Non-steroidal MR antagonism targets inflammation and fibrosis in kidney and heart.",
      practice: "Screen UACR in every diabetic and add on top of RAS blockade.",
      sales: { name: "Protect the Kidney Earlier", line: "Every diabetic with albuminuria, on the next layer of protection." },
      marketing: { name: "Slow the Decline", line: "Time for the kidney.", visual: "An hourglass whose sand slows to a trickle." },
      scientific: { name: "Inflammation and Fibrosis", line: "FIDELIO and FIGARO, made clinic-ready." }
    },
    OTHER: {
      need: "Cardio-metabolic patients carry more than one risk at a time.",
      mech: "Targeted therapy addresses the key driver of risk.",
      practice: "Treat to target and keep patients on therapy.",
      sales: { name: "Every Eligible Patient", line: "The right patient, started and kept." },
      marketing: { name: "Healthier Together", line: "Care that lasts.", visual: "Two lines rising together." },
      scientific: { name: "Evidence in Practice", line: "From trial to clinic." }
    }
  };

  /* ---------- 3. Orientation playbooks ---------- */
  const ORIENT = {
    sales: {
      key: "sales", label: "Sales-oriented", short: "Sales-led",
      blurb: "Coverage, call frequency, chemist availability and prescription conversion.",
      ambition: "{brand} wins prescriptions faster than any {mol} launch in {geo}: more doctors, seen more often, with stock wherever they write.",
      pillars: [
        { t: "Coverage with intent", d: "A-B-C segmentation by potential. A-class doctors 3 calls a month, B twice, C once. No doctor without a plan." },
        { t: "Prescription conversion", d: "Every call ends with one ask: the next patient profile to start on {brand}. Rep follows up within 7 days." },
        { t: "Availability lock", d: "Top 3 chemists around each A-class doctor stocked before the first call, checked every week." },
        { t: "Rep excellence", d: "Call-flow certification, objection drills and a weekly RCPA review in every territory." }
      ],
      budget: [["Field force and call support", 40], ["Trade and availability", 20], ["In-clinic activation", 20], ["Medical and CME", 10], ["Digital and patient", 10]],
      engine: {
        title: "Prescriber conversion ladder", sub: "Every core doctor is tracked on this ladder every month",
        steps: [
          { t: "Aware", d: "Detailed 3 times; can repeat the {brand} story.", k: "100% of core list by M2" },
          { t: "Trialist", d: "First 3 prescriptions; rep follows up within 7 days.", k: "60% of core list by M4" },
          { t: "Adopter", d: "{brand} is the default for the target patient.", k: "40% of core list by M8" },
          { t: "Advocate", d: "Hosts a huddle or speaks to peers.", k: "10% of core list by M12" }
        ]
      },
      workstreams: [
        { name: "A-B-C segmentation and call cycle", s: 1, e: 2, k: "field" },
        { name: "Chemist availability sprints", s: 1, e: 3, k: "trade" },
        { name: "Weekly RCPA and conversion review", s: 2, e: 12, k: "review" },
        { name: "Rep certification and objection drills", s: 1, e: 12, k: "field" }
      ],
      kpis: [["Doctors moved up the conversion ladder", "40% adopters by month 8", "Monthly"], ["Calls on A-class doctors", "3 a month, 90% compliance", "Weekly"]],
      specMult: { gp: 1.4, physician: 1.2 },
      tone: "Short, benefit-first messages with a clear next-patient ask."
    },
    marketing: {
      key: "marketing", label: "Marketing-oriented", short: "Marketing-led",
      blurb: "Brand platform, campaigns, patient experience and omnichannel.",
      ambition: "{brand} becomes the {mol} brand doctors recall first and patients stay on: a clear idea, told the same way at every touchpoint in {geo}.",
      pillars: [
        { t: "One brand idea", d: "A single platform, tagline and visual system used on every aid, webinar, pack and clinic material." },
        { t: "Campaign in four acts", d: "Tease, launch, amplify and sustain, each with a fresh creative and a reason to call." },
        { t: "Patient experience", d: "Unbranded disease awareness and counselling tools that make the clinic look good to its patients." },
        { t: "Omnichannel rhythm", d: "Rep visit, follow-up email, webinar and WhatsApp content in one planned sequence per doctor." }
      ],
      budget: [["Campaign and creative", 25], ["Field force and call support", 25], ["Digital and omnichannel", 20], ["In-clinic activation", 15], ["Medical and CME", 15]],
      engine: {
        title: "Campaign architecture", sub: "Four acts, each with its own creative and call reason",
        steps: [
          { t: "Tease", d: "Unbranded insight series on the unmet need; curiosity before the name.", k: "M1" },
          { t: "Launch", d: "Big-idea reveal: launch meets, detail aid, clinic kit.", k: "M1–M3" },
          { t: "Amplify", d: "KOL voices, webinars, conference presence, digital series.", k: "M4–M8" },
          { t: "Sustain", d: "Patient-experience tools and reminder creative keep recall high.", k: "M9–M12" }
        ]
      },
      workstreams: [
        { name: "Brand identity and tease campaign", s: 1, e: 2, k: "patient" },
        { name: "Omnichannel journey per doctor", s: 3, e: 12, k: "patient" },
        { name: "Unbranded disease-awareness drive", s: 5, e: 9, k: "patient" },
        { name: "Creative refresh and recall study", s: 7, e: 8, k: "review" }
      ],
      kpis: [["Unaided brand recall among core doctors", "Top 3 in molecule by month 6", "Quarterly"], ["Omnichannel engagement (opens, webinar attendance)", "50% of core list engaged monthly", "Monthly"]],
      specMult: {},
      tone: "Memorable, visual and consistent: one idea told the same way everywhere."
    },
    scientific: {
      key: "scientific", label: "Scientific-oriented", short: "Science-led",
      blurb: "Evidence, KOL partnership, medical education and real-world data.",
      ambition: "{brand} becomes the scientific reference for {mol} in {geo}: the brand KOLs cite, residents learn on and practices trust for clinical questions.",
      pillars: [
        { t: "Evidence platform", d: "One scientific narrative from unmet need to mechanism to trials to practice, signed off by medical affairs." },
        { t: "KOL pyramid", d: "National, regional and local experts engaged with defined roles: advisory, faculty and case champions." },
        { t: "Education curriculum", d: "A six-module CME series with certification, case banks and practice tools." },
        { t: "Real-world evidence", d: "An Indian real-world study with KOL investigators, presented at RSSDI, CSI or API and published." }
      ],
      budget: [["Medical education and CME", 30], ["Field force and call support", 25], ["KOL and advisory", 20], ["RWE and publications", 15], ["Digital and patient", 10]],
      engine: {
        title: "Scientific narrative", sub: "The four chapters every call, CME and publication follows",
        steps: [
          { t: "Unmet need", d: "{need}", k: "Chapter 1" },
          { t: "Mechanism", d: "{mech}", k: "Chapter 2" },
          { t: "Evidence", d: "{proof}", k: "Chapter 3" },
          { t: "Practice", d: "{practice}", k: "Chapter 4" }
        ]
      },
      workstreams: [
        { name: "Scientific narrative and medical deck", s: 1, e: 2, k: "medical" },
        { name: "KOL mapping and pyramid", s: 1, e: 3, k: "medical" },
        { name: "Six-module CME curriculum", s: 3, e: 12, k: "medical" },
        { name: "RWE study and publication", s: 6, e: 12, k: "medical" }
      ],
      kpis: [["KOLs actively engaged (advisory, faculty, champions)", "30 by month 6", "Quarterly"], ["Doctors completing the CME curriculum", "25% of core list by month 12", "Quarterly"]],
      specMult: { gp: 0.7, specialist: 1.3 },
      tone: "Data-first, referenced and balanced; every claim tied to a trial or guideline."
    }
  };

  /* ---------- 4. In-clinic activity library ----------
     tags:    which therapy contexts the activity fits ("all" = every class)
     obj:     initiate | switch | titrate | retain | recall
     aud:     audiences it suits (gp, physician, specialist, any)
     fit:     how strongly it suits each orientation (0–3)
     type:    Scientific | Practice-building | Patient experience | Experiential | Digital in-clinic */
  const ACTIVITIES = [
    {
      id: "audit", name: "The 20-Patient Practice Mirror", type: "Scientific", tags: "all", obj: ["switch", "titrate"], aud: ["physician", "specialist", "gp"], fit: { scientific: 3, sales: 2, marketing: 1 },
      dur: "15 min to brief, 2 weeks to run", freq: "Once per doctor, repeat at month 6",
      hook: "The doctor audits 20 consecutive {pts} against {goal} and gets a confidential one-page report on their own practice.",
      concept: "Doctors trust their own data more than any slide. A short, doctor-owned audit shows how many of their {pts} are at {goal}, how many are on mono, dual or triple therapy, and where the gap is. The report becomes the reason for every next call.",
      steps: ["Rep explains the audit grid: 10 fields, no patient names, filled by the doctor or clinic staff.", "Doctor records 20 consecutive eligible patients over 2 weeks.", "Medical affairs turns the grid into a one-page Practice Mirror with charts and three guideline-based observations.", "Rep and medical advisor present the report in a 15-minute review; doctor chooses one change to try.", "Re-audit at month 6 to show the before and after."],
      kit: ["Anonymised audit grid (paper or tablet form)", "Practice Mirror report template", "Guideline summary card for {area}"],
      gets: "A private benchmark of their own practice against guidelines, plus a re-audit that shows improvement.",
      measure: "Audits completed; % of doctors who change one protocol; therapy-mix shift at re-audit.",
      guard: "No patient identifiers leave the clinic. The report is the doctor's property and is not linked to prescriptions."
    },
    {
      id: "huddle", name: "Case Conundrum Huddle", type: "Experiential", tags: "all", obj: ["switch", "titrate", "initiate"], aud: ["physician", "gp", "specialist"], fit: { scientific: 3, marketing: 2, sales: 2 },
      dur: "25 min at the host clinic", freq: "Monthly per cluster",
      hook: "Three or four neighbouring doctors meet at one clinic for one real, anonymised {area} case and vote on the next step.",
      concept: "A micro-CME without the hotel. One case, three decision points, coloured voting cards and a guideline reveal at the end. The host doctor presents; peers learn from someone they already know.",
      steps: ["Medical affairs builds a case pack with three decision points on {cond}.", "Host doctor presents the case; peers vote at each decision point with cards.", "Medical advisor reveals the guideline-aligned answer and the evidence behind it.", "Each doctor leaves with a one-page decision card for the clinic desk."],
      kit: ["Case pack with three decision points", "Voting cards (A/B/C/D)", "Desk decision card"],
      gets: "Peer learning in 25 minutes, in the neighbourhood, with a ready reference for the desk.",
      measure: "Huddles held; attendance; % of attendees who move up the prescriber ladder within 60 days.",
      guard: "Scientific content only, approved by medical affairs; refreshments limited to modest tea or coffee within UCPMP 2024."
    },
    {
      id: "staff", name: "Clinic Staff Champion Academy", type: "Practice-building", tags: "all", obj: ["retain", "recall"], aud: ["gp", "physician", "specialist"], fit: { marketing: 3, sales: 2, scientific: 2 },
      dur: "30 min training, in the clinic", freq: "Once, refresher at month 6",
      hook: "Train the clinic's nurse or assistant to measure {metric} correctly and to counsel patients in 60 seconds.",
      concept: "In most Indian clinics the assistant meets the patient first and last. A short certified training on correct measurement and counselling improves care and builds a relationship with the whole clinic, not only the doctor.",
      steps: ["Medical trainer runs a 30-minute session on measuring {metric} correctly and on 3 counselling messages.", "Staff practise on each other; trainer checks technique with a short checklist.", "Doctor co-signs a 'Clinic Measurement Champion' certificate.", "Rep revisits at month 3 with a 5-minute refresher and a new counselling message."],
      kit: ["Technique checklist", "60-second counselling script in the local language", "Certificate template"],
      gets: "Better measurements and patient counselling from staff, without taking the doctor's time.",
      measure: "Clinics certified; staff retained at month 6; patient return rate in certified clinics.",
      guard: "Training is educational and unbranded. Certificates carry no product claims."
    },
    {
      id: "brownbag", name: "Brown-Bag Morning", type: "Patient experience", tags: "all", obj: ["switch", "retain"], aud: ["physician", "gp"], fit: { sales: 3, marketing: 2, scientific: 1 },
      dur: "One OPD morning", freq: "Quarterly per clinic",
      hook: "Patients bring every medicine strip they take; the clinic counts the daily pill burden and the doctor simplifies.",
      concept: "Many {pts} take 6–10 tablets a day from several prescriptions. A medicine review morning shows the doctor the real pill burden in their own patients and opens the conversation on simplification and fixed-dose combinations.",
      steps: ["Clinic informs patients a week ahead to bring all current medicines.", "Staff record tablets per day per patient on an anonymised tally sheet.", "Doctor reviews each regimen and simplifies where clinically right.", "Tally sheet becomes a one-page 'pill burden in my practice' summary for the doctor."],
      kit: ["Patient invitation card (unbranded)", "Pill-burden tally sheet", "Medicine review checklist"],
      gets: "A practical view of polypharmacy in their patients and a structured way to simplify it.",
      measure: "Patients reviewed; average tablets per day before and after; regimens simplified.",
      guard: "Clinical decisions remain the doctor's; no brand material is handed to patients."
    },
    {
      id: "ladder", name: "Titration Ladder Desk Flip", type: "Scientific", tags: "all", obj: ["titrate", "retain"], aud: ["physician", "gp", "specialist"], fit: { sales: 3, scientific: 2, marketing: 2 },
      dur: "3 min to introduce", freq: "Once; refreshed with new strengths",
      hook: "A desk flip that shows the step-by-step path through {strengths} with when to step up and what to check.",
      concept: "Doctors switch brands when the next strength is missing or unclear. A clean desk tool that lays out every step, checkpoint and safety check keeps the patient on one brand from start to target.",
      steps: ["Medical affairs drafts the ladder from the prescribing information and guidelines.", "Rep introduces it in a 3-minute walkthrough using one typical patient.", "Doctor keeps it on the desk; staff use it to book the next step visit.", "Rep returns with a one-line case story of a patient who reached target on the ladder."],
      kit: ["Desk flip (A5, wipe-clean)", "Step-visit appointment stickers", "Safety check box: {safety}"],
      gets: "A quick, reliable titration reference that saves time in a busy OPD.",
      measure: "Doctors using the flip; patients reaching the top strength; brand continuation across strengths.",
      guard: "Content matches the approved prescribing information; the tool is an educational item within UCPMP 2024 value limits."
    },
    {
      id: "vernacular", name: "Doctor's Voice, Local Language", type: "Digital in-clinic", tags: "all", obj: ["retain", "recall"], aud: ["physician", "gp", "specialist"], fit: { marketing: 3, sales: 1, scientific: 2 },
      dur: "20 min recording", freq: "One video per doctor, refreshed yearly",
      hook: "The doctor records a 60-second patient-education film on {area} in the local language for their own patients.",
      concept: "Patients listen to their own doctor more than to any leaflet. A professionally produced short film, unbranded and in the patient's language, plays in the waiting room and goes to patients through the clinic's own WhatsApp.",
      steps: ["Medical writer prepares a 60-second script on living with {cond}; doctor edits it.", "Small crew records in the clinic in 20 minutes.", "Film is edited, subtitled and handed to the doctor for their own use.", "Rep shares view counts the clinic chooses to share and offers a second topic after 6 months."],
      kit: ["Script template", "Mobile recording kit", "Waiting-room playback file"],
      gets: "A personal patient-education asset in their own voice and language.",
      measure: "Videos made; clinic playback; patient return visits reported by the clinic.",
      guard: "Unbranded and non-promotional; the doctor owns the film. No payment for the recording."
    },
    {
      id: "day30", name: "Day-30 Return Ritual", type: "Patient experience", tags: "all", obj: ["retain"], aud: ["gp", "physician"], fit: { sales: 3, marketing: 2, scientific: 1 },
      dur: "5 min set-up", freq: "Ongoing",
      hook: "Every new patient leaves with a day-30 appointment card and a clinic reminder, so fewer drop off after the first strip.",
      concept: "The biggest loss in chronic therapy happens in the first month. A simple ritual — a booked day-30 visit, a reminder from the clinic and a target to check — keeps patients coming back and keeps therapy going.",
      steps: ["Rep sets up the appointment card and reminder template with the clinic assistant.", "Doctor writes the day-30 target ({goal}) on the card.", "Clinic sends its own reminder 2 days before the visit.", "Rep reviews the clinic's return rate at month 3 with the doctor."],
      kit: ["Day-30 appointment card (unbranded)", "Reminder message template in local language", "Return-rate tracker"],
      gets: "More patients returning on time and better control in their practice.",
      measure: "Day-30 return rate before and after; continuation of therapy at month 3.",
      guard: "Reminders are sent by the clinic, not the company. No patient data is collected by the company."
    },
    {
      id: "episodes", name: "Episodic Detailing: Season One", type: "Experiential", tags: "all", obj: ["recall", "initiate"], aud: ["physician", "gp", "specialist"], fit: { marketing: 3, sales: 3, scientific: 1 },
      dur: "4 min per episode", freq: "Six episodes, one per visit",
      hook: "Detailing turned into a six-episode series on {area}: each visit ends on a question the next one answers.",
      concept: "Instead of repeating the same aid, the rep tells a story in six short episodes — the patient, the problem, the mechanism, the proof, the practice, the outcome. Each ends with a cliffhanger card, so doctors look forward to the next call.",
      steps: ["Marketing and medical script six 4-minute episodes around the brand's scientific narrative.", "Each visit covers one episode with one visual and one card left behind.", "The card ends on a question that the next episode answers.", "Episode six closes with a summary card and an invitation to a Case Conundrum Huddle."],
      kit: ["Six-episode visual aid", "Collectible episode cards", "Season summary card"],
      gets: "Short, structured learning that respects their time and builds over visits.",
      measure: "Episodes completed per doctor; recall checked at episode six; prescriber ladder movement.",
      guard: "Every episode approved by medical, legal and compliance; claims within the prescribing information."
    },
    {
      id: "journal", name: "Reverse Journal Club", type: "Scientific", tags: "all", obj: ["initiate", "switch"], aud: ["specialist", "physician"], fit: { scientific: 3, marketing: 1, sales: 1 },
      dur: "30 min", freq: "Every 2 months",
      hook: "The doctor picks the paper; medical affairs brings a one-page critical-appraisal card and leads a 30-minute discussion.",
      concept: "Specialists value debate more than detailing. Letting the doctor choose the paper on {area} — even one that does not favour the brand — builds scientific credibility that lasts.",
      steps: ["Doctor chooses a recent paper on {cond}.", "Medical advisor prepares a one-page appraisal: question, design, results, limits, practice impact.", "30-minute discussion in the clinic with the doctor and their juniors or residents.", "Appraisal card added to the doctor's 'evidence binder' for later reference."],
      kit: ["Critical-appraisal card template", "Evidence binder", "Reference copies of the paper"],
      gets: "Expert-level evidence review on topics they choose, for them and their team.",
      measure: "Sessions held; residents reached; KOL engagement score.",
      guard: "Balanced discussion led by medical affairs; reprints provided only as permitted."
    },
    {
      id: "journey", name: "Patient Journey Map Session", type: "Practice-building", tags: "all", obj: ["retain", "switch"], aud: ["physician", "specialist", "gp"], fit: { marketing: 3, scientific: 2, sales: 2 },
      dur: "30 min whiteboard session", freq: "Once per key doctor",
      hook: "Doctor and brand team map how a typical patient with {cond} moves through the clinic and where they drop off.",
      concept: "Mapping the real journey — first visit, tests, prescription, chemist, follow-up — shows where patients are lost. Together the team picks one fix to try, and the company supports it with an approved tool.",
      steps: ["Rep and medical advisor bring a printed journey canvas with six stages.", "Doctor and staff fill in what happens today and where patients drop off.", "Team chooses one drop-off point to fix in the next 90 days.", "Company provides one approved tool for that fix and reviews results at day 90."],
      kit: ["Journey canvas (A2 poster)", "Sticky-note pack", "Library of approved fix tools"],
      gets: "A clear picture of their own patient flow and one practical improvement.",
      measure: "Maps completed; fixes implemented; follow-up rate at day 90.",
      guard: "Workshop is educational; no patient-level data collected."
    },
    {
      id: "quiz", name: "Waiting-Room Risk Check", type: "Digital in-clinic", tags: "all", obj: ["initiate"], aud: ["gp", "physician"], fit: { marketing: 3, sales: 2, scientific: 1 },
      dur: "2 min per patient", freq: "Ongoing on a clinic tablet or QR card",
      hook: "Patients answer six validated questions in the waiting room; the doctor sees who needs a {area} review today.",
      concept: "Patients are idle in the waiting room. A short, unbranded risk check turns that time into triage and gives the doctor a reason to discuss {cond} before the patient asks.",
      steps: ["Medical affairs selects a validated, unbranded questionnaire.", "Clinic places a QR card or tablet in the waiting room.", "Patients complete it; results go to the doctor only.", "Monthly, the clinic sees how many flagged patients were reviewed."],
      kit: ["QR standee (unbranded)", "Results slip for the doctor", "Monthly summary sheet"],
      gets: "Earlier identification of at-risk patients with no extra consultation time.",
      measure: "Checks completed; patients flagged; flagged patients reviewed.",
      guard: "No patient data stored by the company; tool is unbranded and approved by compliance."
    },
    /* Hypertension and CTD-specific */
    {
      id: "morning", name: "Morning Surge Mission", type: "Scientific", tags: ["htn"], obj: ["switch", "titrate"], aud: ["physician", "specialist", "gp"], fit: { scientific: 3, sales: 2, marketing: 2 },
      dur: "7-day home protocol", freq: "Rolling, 10 patients per doctor",
      hook: "Ten patients 'controlled' in the clinic log home BP for 7 days; the doctor sees who is still uncontrolled in the early morning.",
      concept: "Office BP hides early-morning and masked uncontrolled hypertension. A structured 7-day home log (morning and evening, two readings each) shows the doctor which patients need a longer-acting or additional drug — the opening for a long half-life diuretic or triple pill.",
      steps: ["Doctor selects 10 patients who seem controlled in the clinic.", "Clinic staff teach the 7-day protocol using a validated home monitor the patient or clinic already has.", "Patients return the log; staff calculate morning and evening averages.", "Doctor reviews results; medical advisor shares the guideline view on morning control."],
      kit: ["7-day home BP log card", "Protocol sheet in local language", "Averaging calculator card"],
      gets: "Hard evidence of hidden uncontrolled BP in their own patients.",
      measure: "Logs completed; % with morning BP above goal; therapy changes made by the doctor.",
      guard: "No devices given as gifts; the log is educational and unbranded."
    },
    {
      id: "thirddrug", name: "The Third-Drug Decision Room", type: "Experiential", tags: ["htn"], obj: ["switch", "titrate"], aud: ["physician", "specialist"], fit: { scientific: 3, sales: 3, marketing: 1 },
      dur: "20 min", freq: "Once per core doctor, then in huddles",
      hook: "A decision game on 5 real-world patients on two BP drugs: add, switch, or simplify into one tablet?",
      concept: "Many doctors hesitate before the third BP drug. Five short patient cards — the diabetic, the obese salt-sensitive patient, the elderly patient, the CKD patient and the patient with ankle oedema — help the doctor decide, with ISH 2020 and ESH 2023 guidance as the referee.",
      steps: ["Rep lays out five patient cards on the desk.", "Doctor sorts them: add a drug, change a drug, or move to a single-pill combination.", "Medical advisor reveals the guideline-aligned path for each card.", "Doctor keeps the five cards as a desk reference."],
      kit: ["Five patient cards", "Guideline reveal card", "Single-pill triple therapy summary"],
      gets: "Confidence in moving patients to guideline triple therapy at the right time.",
      measure: "Sessions completed; uptake of dual/triple single-pill combinations in the doctor's RCPA.",
      guard: "Patient cards are fictional composites; claims within approved prescribing information."
    },
    {
      id: "salt", name: "Hidden Salt Detective", type: "Patient experience", tags: ["htn"], obj: ["retain", "recall"], aud: ["gp", "physician"], fit: { marketing: 3, sales: 1, scientific: 1 },
      dur: "Self-run in the waiting room", freq: "3-month display",
      hook: "A waiting-room display shows the hidden salt in everyday Indian foods — pickle, papad, namkeen, bread — and how to swap.",
      concept: "Salt sensitivity is common in Indian patients and drives resistant BP. A visual, unbranded display with real food packs and salt-spoon equivalents gets patients talking to the doctor about diet and adherence.",
      steps: ["Clinic places a counter-top display and take-home swap card.", "Staff use it to open a 60-second salt conversation.", "Doctor reinforces one swap per patient.", "Display rotates to a new food set each month."],
      kit: ["Counter-top display (unbranded)", "Take-home swap card in local language", "Monthly food-set inserts"],
      gets: "A conversation starter that supports BP control and patient trust.",
      measure: "Displays placed; swap cards taken; doctor feedback.",
      guard: "Unbranded health information only; no product reference on patient material."
    },
    {
      id: "electro", name: "Electrolyte Confidence Protocol", type: "Scientific", tags: ["htn", "renal"], ctdOnly: true, obj: ["initiate", "titrate"], aud: ["physician", "specialist", "gp"], fit: { scientific: 3, sales: 2, marketing: 1 },
      dur: "5 min", freq: "Once, with case follow-up",
      hook: "A clinic protocol card for {safety}, so doctors start low-dose chlorthalidone with confidence.",
      concept: "Fear of low sodium or potassium stops many doctors from adding a diuretic. A clear monitoring protocol, built from the prescribing information and guidelines, removes the barrier and positions the brand as the safe, well-supported choice.",
      steps: ["Medical affairs drafts a one-page monitoring protocol (who, when, what to check, what to do).", "Rep walks the doctor through it using one elderly patient example.", "Clinic adds the protocol to its lab-order pad.", "Rep revisits after 4 weeks to discuss the first patients' results."],
      kit: ["Protocol card", "Lab-order pad insert", "Patient advice slip on hydration and symptoms"],
      gets: "A safe, simple monitoring routine for diuretic-based therapy.",
      measure: "Protocol adoption; new starts on low-dose diuretic combinations.",
      guard: "Content is medical and balanced; reviewed by medical affairs."
    },
    /* Diabetes */
    {
      id: "passport", name: "Target Tracker Passport", type: "Patient experience", tags: ["dm", "lipid"], obj: ["retain", "titrate"], aud: ["gp", "physician", "specialist"], fit: { marketing: 3, sales: 2, scientific: 1 },
      dur: "2 min per patient", freq: "Ongoing",
      hook: "A patient-held passport where the doctor writes the target and stamps each visit's {metric}.",
      concept: "Patients who know their number come back to see it change. A passport-style booklet with targets, readings and next-visit dates gives patients ownership and gives doctors a quick view of progress.",
      steps: ["Doctor writes the target ({goal}) on page one.", "Each visit, staff record {metric} and the next date.", "Patients who reach target get a 'goal reached' stamp from the doctor.", "Rep reviews passport uptake with the clinic every quarter."],
      kit: ["Patient passport (unbranded)", "Goal-reached stamp", "Clinic uptake tracker"],
      gets: "Engaged patients who return for follow-up and understand their targets.",
      measure: "Passports issued; follow-up adherence; % at target at 6 months.",
      guard: "Unbranded patient material; no product names or claims."
    },
    {
      id: "fasting", name: "Festival Fasting Safe Plan", type: "Scientific", tags: ["dm"], obj: ["retain"], aud: ["physician", "gp", "specialist"], fit: { scientific: 3, marketing: 2, sales: 2 },
      dur: "10 min, seasonal", freq: "Before Ramadan, Navratri and Shravan",
      hook: "A seasonal protocol and patient leaflet for diabetics who fast, timed 3 weeks before each festival.",
      concept: "Fasting raises hypoglycaemia and dehydration risk, and many patients change doses on their own. A doctor-approved fasting plan, based on IDF-DAR and RSSDI guidance, shows the brand cares about the patient's real life.",
      steps: ["Medical affairs updates the fasting protocol for each festival.", "Rep visits 3 weeks before the festival with the protocol and patient leaflets.", "Doctor counsels fasting patients and adjusts doses where needed.", "Rep collects anonymised feedback after the festival."],
      kit: ["Doctor protocol card", "Patient leaflet in local language (unbranded)", "Glucose check schedule"],
      gets: "Timely, practical guidance for a high-risk period.",
      measure: "Clinics reached before each festival; patient leaflets used; doctor feedback.",
      guard: "Guidance follows recognised guidelines; patient material is unbranded."
    },
    {
      id: "foot", name: "60-Second Foot and Pulse Check", type: "Practice-building", tags: ["dm"], obj: ["recall", "initiate"], aud: ["gp", "physician"], fit: { marketing: 2, scientific: 2, sales: 2 },
      dur: "60 sec per patient", freq: "One clinic day a month",
      hook: "Clinic staff check feet and pulses in every diabetic once a month using a monofilament and a simple chart.",
      concept: "Foot complications are preventable but often missed in busy clinics. A one-minute routine run by trained staff signals that the brand supports complete diabetes care, not only sugar control.",
      steps: ["Medical trainer teaches the 60-second check to clinic staff.", "Clinic runs a monthly 'foot day'.", "Patients at risk are flagged for the doctor.", "Rep reviews monthly numbers with the clinic."],
      kit: ["10 g monofilament (educational item)", "Foot-check chart", "Patient foot-care card (unbranded)"],
      gets: "Systematic screening with little extra effort.",
      measure: "Patients screened; at-risk patients referred.",
      guard: "Educational items within UCPMP 2024 value limits; patient card is unbranded."
    },
    /* Cardio-renal */
    {
      id: "kidney", name: "Kidney Check Week", type: "Scientific", tags: ["renal", "dm"], obj: ["initiate"], aud: ["physician", "specialist", "gp"], fit: { scientific: 3, sales: 2, marketing: 2 },
      dur: "One week, run by the clinic", freq: "Twice a year",
      hook: "For one week the clinic orders UACR and eGFR for every diabetic and hypertensive who has not had one in a year.",
      concept: "Most kidney disease in diabetes and hypertension is found late because UACR is rarely ordered. A focused clinic week, with a simple order template and a results grid, finds patients who need renal protection now.",
      steps: ["Rep and doctor agree the week and the patient group.", "Clinic uses an order template for UACR and eGFR.", "Results go into a simple KDIGO heat-map grid.", "Medical advisor reviews the grid with the doctor and the guideline next steps."],
      kit: ["Lab order template", "KDIGO heat-map grid", "Guideline next-step card"],
      gets: "A clear picture of kidney risk across their patients.",
      measure: "Patients tested; % with raised UACR; patients started on renal-protective therapy by the doctor.",
      guard: "Testing is the doctor's clinical decision; the company does not pay for tests linked to prescriptions."
    },
    {
      id: "breath", name: "Breathless Diabetic Screen", type: "Scientific", tags: ["hf"], obj: ["initiate"], aud: ["physician", "specialist"], fit: { scientific: 3, sales: 1, marketing: 2 },
      dur: "3 questions per patient", freq: "Ongoing",
      hook: "Three questions on breathlessness, swelling and fatigue to find hidden heart failure in {pts}.",
      concept: "Heart failure in diabetes is under-diagnosed. A three-question screen, with a clear next step (ECG, NT-proBNP or echo), helps the doctor find patients who benefit from heart-failure therapy.",
      steps: ["Medical affairs provides a validated three-question screen.", "Clinic staff ask it at vitals.", "Positive screens go to the doctor with a next-step card.", "Rep reviews flagged numbers monthly."],
      kit: ["Screen card", "Next-step algorithm", "Monthly tracker"],
      gets: "Earlier detection of heart failure in their patients.",
      measure: "Screens done; patients flagged; diagnoses confirmed by the doctor.",
      guard: "Screening and diagnosis decisions remain clinical; no patient data to the company."
    },
    {
      id: "uptitrate", name: "Up-Titration Sprint", type: "Practice-building", tags: ["hf"], obj: ["titrate"], aud: ["specialist", "physician"], fit: { scientific: 3, sales: 3, marketing: 1 },
      dur: "8–12 week programme", freq: "Per new patient",
      hook: "A visit-by-visit checklist that takes each new patient to target dose in 8–12 weeks, with safety checks at each step.",
      concept: "Under-dosing is the biggest gap in heart-failure care. A structured sprint with fixed review visits and a nurse checklist turns guideline intent into practice.",
      steps: ["Doctor enrols new patients on the sprint sheet.", "Clinic nurse books step visits every 2–4 weeks.", "At each visit: BP, potassium and creatinine checked against the checklist.", "Rep reviews % of patients at target dose at week 12."],
      kit: ["Sprint sheet", "Nurse checklist", "Step-visit stickers"],
      gets: "More patients at target dose, safely and on schedule.",
      measure: "% at target dose at week 12; drop-outs; doctor satisfaction.",
      guard: "Doses follow the prescribing information; clinical decisions are the doctor's."
    },
    /* Lipids, CAD, liver */
    {
      id: "number", name: "Know Your Number Desk Pad", type: "Practice-building", tags: ["lipid", "cad"], obj: ["titrate", "initiate"], aud: ["physician", "specialist", "gp"], fit: { sales: 3, marketing: 2, scientific: 2 },
      dur: "2 min per patient", freq: "Ongoing",
      hook: "A tear-off desk pad where the doctor circles the patient's risk group and writes their LDL target.",
      concept: "Patients and doctors forget targets between visits. A desk pad that sets the risk group and target in seconds supports treating to target and re-checking at 6–8 weeks.",
      steps: ["Rep introduces the pad with three risk-group examples.", "Doctor circles the risk group and writes the target for each patient.", "Patient keeps the slip and brings it to the next lipid test.", "Rep checks pad use and 6–8 week re-test rates with the clinic."],
      kit: ["Risk-to-target desk pad", "Patient slip (unbranded)", "Re-test reminder"],
      gets: "Fast, consistent target setting for every patient.",
      measure: "Pads used; re-tests at 6–8 weeks; % at LDL target.",
      guard: "Risk categories follow guidelines; patient slips are unbranded."
    },
    {
      id: "dapt", name: "No-Gap DAPT Pact", type: "Patient experience", tags: ["cad"], obj: ["retain"], aud: ["specialist"], fit: { marketing: 3, scientific: 2, sales: 2 },
      dur: "5 min at discharge", freq: "Every PCI patient",
      hook: "At discharge, patient and cardiologist sign a 12-month DAPT pact with a calendar and a 'call before you stop' card.",
      concept: "Many patients stop antiplatelet therapy early, often on advice from someone else. A signed pact, calendar and wallet card reminds patients — and other doctors — not to stop without the cardiologist.",
      steps: ["Cath-lab nurse introduces the pact at discharge.", "Cardiologist signs the pact with the patient.", "Patient receives a 12-month calendar and a wallet card for dentists and other doctors.", "Rep reviews pact uptake with the cath lab monthly."],
      kit: ["DAPT pact form", "12-month calendar (unbranded)", "Wallet card"],
      gets: "Better continuation of DAPT after PCI.",
      measure: "Pacts signed; continuation at 6 and 12 months reported by the clinic.",
      guard: "Unbranded patient materials; adherence data stays with the hospital."
    },
    {
      id: "liver", name: "Liver Fat Clinic Day", type: "Scientific", tags: ["liver"], obj: ["initiate"], aud: ["specialist", "physician"], fit: { scientific: 3, marketing: 2, sales: 2 },
      dur: "One clinic day", freq: "Monthly",
      hook: "The clinic calculates the FIB-4 score for every diabetic with high triglycerides on one day a month.",
      concept: "Fatty liver is common in diabetic dyslipidaemia but rarely staged. A simple FIB-4 day uses tests the patient already has to find those who need closer care.",
      steps: ["Rep provides a FIB-4 calculator card.", "Clinic calculates scores from existing reports.", "High-risk patients are flagged for the doctor.", "Medical advisor reviews the results grid and guideline next steps."],
      kit: ["FIB-4 calculator card", "Results grid", "Guideline next-step card"],
      gets: "Systematic liver-risk staging without new tests.",
      measure: "Patients scored; patients flagged; follow-up actions taken by the doctor.",
      guard: "Clinical decisions remain with the doctor; no patient data to the company."
    }
  ];

  /* ---------- 5. Generator ---------- */
  const OBJ = { any: "Any goal", initiate: "Start new patients", switch: "Win switches", titrate: "Titrate and intensify", retain: "Keep patients on therapy", recall: "Brand recall" };
  const AUD = { gp: "GPs", physician: "Physicians", specialist: "Specialists" };
  function audOf(spec) { return /General Practitioner/.test(spec) ? "gp" : /Consulting Physician/.test(spec) ? "physician" : "specialist"; }

  function rng(seed) { let x = (seed * 9301 + 49297) % 233280 || 1; return () => (x = (x * 9301 + 49297) % 233280) / 233280; }

  function fill(text, v) { return String(text).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m); }

  function vars(entry, opts) {
    const C = CTX[entry.cls] || CTX.OTHER, S = STORY[entry.cls] || STORY.OTHER;
    const st = opts.strengths || [];
    return Object.assign({}, C, S, {
      mol: entry.name, brand: opts.brand || "our brand", geo: opts.geo || "Pan-India",
      strengths: st.length ? st.slice(0, 5).join(", ") + (st.length > 5 ? " and more" : "") : "every approved strength",
      proof: (entry.evidence || []).length ? "Backed by " + entry.evidence.slice(0, 3).join(", ") + "." : "Built on the approved prescribing information and guidelines.",
      need: S.need, mech: S.mech, practice: S.practice
    });
  }

  function generate(entry, opts) {
    opts = opts || {};
    const C = CTX[entry.cls] || CTX.OTHER, orient = opts.orient || "scientific", n = opts.n || 3;
    const isCTD = entry.cls === "CTD";
    let pool = ACTIVITIES.filter(a => (a.tags === "all" || a.tags.some(t => C.tags.includes(t))) && (!a.ctdOnly || isCTD));
    if (opts.obj && opts.obj !== "any") { const f = pool.filter(a => a.obj.includes(opts.obj)); if (f.length >= n) pool = f; }
    if (opts.aud && opts.aud !== "any") { const f = pool.filter(a => a.aud.includes(opts.aud)); if (f.length >= n) pool = f; }
    const r = rng((opts.seed || 0) + 7);
    const scored = pool.map(a => ({ a, s: (a.fit[orient] || 0) * 2 + (a.tags !== "all" ? 2.2 : 0) + (a.ctdOnly ? 1 : 0) + (opts.obj && a.obj[0] === opts.obj ? 1 : 0) + r() * 3.2 }))
      .sort((x, y) => y.s - x.s);
    const out = [], types = {};
    for (const { a } of scored) {
      if (out.length >= n) break;
      if ((types[a.type] || 0) >= 2) continue;
      types[a.type] = (types[a.type] || 0) + 1; out.push(a);
    }
    for (const { a } of scored) { if (out.length >= n) break; if (!out.includes(a)) out.push(a); }
    const v = vars(entry, opts);
    return out.map(a => ({
      id: a.id, type: a.type, name: a.name, dur: a.dur, freq: a.freq,
      obj: a.obj.map(o => OBJ[o]), aud: a.aud.map(x => AUD[x]).filter(Boolean),
      fit: a.fit[orient] || 0,
      hook: fill(a.hook, v), concept: fill(a.concept, v), steps: a.steps.map(s => fill(s, v)), kit: a.kit.map(s => fill(s, v)),
      gets: fill(a.gets, v), measure: fill(a.measure, v), guard: fill(a.guard, v)
    }));
  }

  function strategy(entry, orient, opts) {
    const O = ORIENT[orient] || ORIENT.scientific, S = STORY[entry.cls] || STORY.OTHER, v = vars(entry, opts || {});
    const big = S[O.key];
    return {
      key: O.key, label: O.label, short: O.short, blurb: O.blurb, tone: O.tone,
      ambition: fill(O.ambition, v),
      bigIdea: { name: big.name, line: fill(big.line, v), visual: big.visual || "", need: S.need },
      pillars: O.pillars.map(p => ({ t: p.t, d: fill(p.d, v) })),
      budget: O.budget.slice(),
      engine: { title: O.engine.title, sub: O.engine.sub, steps: O.engine.steps.map(s => ({ t: s.t, d: fill(s.d, v), k: fill(s.k, v) })) },
      workstreams: O.workstreams.map(w => Object.assign({}, w)),
      kpis: O.kpis.map(k => k.slice()),
      specMult: O.specMult
    };
  }


  /* ---------- 6. Campaign library ----------
     A campaign is a creative idea that runs for a few months and is delivered through in-clinic
     activities (acts = ids from ACTIVITIES above). Each carries a cost model and default ROI
     assumptions that the user can change on the page.
       cost.fixed  one-time costs in Rs (creative, medical review, production)
       cost.perDoc running cost per enrolled doctor in Rs (kits, sessions, staff training share)
       roi         conv = share of enrolled doctors who adopt; ppm = new patients per adopter per month */
  const CAMPAIGNS = [
    {
      id: "morning", name: "Mission 7 AM", tags: ["htn"], obj: ["switch", "titrate"], fit: { scientific: 3, sales: 2, marketing: 3 }, months: 4,
      tagline: "The BP reading nobody takes is the one that matters.",
      insight: "Clinic BP is measured at 11 am. Strokes and heart attacks peak in the early morning, when many patients on short-acting or two-drug regimens are least protected.",
      idea: "A four-month mission that makes 7 am the most talked-about BP in the practice. Clinics run a 7-day morning log in patients who look 'controlled'; the brand turns the anonymised results into a city-level 'Morning BP Index' revealed at a CME. The insight leads naturally to long-acting, guideline triple or diuretic-based therapy.",
      visual: "A sunrise whose first ray is a BP trace spiking at 7:00.",
      phases: [{ t: "Tease", m: "M1", d: "Unbranded desk card: 'What is your patient's BP at 7 am?'" }, { t: "Activate", m: "M1–M2", d: "Morning Surge Mission in every enrolled clinic." }, { t: "Reveal", m: "M3", d: "City Morning BP Index unveiled at a regional CME." }, { t: "Sustain", m: "M4", d: "Third-Drug Decision Room on every core doctor." }],
      channels: ["Rep visits", "In-clinic", "CME", "Approved WhatsApp"],
      acts: ["morning", "thirddrug", "staff"],
      cost: { fixed: [["Creative and medical review", 350000], ["Morning BP Index analysis and CME", 250000]], perDoc: [["Log cards and protocol kit", 900], ["Staff training session share", 700], ["Follow-up visit materials", 400]] },
      roi: { conv: 0.28, ppm: 3, persist: 0.86 }
    },
    {
      id: "onepill", name: "One Strip, Not Three", tags: ["htn"], obj: ["switch", "retain"], fit: { sales: 3, marketing: 3, scientific: 1 }, months: 3,
      tagline: "Every pill you remove is a reason less to stop.",
      insight: "Many hypertensives carry three or more strips for BP alone. Doctors under-estimate pill burden until they see it on the desk.",
      idea: "A pill-burden campaign built on the Brown-Bag Morning: patients bring every strip, the clinic counts tablets per day, and the doctor sees the real burden in their own practice. A clean visual of three strips collapsing into one becomes the campaign mark, and the Day-30 ritual keeps simplified patients coming back.",
      visual: "Three loose strips folding into a single neat strip, like a fan closing.",
      phases: [{ t: "Count", m: "M1", d: "Brown-Bag Morning in each enrolled clinic." }, { t: "Show", m: "M1–M2", d: "Doctor receives a 'pill burden in my practice' card." }, { t: "Simplify", m: "M2", d: "Third-Drug Decision Room on single-pill options." }, { t: "Keep", m: "M2–M3", d: "Day-30 Return Ritual for every simplified patient." }],
      channels: ["Rep visits", "In-clinic", "Chemist"],
      acts: ["brownbag", "thirddrug", "day30"],
      cost: { fixed: [["Creative and medical review", 250000], ["Kit production", 150000]], perDoc: [["Brown-bag kit and tally sheets", 800], ["Day-30 cards and templates", 500], ["Rep follow-up materials", 400]] },
      roi: { conv: 0.3, ppm: 3.5, persist: 0.87 }
    },
    {
      id: "salt", name: "Namak Kam, Control Zyada", tags: ["htn"], obj: ["retain", "recall"], fit: { marketing: 3, sales: 1, scientific: 1 }, months: 4,
      tagline: "Less salt, more control.",
      insight: "Indian diets hide salt in pickle, papad, namkeen and bread. Patients rarely link these foods to their BP, and doctors have no time to explain.",
      idea: "An unbranded, clinic-based salt awareness movement in the patient's language. Waiting rooms get the Hidden Salt Detective display; doctors record a 60-second film in their own voice; a waiting-room risk check finds patients to review. The brand owns the conversation with doctors as the partner who made their clinics look good.",
      visual: "A salt shaker pouring out tiny pickle jars and papads.",
      phases: [{ t: "Launch", m: "M1", d: "Salt displays installed in enrolled waiting rooms." }, { t: "Voice", m: "M1–M2", d: "Doctor's Voice films recorded in local languages." }, { t: "Screen", m: "M2–M3", d: "Waiting-room risk check identifies patients to review." }, { t: "Celebrate", m: "M4", d: "Clinic results shared back to each doctor." }],
      channels: ["In-clinic", "Patient education", "Rep visits", "Approved WhatsApp"],
      acts: ["salt", "vernacular", "quiz"],
      cost: { fixed: [["Creative in 4 languages", 400000], ["Film crew and editing", 300000]], perDoc: [["Waiting-room display and inserts", 1500], ["Doctor film production share", 1200]] },
      roi: { conv: 0.2, ppm: 2.5, persist: 0.88 }
    },
    {
      id: "mirror", name: "Practice Mirror Programme", tags: "all", obj: ["switch", "titrate"], fit: { scientific: 3, sales: 2, marketing: 1 }, months: 6,
      tagline: "See your practice the way the guidelines do.",
      insight: "Doctors believe most of their patients are at goal. Their own data usually tells a different story, and they trust it more than any slide.",
      idea: "A six-month scientific programme. Each enrolled doctor audits 20 patients and receives a private Practice Mirror report, joins a Case Conundrum Huddle with peers, and chooses papers for a Reverse Journal Club. A re-audit at month 6 shows the improvement, which the brand helps them present at a regional meeting.",
      visual: "A clinic mirror reflecting a guideline curve instead of the room.",
      phases: [{ t: "Audit", m: "M1–M2", d: "20-patient Practice Mirror audit." }, { t: "Learn", m: "M2–M4", d: "Case Conundrum Huddles and Reverse Journal Clubs." }, { t: "Change", m: "M3–M5", d: "Doctor picks one protocol change to test." }, { t: "Re-audit", m: "M6", d: "Before/after report, presented at a regional meet." }],
      channels: ["Medical affairs", "In-clinic", "CME", "Rep visits"],
      acts: ["audit", "huddle", "journal"],
      cost: { fixed: [["Audit tool, analytics and medical review", 450000], ["Regional presentation meet", 300000]], perDoc: [["Report production and analysis", 1500], ["Huddle and journal club share", 1300]] },
      roi: { conv: 0.32, ppm: 3, persist: 0.86 }
    },
    {
      id: "season", name: "Season One", tags: "all", obj: ["recall", "initiate"], fit: { marketing: 3, sales: 3, scientific: 1 }, months: 6,
      tagline: "Six episodes. One story your doctors will want to finish.",
      insight: "Doctors see 15 reps a day with the same aid every month. Recall drops when nothing changes between visits.",
      idea: "Detailing turned into a web-series format. Six four-minute episodes, collectible episode cards and a cliffhanger question at the end of each visit. Episode six ends with an invitation to a Case Conundrum Huddle, and the doctor's own 60-second film becomes the 'season finale' for their patients.",
      visual: "A streaming-style title card: 'Season One, Episode 1' on the detail aid.",
      phases: [{ t: "Premiere", m: "M1", d: "Episode 1 and a teaser card." }, { t: "Binge", m: "M2–M5", d: "One episode per visit, cliffhanger cards." }, { t: "Finale", m: "M6", d: "Season summary and Case Conundrum Huddle." }, { t: "Spin-off", m: "M6+", d: "Doctor's Voice film for patients." }],
      channels: ["Rep visits", "Approved WhatsApp", "In-clinic"],
      acts: ["episodes", "huddle", "vernacular"],
      cost: { fixed: [["Six-episode creative and medical review", 600000], ["Episode cards production", 200000]], perDoc: [["Cards and leave-behinds", 900], ["Huddle share", 600], ["Doctor film share", 800]] },
      roi: { conv: 0.25, ppm: 3, persist: 0.85 }
    },
    {
      id: "champions", name: "Clinic Champions", tags: "all", obj: ["retain", "recall"], fit: { sales: 3, marketing: 3, scientific: 2 }, months: 6,
      tagline: "Great clinics are built by the whole team.",
      insight: "The assistant or nurse meets the patient first and last, but nobody trains them. Patients drop off between the doctor and the chemist.",
      idea: "A recognition programme for clinic teams. Staff earn 'Clinic Measurement Champion' certification, run the Day-30 Return Ritual and map the patient journey with the doctor. Certified clinics are recognised (certificate and a mention in the regional CME, no gifts) and become the reference clinics for the territory.",
      visual: "A clinic team photo frame with a champion ribbon — no product, just the team.",
      phases: [{ t: "Train", m: "M1–M2", d: "Staff Champion Academy sessions." }, { t: "Map", m: "M2–M3", d: "Patient Journey Map with doctor and staff." }, { t: "Run", m: "M3–M5", d: "Day-30 Return Ritual live in every clinic." }, { t: "Recognise", m: "M6", d: "Certified clinics recognised at the regional CME." }],
      channels: ["In-clinic", "Medical trainers", "Rep visits", "CME"],
      acts: ["staff", "journey", "day30"],
      cost: { fixed: [["Training curriculum and trainers", 400000], ["Recognition event at CME", 150000]], perDoc: [["Training session share", 1200], ["Journey canvas and day-30 kit", 700]] },
      roi: { conv: 0.24, ppm: 2.5, persist: 0.9 }
    },
    {
      id: "ladder", name: "Titrate to Target Sprint", tags: "all", obj: ["titrate", "retain"], fit: { sales: 3, scientific: 2, marketing: 1 }, months: 3,
      tagline: "Every step on one brand.",
      insight: "Patients are switched to another brand when the next strength is not at hand or the titration step is unclear.",
      idea: "A 90-day sprint built on the Titration Ladder desk flip: every enrolled doctor gets the ladder across {strengths}, staff book step visits, and the Day-30 ritual brings patients back for the next step. A practice mini-audit at day 90 shows how many reached target on one brand.",
      visual: "A ladder whose rungs are the brand's strengths, with a flag at the target.",
      phases: [{ t: "Equip", m: "M1", d: "Titration Ladder desk flip on every core desk." }, { t: "Book", m: "M1–M2", d: "Step-visit stickers and Day-30 ritual." }, { t: "Step up", m: "M2–M3", d: "Rep reviews patients due for the next step." }, { t: "Show", m: "M3", d: "Mini-audit: patients at target on one brand." }],
      channels: ["Rep visits", "In-clinic", "Chemist"],
      acts: ["ladder", "day30", "audit"],
      cost: { fixed: [["Ladder design and medical review", 200000], ["Mini-audit analytics", 100000]], perDoc: [["Desk flip and stickers", 600], ["Day-30 kit", 400]] },
      roi: { conv: 0.3, ppm: 2.5, persist: 0.88 }
    },
    {
      id: "kidney", name: "Kidney First 90", tags: ["renal"], obj: ["initiate"], fit: { scientific: 3, sales: 2, marketing: 2 }, months: 3,
      tagline: "Find it in 90 days, not 9 years.",
      insight: "Most kidney disease in diabetes and hypertension is found late because UACR is rarely ordered.",
      idea: "A 90-day campaign that makes UACR routine. Clinics run a Kidney Check Week, results go onto a KDIGO heat-map, and a Case Conundrum Huddle turns the findings into a treatment plan. The campaign mark is a countdown from 90 to 0.",
      visual: "A kidney outline filled like a progress ring, counting down from 90.",
      phases: [{ t: "Prepare", m: "M1", d: "Order templates and heat-map grids." }, { t: "Test", m: "M1–M2", d: "Kidney Check Week in each clinic." }, { t: "Map", m: "M2", d: "Results on the KDIGO heat-map with medical advisor." }, { t: "Act", m: "M3", d: "Case Conundrum Huddle on renal protection." }],
      channels: ["In-clinic", "Medical affairs", "Rep visits"],
      acts: ["kidney", "huddle", "journal"],
      cost: { fixed: [["Creative and medical review", 300000], ["Heat-map tool", 150000]], perDoc: [["Templates and grids", 500], ["Huddle share", 900]] },
      roi: { conv: 0.27, ppm: 3, persist: 0.87 }
    },
    {
      id: "hiddenheart", name: "The Heart Hiding in Diabetes", tags: ["hf"], obj: ["initiate", "titrate"], fit: { scientific: 3, marketing: 2, sales: 2 }, months: 4,
      tagline: "Three questions that change the prescription.",
      insight: "Heart failure in diabetics is often blamed on age or weight, and diagnosed late.",
      idea: "A screening-to-treatment campaign: three-question Breathless Screen at vitals, a clear next-step path, and an Up-Titration Sprint for patients who need heart-failure therapy.",
      visual: "An ECG trace hidden inside a glucose curve.",
      phases: [{ t: "Screen", m: "M1–M2", d: "Breathless Diabetic Screen at vitals." }, { t: "Confirm", m: "M2", d: "Next-step algorithm for flagged patients." }, { t: "Treat", m: "M2–M4", d: "Up-Titration Sprint to target dose." }, { t: "Review", m: "M4", d: "Clinic results review with medical advisor." }],
      channels: ["In-clinic", "Medical affairs", "Rep visits"],
      acts: ["breath", "uptitrate", "huddle"],
      cost: { fixed: [["Creative and medical review", 300000], ["Algorithm and tools", 120000]], perDoc: [["Screen cards and sprint sheets", 700], ["Huddle share", 900]] },
      roi: { conv: 0.22, ppm: 2, persist: 0.88 }
    },
    {
      id: "passport", name: "Target Passport", tags: ["dm", "lipid"], obj: ["retain", "titrate"], fit: { marketing: 3, sales: 2, scientific: 1 }, months: 6,
      tagline: "Patients who know their number come back to see it change.",
      insight: "Patients forget targets between visits and lose motivation when progress is invisible.",
      idea: "A patient-held passport where the doctor writes the target and stamps every visit. 'Goal reached' stamps become small moments of pride in the clinic; the Day-30 ritual and a monthly foot-and-pulse day keep patients engaged.",
      visual: "A travel-passport cover with a target stamp in place of a visa.",
      phases: [{ t: "Issue", m: "M1", d: "Passports issued to new and uncontrolled patients." }, { t: "Stamp", m: "M1–M6", d: "Every visit stamped with readings." }, { t: "Return", m: "M1–M3", d: "Day-30 Return Ritual for every new patient." }, { t: "Celebrate", m: "M6", d: "Goal-reached numbers shared back to the clinic." }],
      channels: ["In-clinic", "Patient education", "Rep visits"],
      acts: ["passport", "day30", "foot"],
      cost: { fixed: [["Passport design and review", 200000], ["Printing", 200000]], perDoc: [["Passports and stamps", 1200], ["Day-30 kit", 400]] },
      roi: { conv: 0.26, ppm: 3, persist: 0.89 }
    },
    {
      id: "fasting", name: "Safe Fast Season", tags: ["dm"], obj: ["retain"], fit: { scientific: 3, marketing: 3, sales: 2 }, months: 3,
      tagline: "Faith and sugar control, together.",
      insight: "Diabetics fast for Ramadan, Navratri and Shravan and often change doses on their own.",
      idea: "A seasonal campaign timed 3 weeks before each festival: a doctor protocol, a patient leaflet in the local language and a short doctor film on safe fasting. It shows the brand understands the patient's real life.",
      visual: "A crescent moon and a diya sharing one glucose meter.",
      phases: [{ t: "Prepare", m: "−3 weeks", d: "Fasting protocol to every enrolled doctor." }, { t: "Counsel", m: "−2 weeks", d: "Patient leaflets and Doctor's Voice films." }, { t: "Support", m: "Festival", d: "Glucose check schedule in clinics." }, { t: "Review", m: "+2 weeks", d: "Feedback and passport updates." }],
      channels: ["In-clinic", "Patient education", "Approved WhatsApp"],
      acts: ["fasting", "vernacular", "passport"],
      cost: { fixed: [["Protocol and creative in 4 languages", 300000], ["Film production", 250000]], perDoc: [["Leaflets and protocol cards", 700], ["Film share", 800]] },
      roi: { conv: 0.2, ppm: 2, persist: 0.9 }
    },
    {
      id: "number", name: "Know Your Number Week", tags: ["lipid"], obj: ["titrate", "initiate"], fit: { sales: 3, marketing: 2, scientific: 2 }, months: 3,
      tagline: "A target every patient can name.",
      insight: "Most high-risk patients never reach their LDL target because no one tells them what it is.",
      idea: "A target-setting campaign: every enrolled doctor uses the Know Your Number desk pad, patients carry a target passport, and a mini-audit at week 8 shows how many re-tested and reached target.",
      visual: "One bold number circled on a prescription pad.",
      phases: [{ t: "Set", m: "M1", d: "Desk pads on every core desk." }, { t: "Carry", m: "M1–M2", d: "Patients keep target slips and passports." }, { t: "Re-test", m: "M2", d: "Re-test reminders at 6–8 weeks." }, { t: "Show", m: "M3", d: "Mini-audit of patients at target." }],
      channels: ["Rep visits", "In-clinic", "Chemist"],
      acts: ["number", "passport", "audit"],
      cost: { fixed: [["Creative and review", 200000], ["Pad printing", 150000]], perDoc: [["Desk pads and slips", 700], ["Passports", 600]] },
      roi: { conv: 0.28, ppm: 3, persist: 0.86 }
    },
    {
      id: "nogap", name: "The No-Gap Promise", tags: ["cad"], obj: ["retain"], fit: { marketing: 3, scientific: 2, sales: 2 }, months: 6,
      tagline: "The stent is day one.",
      insight: "Patients stop antiplatelet therapy early, often on advice from someone other than their cardiologist.",
      idea: "A discharge-to-month-12 campaign: the cardiologist and patient sign a DAPT pact, the patient carries a wallet card for other doctors, and the Day-30 ritual locks in the first refill.",
      visual: "A 12-link chain with every link intact.",
      phases: [{ t: "Pledge", m: "Discharge", d: "DAPT pact signed in the cath lab." }, { t: "Carry", m: "M1–M12", d: "Wallet card and calendar." }, { t: "Return", m: "M1", d: "Day-30 Return Ritual." }, { t: "Review", m: "M6", d: "Continuation review with the cath lab." }],
      channels: ["Cath lab", "In-clinic", "Patient education"],
      acts: ["dapt", "day30", "huddle"],
      cost: { fixed: [["Creative and review", 250000], ["Calendars and cards", 200000]], perDoc: [["Cath-lab kit", 2000], ["Huddle share", 900]] },
      roi: { conv: 0.3, ppm: 4, persist: 0.9 }
    },
    {
      id: "liverlens", name: "Liver Lens", tags: ["liver"], obj: ["initiate"], fit: { scientific: 3, marketing: 2, sales: 2 }, months: 4,
      tagline: "The organ diabetes forgets.",
      insight: "Fatty liver travels with diabetic dyslipidaemia but is rarely staged.",
      idea: "A liver-risk staging campaign using tests patients already have: monthly Liver Fat Clinic Days with the FIB-4 card, a Case Conundrum Huddle on MASLD and a Reverse Journal Club for specialists.",
      visual: "A magnifying lens over a liver outline, turning from heavy to clear.",
      phases: [{ t: "Stage", m: "M1–M2", d: "Liver Fat Clinic Days." }, { t: "Discuss", m: "M2–M3", d: "Case Conundrum Huddles on MASLD." }, { t: "Deepen", m: "M3–M4", d: "Reverse Journal Club for specialists." }, { t: "Review", m: "M4", d: "Results grid review." }],
      channels: ["In-clinic", "Medical affairs", "Rep visits"],
      acts: ["liver", "huddle", "journal"],
      cost: { fixed: [["Creative and review", 250000], ["FIB-4 tools", 100000]], perDoc: [["Cards and grids", 500], ["Huddle share", 900]] },
      roi: { conv: 0.25, ppm: 2.5, persist: 0.85 }
    }
  ];

  const DEFAULTS = { doctors: 250, revPPM: 450, margin: 0.55, months: 12 };

  function fillAct(a, v, orient) {
    return {
      id: a.id, type: a.type, name: a.name, dur: a.dur, freq: a.freq,
      obj: a.obj.map(o => OBJ[o]), aud: a.aud.map(x => AUD[x]).filter(Boolean), fit: a.fit[orient] || 0,
      hook: fill(a.hook, v), concept: fill(a.concept, v), steps: a.steps.map(s => fill(s, v)), kit: a.kit.map(s => fill(s, v)),
      gets: fill(a.gets, v), measure: fill(a.measure, v), guard: fill(a.guard, v)
    };
  }
  const fits = (x, C) => x.tags === "all" || x.tags.some(t => C.tags.includes(t));

  function generateCampaigns(entry, opts) {
    opts = opts || {};
    const C = CTX[entry.cls] || CTX.OTHER, orient = opts.orient || "scientific", n = opts.n || 3;
    let pool = CAMPAIGNS.filter(c => fits(c, C));
    if (opts.obj && opts.obj !== "any") { const f = pool.filter(c => c.obj.includes(opts.obj)); if (f.length >= Math.min(n, 2)) pool = f; }
    const r = rng((opts.seed || 0) * 3 + 11);
    const picked = pool.map(c => ({ c, s: (c.fit[orient] || 0) * 2 + (c.tags !== "all" ? 2 : 0) + r() * 3.4 })).sort((a, b) => b.s - a.s).slice(0, n).map(x => x.c);
    const v = vars(entry, opts), isCTD = entry.cls === "CTD";
    return picked.map(c => {
      let acts = c.acts.map(id => ACTIVITIES.find(a => a.id === id)).filter(a => a && fits(a, C) && (!a.ctdOnly || isCTD));
      if (isCTD && c.tags !== "all" && !acts.some(a => a.id === "electro") && acts.length < 4) acts.push(ACTIVITIES.find(a => a.id === "electro"));
      if (opts.aud && opts.aud !== "any") acts.sort((a, b) => (b.aud.includes(opts.aud) ? 1 : 0) - (a.aud.includes(opts.aud) ? 1 : 0));
      const fixed = c.cost.fixed.reduce((s, x) => s + x[1], 0), perDoc = c.cost.perDoc.reduce((s, x) => s + x[1], 0);
      return {
        id: c.id, name: c.name, tagline: fill(c.tagline, v), insight: fill(c.insight, v), idea: fill(c.idea, v), visual: c.visual,
        months: c.months, phases: c.phases.map(p => ({ t: p.t, m: p.m, d: fill(p.d, v) })), channels: c.channels.slice(),
        obj: c.obj.map(o => OBJ[o]), fit: c.fit[orient] || 0,
        cost: { fixedItems: c.cost.fixed.map(x => x.slice()), perDocItems: c.cost.perDoc.map(x => x.slice()), fixed, perDoc },
        assume: Object.assign({}, DEFAULTS, c.roi, { fixedCost: fixed, perDocCost: perDoc, ramp: Math.min(3, c.months) }),
        activities: acts.map(a => fillAct(a, v, orient))
      };
    });
  }

  /* ---------- 7. ROI model ----------
     Month by month for `months` (default 12):
       adopters(t) = doctors × conv × min(1, t / ramp)          adopting doctors ramp up
       new(t)      = adopters(t) × ppm                           new patients started
       active(t)   = active(t−1) × persist + new(t)              patients still on therapy
       revenue(t)  = active(t) × revPPM ;  profit(t) = revenue(t) × margin
     Investment = fixed cost (month 1) + per-doctor cost × doctors (spread over campaign months).
     ROI = (gross profit − investment) / investment. Payback = first month cumulative profit ≥ cumulative spend. */
  function roi(a) {
    const months = a.months || 12, ramp = Math.max(1, a.ramp || 3), run = Math.max(1, a.campaignMonths || 3);
    const invest = a.fixedCost + a.perDocCost * a.doctors;
    let active = 0, cumP = 0, cumR = 0, cumC = 0, payback = null, newTotal = 0, ptMonths = 0;
    const rows = [];
    for (let t = 1; t <= months; t++) {
      const adopters = a.doctors * a.conv * Math.min(1, t / ramp);
      const nw = adopters * a.ppm;
      active = active * a.persist + nw;
      const rev = active * a.revPPM, prof = rev * a.margin;
      const spend = (t === 1 ? a.fixedCost : 0) + (t <= run ? a.perDocCost * a.doctors / run : 0);
      cumP += prof; cumR += rev; cumC += spend; newTotal += nw; ptMonths += active;
      if (payback == null && cumP >= cumC) payback = t;
      rows.push({ t, adopters, nw, active, rev, prof, spend, cumP, cumC });
    }
    const roiPct = invest ? (cumP - invest) / invest * 100 : 0;
    return { invest, revenue: cumR, profit: cumP, net: cumP - invest, roiPct, perRupee: invest ? cumP / invest : 0, payback,
      adopters: a.doctors * a.conv, newPatients: newTotal, activeEnd: active, patientMonths: ptMonths,
      breakEvenConv: cumP ? a.conv * invest / cumP : null, rows };
  }
  function scenarios(a) {
    return [["Cautious", 0.6, 0.97], ["Base", 1, 1], ["Strong", 1.4, 1.01]].map(([label, k, pk]) => {
      const r = roi(Object.assign({}, a, { conv: a.conv * k, persist: Math.min(0.97, a.persist * pk) }));
      return { label, conv: a.conv * k, r };
    });
  }

  window.BrandStudio = { CTX, STORY, ORIENT, ACTIVITIES, CAMPAIGNS, OBJ, AUD, audOf, generate, generateCampaigns, strategy, roi, scenarios, DEFAULTS };
})();
