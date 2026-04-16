import { ChecklistSection } from "@/types/checklist";

/** Short labels for the step indicator (section names are too long to display inline) */
export const SECTION_ABBREVIATIONS: Record<string, string> = {
  "General Wound Information": "General",
  "Diabetic Foot Ulcers (DFUs)": "DFUs",
  "Venous Stasis Ulcers (VSUs)": "VSUs",
  "Other Wound Types": "Other",
  "Smoking Status": "Smoking",
  "Additional Notes": "Notes",
};

export const CHECKLIST_SECTIONS: ChecklistSection = {
  "General Wound Information": [
    {
      name: "chronic_wound_4wks",
      label: "Chronic wound lasting >4 weeks",
      type: "yn",
      hint: "Per LCD L35041: the wound must be present for at least 4 weeks prior to the application of a skin substitute or CTP to qualify for Medicare coverage.",
    },
    {
      name: "measurement_4wks_ago",
      label: "Measurement 4 weeks ago",
      type: "text",
      hint: "Document wound dimensions (length × width × depth in cm) from 4 weeks prior to today's visit. Required to demonstrate wound chronicity.",
    },
    {
      name: "current_measurement",
      label: "Current measurement",
      type: "text",
      hint: "Current wound dimensions (length × width × depth in cm). Used to calculate the 50% size reduction threshold over the prior 4 weeks.",
    },
    {
      name: "wound_decreased_50",
      label: "Has wound decreased by ≥50% over the last 4 weeks",
      type: "yn",
      hint: "LCD requirement: if the wound has already decreased by 50% or more, CTP application may not be justified — standard care may be sufficient.",
    },
    {
      name: "failed_response",
      label:
        "Failed response to conservative care (offloading, compression, antibiotics, debridement, appropriate dressing)",
      type: "yn",
      hint: "A documented 4-week trial of conservative wound care must precede CTP application. Specify which modalities were tried and why they failed.",
    },
    {
      name: "wound_clean",
      label: "The wound is clean and free of infection",
      type: "yn",
      hint: "CTPs cannot be applied to infected wounds. Document wound bed preparation status including any debridement completed prior to application.",
    },
    {
      name: "culture_date",
      label: "Most recent culture date",
      type: "date",
      hint: "Date of the most recent wound culture. Required if infection is suspected or if the wound has not responded to treatment.",
    },
    {
      name: "infection_confirmed",
      label: "If infection is confirmed",
      type: "yn",
      hint: "Select Yes only if a wound culture has confirmed active infection. Document antibiotic therapy if applicable.",
    },
    {
      name: "rx_iv_date",
      label: "Date RX/IV therapy prescribed",
      type: "date",
      hint: "If infection is confirmed, document the date antibiotic therapy (oral or IV) was prescribed.",
    },
    {
      name: "adequate_circulation",
      label: "Adequate circulation (e.g., ABI ≥ 0.60, toe pressure >30 mmHg)",
      type: "yn",
      hint: "Adequate arterial circulation is required for wound healing. ABI (Ankle-Brachial Index) ≥ 0.60 or toe pressure >30 mmHg generally indicates sufficient perfusion.",
    },
    {
      name: "referred_for_abi",
      label: "If ABI is abnormal, patient is referred to",
      type: "text",
      hint: "If ABI is <0.60 or toe pressure ≤30 mmHg, document the specialist (vascular surgeon, interventional radiologist) the patient is referred to for vascular evaluation.",
    },
    { name: "abi_test_date", label: "Date of ABI test", type: "date" },
    {
      name: "abi_results",
      label: "ABI test results",
      type: "text",
      hint: "Document the actual ABI value (e.g., 0.75 right, 0.80 left). Values below 0.60 indicate significant arterial insufficiency.",
    },
    {
      name: "surgery_needed",
      label: "Intervention or surgery needed",
      type: "yn",
      hint: "If vascular assessment indicates revascularization is needed, this must be documented and addressed before CTP application.",
    },
    {
      name: "surgery_date",
      label: "Date of surgery and procedure performed",
      type: "date",
    },
  ],
  "Diabetic Foot Ulcers (DFUs)": [
    {
      name: "dfu_present",
      label: "Presence of diabetic foot ulcer for at least 4 weeks",
      type: "yn",
      hint: "The DFU must be present and documented for a minimum of 4 weeks with failed standard care before CTPs are considered.",
    },
    {
      name: "diabetes_type1_or_2",
      label: "Diagnosis of Type 1 or Type 2 diabetes",
      type: "yn",
      hint: "The underlying diagnosis of diabetes must be documented. Include ICD-10 code (e.g., E11.x for Type 2) in the clinical note.",
    },
    {
      name: "active_diabetes_mgmt",
      label: "Evidence of active medical management of diabetes",
      type: "yn",
      hint: "Document current diabetes management: HbA1c level, medications (insulin, oral agents), and active collaboration with endocrinology or primary care.",
    },
    {
      name: "offloading_measures",
      label: "Offloading measures in use",
      type: "text",
      hint: "Document specific offloading devices: total contact cast (TCC), removable cast walker (RCW), custom-molded insoles, surgical shoe. TCC is the gold standard for DFU offloading.",
    },
    {
      name: "edema_control",
      label: "Control of edema, venous hypertension, or lymphedema",
      type: "yn_na",
      hint: "Select N/A if edema is not present. If present, document specific measures taken: compression, elevation, diuretics.",
    },
    {
      name: "edema_explanation",
      label: "If Yes, explain edema management approach",
      type: "text",
    },
    {
      name: "underlying_issues_eliminated",
      label:
        "Elimination of underlying cellulitis, osteomyelitis, foreign body, or malignancy",
      type: "yn",
      hint: "Document that imaging and/or biopsy has ruled out osteomyelitis, foreign body, and malignancy. These contraindications must be excluded before CTP use.",
    },
    {
      name: "xray_mri_date",
      label: "X-Ray/MRI date",
      type: "date",
      hint: "Date of the most recent plain radiograph or MRI. Required to rule out osteomyelitis in DFUs, especially those overlying bony prominences.",
    },
    { name: "imaging_results", label: "Imaging results", type: "text" },
    {
      name: "debridement_done",
      label:
        "Appropriate debridement of necrotic tissue or foreign body (e.g., exposed bone or tendon)",
      type: "yn",
      hint: "Wound bed preparation is required. Document the type and date of debridement (sharp, enzymatic, autolytic). The wound must be viable and free of devitalized tissue before CTP application.",
    },
  ],
  "Venous Stasis Ulcers (VSUs)": [
    {
      name: "vsu_present",
      label: "Presence of venous stasis ulcer for at least 4 weeks",
      type: "yn",
    },
    {
      name: "referred_for_venous_insufficiency",
      label: "If venous insufficiency is present, patient is referred to",
      type: "text",
      hint: "Document referral to vascular surgery or interventional radiology for venous duplex ultrasound and possible intervention (ablation, sclerotherapy).",
    },
    {
      name: "vascular_assessment_results",
      label: "Results of vascular assessment (e.g., ABI, toe pressure, venous duplex)",
      type: "text",
    },
    { name: "vascular_test_date", label: "Test date", type: "date" },
    { name: "vsu_abi_results", label: "ABI results", type: "text" },
    {
      name: "vsu_surgery_date",
      label: "If intervention is needed, date of surgery",
      type: "date",
    },
    {
      name: "compression_provided",
      label: "Compression therapy provided (≥20 mmHg pressure)",
      type: "yn",
      hint: "A minimum 4-week trial of adequate compression therapy (20–30 mmHg or 30–40 mmHg) is required before CTP use in VSUs. Four-layer bandaging or compression stockings are acceptable.",
    },
    {
      name: "compression_start_date",
      label: "Compression start date",
      type: "date",
    },
    {
      name: "compression_tolerance_explanation",
      label: "If <20 mmHg, clinical explanation for tolerance issues",
      type: "text",
      hint: "If the patient cannot tolerate standard compression, document the clinical reason (e.g., severe arterial disease with ABI <0.50, congestive heart failure).",
    },
    {
      name: "vsu_wound_free_infection",
      label: "Wound free of infection",
      type: "yn",
    },
    {
      name: "vsu_culture_date",
      label: "Most recent culture date",
      type: "date",
    },
    {
      name: "healing_environment_provided",
      label: "Provision of moist wound environment to promote healing",
      type: "yn",
      hint: "Document wound dressing choice that maintains a moist healing environment (e.g., hydrocolloid, foam, alginate). Moist wound healing is an evidence-based standard of care.",
    },
  ],
  "Other Wound Types": [
    {
      name: "other_offloading_measures",
      label: "Offloading measures documented",
      type: "yn",
    },
    {
      name: "xray_bony_area",
      label:
        "If there is a wound over a bony prominence, an x-ray has been taken",
      type: "yn_na",
      hint: "Select N/A if the wound is not over a bony prominence. If it is, an x-ray is required to rule out osteomyelitis.",
    },
    { name: "xray_date", label: "If Yes, date of x-ray", type: "date" },
    { name: "xray_results", label: "Imaging results", type: "text" },
    {
      name: "other_wound_free_infection",
      label: "Wound free of infection",
      type: "yn",
    },
    {
      name: "other_culture_date",
      label: "Most recent culture date",
      type: "date",
    },
  ],
  "Smoking Status": [
    {
      name: "smoking_counseling",
      label: "Smoking cessation counseling and measures documented",
      type: "yn",
      hint: "Smoking significantly impairs wound healing. Document counseling, pharmacotherapy (varenicline, bupropion, NRT), and referrals to cessation programs.",
    },
  ],
  "Additional Notes": [
    {
      name: "doctor_notes",
      label: "Notes from Provider",
      type: "text",
      hint: "Include any additional clinical context not captured in the structured fields: patient history, comorbidities, treatment rationale, or special circumstances.",
    },
    {
      name: "general_notes",
      label: "Other Notes",
      type: "text",
    },
  ],
};
