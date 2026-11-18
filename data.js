/*
  Cardio-Diabetic Brand Desk — market data
  -----------------------------------------
  Edit this file on GitHub to update the site for everyone.

  For each brand:
    doses       available strengths, shown next to the brand name
    revenue_cr  last-year revenue in ₹ crore (MAT from AWACS / PharmaTrac / Pharmarack). Leave null if unknown.
    period      the period the revenue refers to, e.g. "MAT Mar 2026"

  Brands are ranked by revenue_cr (highest first). Brands without revenue
  are listed after them, in the order written here.

  Built-in revenue is filled only where a public source exists.
  Everything else is left for you to add from your audit data.
*/
window.CDBD_DATA = {
  version: "2026.11b",
  molecules: [
    {
      name: "Dapagliflozin", cls: "SGLT2", aliases: ["dapa"],
      ind: ["Type 2 diabetes", "Heart failure", "Chronic kidney disease"],
      evidence: ["DECLARE-TIMI 58", "DAPA-HF", "DAPA-CKD", "DELIVER"],
      status: "Off-patent; many generic brands since 2022",
      brands: [
        { brand: "Forxiga", company: "AstraZeneca", doses: ["5 mg", "10 mg"], revenue_cr: null, period: "" },
        { brand: "Oxra", company: "Sun Pharma", doses: ["5 mg", "10 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Empagliflozin", cls: "SGLT2", aliases: ["empa"],
      ind: ["Type 2 diabetes", "Heart failure", "Chronic kidney disease"],
      evidence: ["EMPA-REG OUTCOME", "EMPEROR-Reduced", "EMPEROR-Preserved", "EMPA-KIDNEY"],
      status: "Off-patent since 2025; wave of generic launches",
      brands: [
        { brand: "Jardiance", company: "Boehringer Ingelheim", doses: ["10 mg", "25 mg"], revenue_cr: null, period: "" },
        { brand: "Gibtulio", company: "Lupin", doses: ["10 mg", "25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Empagliflozin + Linagliptin", cls: "SGLT2", aliases: ["empa lina"],
      ind: ["Type 2 diabetes"],
      evidence: ["EMPA-REG OUTCOME", "CARMELINA"],
      status: "Generic entry following empagliflozin patent expiry",
      brands: [
        { brand: "Glyxambi", company: "Boehringer Ingelheim", doses: ["10/5 mg", "25/5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Sitagliptin", cls: "DPP4", aliases: ["sita"],
      ind: ["Type 2 diabetes"],
      evidence: ["TECOS"],
      status: "Off-patent since 2022; heavily genericised",
      brands: [
        { brand: "Januvia", company: "MSD", doses: ["25 mg", "50 mg", "100 mg"], revenue_cr: null, period: "" },
        { brand: "Istavel", company: "Sun Pharma", doses: ["25 mg", "50 mg", "100 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Sitagliptin + Metformin", cls: "DPP4", aliases: ["sita met"],
      ind: ["Type 2 diabetes"],
      evidence: ["TECOS"],
      status: "Off-patent; large, competitive FDC market",
      brands: [
        { brand: "Janumet", company: "MSD", doses: ["50/500 mg", "50/1000 mg", "XR 100/1000 mg"], revenue_cr: null, period: "" },
        { brand: "Istamet", company: "Sun Pharma", doses: ["50/500 mg", "50/1000 mg", "XR 100/1000 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Vildagliptin + Metformin", cls: "DPP4", aliases: ["vilda met"],
      ind: ["Type 2 diabetes"],
      evidence: ["VERIFY"],
      status: "Off-patent",
      brands: [
        { brand: "Galvus Met", company: "Novartis", doses: ["50/500 mg", "50/850 mg", "50/1000 mg"], revenue_cr: null, period: "" },
        { brand: "Jalra-M", company: "USV", doses: ["50/500 mg", "50/850 mg", "50/1000 mg"], revenue_cr: null, period: "" },
        { brand: "Zomelis Met", company: "Sun Pharma", doses: ["50/500 mg", "50/850 mg", "50/1000 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Linagliptin", cls: "DPP4", aliases: ["lina"],
      ind: ["Type 2 diabetes"],
      evidence: ["CARMELINA", "CAROLINA"],
      usp: "No dose adjustment in renal impairment",
      status: "Check current generic status",
      brands: [
        { brand: "Trajenta", company: "Boehringer Ingelheim", doses: ["5 mg"], revenue_cr: null, period: "" },
        { brand: "Ondero", company: "Lupin", doses: ["5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Glimepiride + Metformin", cls: "SUMET", aliases: ["glim met", "glimepiride metformin"],
      ind: ["Type 2 diabetes"],
      evidence: ["Decades of clinical use"],
      status: "Mature, high-volume generic market",
      brands: [
        { brand: "Glycomet-GP", company: "USV", doses: ["0.5/500 mg", "1/500 mg", "2/500 mg", "1/1000 mg", "2/1000 mg"], revenue_cr: 828, period: "MAT Aug 2025 (public industry report)" },
        { brand: "Amaryl M", company: "Sanofi", doses: ["1/500 mg", "2/500 mg"], revenue_cr: null, period: "" },
        { brand: "Gemer", company: "Sun Pharma", doses: ["1/500 mg", "2/500 mg"], revenue_cr: null, period: "" },
        { brand: "Zoryl-M", company: "Intas", doses: ["1/500 mg", "2/500 mg"], revenue_cr: null, period: "" },
        { brand: "Glimisave-M", company: "Eris", doses: ["1/500 mg", "2/500 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Metformin", cls: "BIG", aliases: [],
      ind: ["Type 2 diabetes", "Prediabetes", "PCOS"],
      evidence: ["UKPDS"],
      status: "Mature generic",
      brands: [
        { brand: "Glycomet", company: "USV", doses: ["250 mg", "500 mg", "850 mg", "SR 500 mg", "SR 1000 mg"], revenue_cr: null, period: "" },
        { brand: "Glyciphage", company: "Franco-Indian", doses: ["500 mg", "850 mg", "SR 1000 mg"], revenue_cr: null, period: "" },
        { brand: "Obimet", company: "Abbott", doses: ["500 mg", "850 mg", "SR 1000 mg"], revenue_cr: null, period: "" },
        { brand: "Cetapin", company: "Sanofi", doses: ["XR 500 mg", "XR 1000 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan", cls: "ARB", aliases: ["telmi"],
      ind: ["Hypertension", "Cardiovascular risk reduction"],
      evidence: ["ONTARGET"],
      status: "Mature generic",
      brands: [
        { brand: "Telma", company: "Glenmark", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Telsartan", company: "Dr. Reddy's", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Tazloc", company: "USV", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Telmikind", company: "Mankind", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Cresar", company: "Cipla", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Telvas", company: "Aristo", doses: ["20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan + Amlodipine", cls: "ARB", aliases: ["telmi amlo"],
      ind: ["Hypertension"],
      evidence: ["ONTARGET (telmisartan)", "ALLHAT (amlodipine)"],
      status: "Mature generic FDC",
      brands: [
        { brand: "Telma-AM", company: "Glenmark", doses: ["40/5 mg", "80/5 mg"], revenue_cr: null, period: "" },
        { brand: "Telsartan-AM", company: "Dr. Reddy's", doses: ["40/5 mg"], revenue_cr: null, period: "" },
        { brand: "Tazloc-AM", company: "USV", doses: ["40/5 mg"], revenue_cr: null, period: "" },
        { brand: "Telmikind-AM", company: "Mankind", doses: ["40/5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Rosuvastatin", cls: "STATIN", aliases: ["rosu"],
      ind: ["Dyslipidaemia", "ASCVD prevention"],
      evidence: ["JUPITER", "HOPE-3"],
      status: "Mature generic",
      brands: [
        { brand: "Rosuvas", company: "Sun Pharma", doses: ["5 mg", "10 mg", "20 mg", "40 mg"], revenue_cr: null, period: "" },
        { brand: "Rozavel", company: "Sun Pharma", doses: ["5 mg", "10 mg", "20 mg"], revenue_cr: null, period: "" },
        { brand: "Rozucor", company: "Torrent", doses: ["5 mg", "10 mg", "20 mg", "40 mg"], revenue_cr: null, period: "" },
        { brand: "Crestor", company: "AstraZeneca", doses: ["5 mg", "10 mg", "20 mg"], revenue_cr: null, period: "" },
        { brand: "Rozat", company: "Lupin", doses: ["5 mg", "10 mg", "20 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Atorvastatin", cls: "STATIN", aliases: ["atorva"],
      ind: ["Dyslipidaemia", "ASCVD prevention"],
      evidence: ["ASCOT-LLA", "CARDS", "TNT"],
      status: "Mature generic",
      brands: [
        { brand: "Atorva", company: "Zydus", doses: ["10 mg", "20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Storvas", company: "Sun Pharma", doses: ["10 mg", "20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" },
        { brand: "Tonact", company: "Lupin", doses: ["10 mg", "20 mg", "40 mg"], revenue_cr: null, period: "" },
        { brand: "Lipvas", company: "Cipla", doses: ["10 mg", "20 mg", "40 mg"], revenue_cr: null, period: "" },
        { brand: "Atocor", company: "Dr. Reddy's", doses: ["10 mg", "20 mg", "40 mg"], revenue_cr: null, period: "" },
        { brand: "Aztor", company: "Sun Pharma", doses: ["10 mg", "20 mg", "40 mg", "80 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Sacubitril + Valsartan", cls: "ARNI", aliases: ["arni", "sacu val"],
      ind: ["Heart failure with reduced ejection fraction"],
      evidence: ["PARADIGM-HF", "PIONEER-HF"],
      status: "Check current patent and generic status",
      brands: [
        { brand: "Vymada", company: "Novartis", doses: ["24/26 mg", "49/51 mg", "97/103 mg"], revenue_cr: null, period: "" },
        { brand: "Azmarda", company: "Lupin", doses: ["24/26 mg", "49/51 mg", "97/103 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Ticagrelor", cls: "ANTIPLT", aliases: ["ticag"],
      ind: ["Acute coronary syndrome", "After PCI"],
      evidence: ["PLATO", "PEGASUS-TIMI 54"],
      status: "Generic",
      brands: [
        { brand: "Brilinta", company: "AstraZeneca", doses: ["60 mg", "90 mg"], revenue_cr: null, period: "" },
        { brand: "Axcer", company: "Sun Pharma", doses: ["90 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Metoprolol Succinate", cls: "BB", aliases: ["metoprolol", "meto"],
      ind: ["Hypertension", "Heart failure", "Angina"],
      evidence: ["MERIT-HF"],
      status: "Mature generic",
      brands: [
        { brand: "Metolar XR", company: "Cipla", doses: ["12.5 mg", "25 mg", "50 mg"], revenue_cr: null, period: "" },
        { brand: "Prolomet XL", company: "Sun Pharma", doses: ["25 mg", "50 mg", "100 mg"], revenue_cr: null, period: "" },
        { brand: "Seloken XL", company: "AstraZeneca", doses: ["25 mg", "50 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Cilnidipine", cls: "CCB", aliases: ["cilni"],
      ind: ["Hypertension"],
      evidence: ["L/N-type calcium channel blockade"],
      usp: "Less pedal oedema than amlodipine",
      status: "Generic",
      brands: [
        { brand: "Cilacar", company: "J B Chemicals", doses: ["5 mg", "10 mg", "20 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Saroglitazar", cls: "GLITAZAR", aliases: ["saro"],
      ind: ["Diabetic dyslipidaemia", "NAFLD / MASLD"],
      evidence: ["PRESS V", "PRESS VI", "EVIDENCES trials"],
      status: "Innovator brands (Zydus)",
      brands: [
        { brand: "Lipaglyn", company: "Zydus", doses: ["4 mg"], revenue_cr: null, period: "" },
        { brand: "Bilypsa", company: "Zydus", doses: ["4 mg"], revenue_cr: null, period: "" }
      ]
    },
    /* ---------- CTD series: Chlorthalidone and its combinations ----------
       Brands and strengths checked against Indian pharmacy listings, Nov 2026.
       Strengths follow the order of the molecule name (e.g. Telmisartan/Amlodipine/Chlorthalidone). */
    {
      name: "Chlorthalidone", cls: "CTD", aliases: ["ctd", "chlortalidone", "chlorthalidone mono"],
      ind: ["Hypertension", "Oedema"],
      evidence: ["ALLHAT", "SHEP", "CLICK (stage 4 CKD)"],
      usp: "Thiazide-like diuretic with a 40–60 hour half-life: BP cover well beyond 24 hours",
      status: "Generic; low-dose 6.25 mg and 12.5 mg dominate",
      brands: [
        { brand: "CTD", company: "Ipca", doses: ["6.25 mg", "12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Thaloric", company: "Zuventus", doses: ["6.25 mg", "12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Lupiclor", company: "Lupin", doses: ["6.25 mg", "12.5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan + Chlorthalidone", cls: "CTD", aliases: ["telmi ctd", "telmi ch", "telmi ct", "telmisartan ctd"],
      ind: ["Hypertension"],
      evidence: ["ONTARGET (telmisartan)", "ALLHAT (chlorthalidone)", "ISH 2020 / ESH 2023 combination guidance"],
      usp: "ARB plus a long-acting thiazide-like diuretic in one tablet",
      patient: "Adults with hypertension not at goal on an ARB alone, including people with diabetes, obesity or salt-sensitive BP.",
      status: "Generic; crowded FDC segment",
      brands: [
        { brand: "Telma-CT", company: "Glenmark", doses: ["40/6.25 mg", "40/12.5 mg", "80/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Telmikind-CT", company: "Mankind", doses: ["40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Tazloc-CT", company: "USV", doses: ["40/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Cresar-CT", company: "Cipla", doses: ["40/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Telista-CH", company: "Lupin", doses: ["40/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Telsar-CH", company: "Torrent", doses: ["40/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Eritel-CH", company: "Eris", doses: ["40/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "CTD-T", company: "Ipca", doses: ["40/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan + Amlodipine + Chlorthalidone", cls: "CTD",
      aliases: ["telmi amlo ctd", "telmi ctd amlo", "telmi amlo ch", "telmisartan amlodipine chlorthalidone", "triple pill", "tac"],
      ind: ["Hypertension (triple therapy)"],
      evidence: ["ISH 2020 (single-pill triple therapy)", "ESH 2023", "ALLHAT (amlodipine, chlorthalidone)"],
      usp: "Guideline triple combination (ARB + CCB + thiazide-like diuretic) in one tablet",
      patient: "Adults with hypertension not controlled on two drugs, or taking three separate BP tablets today.",
      status: "Generic; many triple-FDC brands launched",
      brands: [
        { brand: "Telma-ACT", company: "Glenmark", doses: ["40/5/6.25 mg", "40/5/12.5 mg", "80/5/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Tritelsar", company: "Torrent", doses: ["40/5/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Telista Trio", company: "Lupin", doses: ["40/5/12.5 mg", "80/5/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Amlopres 3D", company: "Cipla", doses: ["40/5/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Tellzy-ACH", company: "Alembic", doses: ["40/5/12.5 mg", "80/5/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Eritel-CH Trio", company: "Eris", doses: ["80/5/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "CTD-T AM", company: "Ipca", doses: ["80/5/12.5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan + Cilnidipine + Chlorthalidone", cls: "CTD", aliases: ["telmi cilni ctd", "telmi cilni ch"],
      ind: ["Hypertension (triple therapy)"],
      evidence: ["ISH 2020 (single-pill triple therapy)", "L/N-type calcium channel blockade"],
      usp: "Triple therapy with cilnidipine for less pedal oedema than amlodipine",
      patient: "Adults needing triple BP therapy who had ankle swelling on amlodipine, or with diabetes and proteinuria.",
      status: "Generic; few brands so far",
      brands: [
        { brand: "Cilacar-TC", company: "J B Chemicals", doses: ["40/10/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Olmesartan + Chlorthalidone", cls: "CTD", aliases: ["olme ctd", "olmesartan ctd", "olme ch"],
      ind: ["Hypertension"],
      evidence: ["ALLHAT (chlorthalidone)", "ESH 2023 combination guidance"],
      usp: "Potent ARB with a long-acting thiazide-like diuretic",
      patient: "Adults with hypertension not at goal on an ARB alone.",
      status: "Generic",
      brands: [
        { brand: "Olmax-CH", company: "Glenmark", doses: ["20/12.5 mg", "40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "CTD-O", company: "Ipca", doses: ["10/6.25 mg", "20/6.25 mg", "40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olmezest-CH", company: "Sun Pharma", doses: ["20/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olsar-CH", company: "Torrent", doses: ["20/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olmesar-CH", company: "Macleods", doses: ["20/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olmin-CH", company: "Eris", doses: ["20/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olkem-CT", company: "Alkem", doses: ["20/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Olmetrack-CT", company: "USV", doses: ["20/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Azilsartan + Chlorthalidone", cls: "CTD", aliases: ["azil ctd", "azilsartan ctd", "azil ch"],
      ind: ["Hypertension"],
      evidence: ["Azilsartan/chlorthalidone phase 3 BP trials", "ALLHAT (chlorthalidone)"],
      usp: "Newest ARB paired with a long-acting thiazide-like diuretic",
      patient: "Adults with stage 2 or uncontrolled hypertension who need strong 24-hour BP lowering.",
      status: "Generic in India",
      brands: [
        { brand: "Asar-CT", company: "Glenmark", doses: ["40/6.25 mg", "40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Zilarbi-CT", company: "Emcure", doses: ["40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Zilarta-CT", company: "Micro Labs", doses: ["40/6.25 mg", "40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Aztric-CT", company: "Intas", doses: ["40/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Myotan-CT", company: "J B Chemicals", doses: ["40/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Cilnidipine + Chlorthalidone", cls: "CTD", aliases: ["cilni ctd", "cilni ch", "cilnidipine ctd"],
      ind: ["Hypertension"],
      evidence: ["L/N-type calcium channel blockade", "ALLHAT (chlorthalidone)"],
      usp: "Less pedal oedema than amlodipine-based combinations",
      patient: "Adults with hypertension who need a CCB-diuretic pair, especially those prone to ankle swelling.",
      status: "Generic",
      brands: [
        { brand: "Cilacar-C", company: "J B Chemicals", doses: ["10/6.25 mg", "10/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "CTD-C", company: "Ipca", doses: ["10/6.25 mg", "10/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Cilnikem-CT", company: "Alkem", doses: ["10/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Ciledge-CT", company: "Cadila Pharmaceuticals", doses: ["10/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Cilnep-CH", company: "Leeford", doses: ["10/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Natcocil-CT", company: "Natco", doses: ["10/12.5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Metoprolol Succinate + Chlorthalidone", cls: "CTD", aliases: ["meto ctd", "metoprolol ctd", "meto ch"],
      ind: ["Hypertension", "Hypertension with high heart rate or IHD"],
      evidence: ["MERIT-HF (metoprolol)", "ALLHAT (chlorthalidone)"],
      usp: "Heart-rate control and long-acting diuresis in one tablet",
      patient: "Adults with hypertension and a high resting heart rate, angina or a past heart attack.",
      status: "Generic",
      brands: [
        { brand: "CTD-M", company: "Ipca", doses: ["25/6.25 mg", "50/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Vinicor-D", company: "Ipca", doses: ["25/6.25 mg", "50/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Revelol-CH", company: "Ipca", doses: ["25/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Telmisartan + Metoprolol Succinate + Chlorthalidone", cls: "CTD", aliases: ["telmi meto ctd", "telmi meto ch"],
      ind: ["Hypertension (triple therapy)", "Hypertension with high heart rate"],
      evidence: ["ONTARGET (telmisartan)", "MERIT-HF (metoprolol)", "ALLHAT (chlorthalidone)"],
      usp: "Triple therapy for patients who also need a beta blocker",
      patient: "Adults with uncontrolled hypertension and a high heart rate or coronary disease.",
      status: "Generic",
      brands: [
        { brand: "Met XL 3D", company: "Ajanta", doses: ["40/25/6.25 mg", "40/50/6.25 mg", "40/25/12.5 mg", "40/50/12.5 mg"], revenue_cr: null, period: "" },
        { brand: "Telma-MCT", company: "Glenmark", doses: ["40/50/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "CTD-MT", company: "Ipca", doses: ["40/50/6.25 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Atenolol + Chlorthalidone", cls: "CTD", aliases: ["aten ctd", "atenolol ctd", "aten ch"],
      ind: ["Hypertension"],
      evidence: ["SHEP (chlorthalidone-based)", "Decades of clinical use"],
      usp: "Established beta blocker-diuretic pair, now with low-dose 6.25 mg options",
      patient: "Adults with hypertension already established on a beta blocker-diuretic regimen.",
      status: "Mature generic",
      brands: [
        { brand: "Tenoric", company: "Ipca", doses: ["25/12.5 mg", "50/12.5 mg", "100/25 mg"], revenue_cr: null, period: "" },
        { brand: "Tenoric-LD", company: "Ipca", doses: ["25/6.25 mg", "50/6.25 mg"], revenue_cr: null, period: "" },
        { brand: "Tenoclor", company: "Abbott", doses: ["25/12.5 mg", "50/12.5 mg"], revenue_cr: null, period: "" }
      ]
    },
    {
      name: "Finerenone", cls: "MRA", aliases: ["fine"],
      ind: ["CKD with type 2 diabetes"],
      evidence: ["FIDELIO-DKD", "FIGARO-DKD"],
      status: "Check current patent status",
      brands: [
        { brand: "Kerendia", company: "Bayer", doses: ["10 mg", "20 mg"], revenue_cr: null, period: "" }
      ]
    }
  ]
};
