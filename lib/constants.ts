import { ChecklistSection } from '@/types/checklist'

export const CHECKLIST_SECTIONS: ChecklistSection = {
  'General Wound Information': [
    { name: 'chronic_wound_4wks', label: 'Chronic wound lasting >4 weeks', type: 'yn' },
    { name: 'measurement_4wks_ago', label: 'Measurement 4 weeks ago', type: 'text' },
    { name: 'current_measurement', label: 'Current measurement', type: 'text' },
    { name: 'wound_decreased_50', label: 'Has wound decreased by 50% over the last 4 weeks', type: 'yn' },
    { name: 'failed_response', label: 'Failed response to conservative care (offloading, compression, antibiotics, debridement, appropriate dressing)', type: 'yn' },
    { name: 'wound_clean', label: 'The wound is clean and free of infection', type: 'yn' },
    { name: 'culture_date', label: 'Most recent culture date', type: 'date' },
    { name: 'infection_confirmed', label: 'If the infection is confirmed', type: 'yn' },
    { name: 'rx_iv_date', label: 'Date RX/IV therapy prescribed', type: 'date' },
    { name: 'adequate_circulation', label: 'Adequate circulation (e.g., ABI ≥ 0.60, toe pressure >30 mmHg)', type: 'yn' },
    { name: 'referred_for_abi', label: 'If ABI ABNORMAL, the patient is referred to', type: 'text' },
    { name: 'abi_test_date', label: 'Date of test', type: 'date' },
    { name: 'abi_results', label: 'ABI test results', type: 'text' },
    { name: 'surgery_needed', label: 'Intervention or surgery needed', type: 'yn' },
    { name: 'surgery_date', label: 'Date of surgery and procedure performed', type: 'date' }
  ],
  'Diabetic Foot Ulcers (DFUs)': [
    { name: 'dfu_present', label: 'Presence of diabetic foot ulcer for at least 4 weeks', type: 'yn' },
    { name: 'diabetes_type1_or_2', label: 'Diagnosis of Type 1 or Type 2 diabetes', type: 'yn' },
    { name: 'active_diabetes_mgmt', label: 'Evidence of active medical management of diabetes', type: 'yn' },
    { name: 'offloading_measures', label: 'Offloading measures in use', type: 'text' },
    { name: 'edema_control', label: 'Control of edema, venous hypertension, or lymphedema', type: 'yn_na' },
    { name: 'edema_explanation', label: 'If yes, explain', type: 'text' },
    { name: 'underlying_issues_eliminated', label: 'Elimination of underlying cellulitis, osteomyelitis, foreign body, or malignancy', type: 'yn' },
    { name: 'xray_mri_date', label: 'X-Ray/MRI date', type: 'date' },
    { name: 'imaging_results', label: 'Results', type: 'text' },
    { name: 'debridement_done', label: 'Appropriate debridement of necrotic tissue or foreign body (e.g., exposed bone or tendon)', type: 'yn' }
  ],
  'Venous Stasis Ulcers (VSUs)': [
    { name: 'vsu_present', label: 'Presence of venous stasis ulcer for at least 4 weeks', type: 'yn' },
    { name: 'referred_for_venous_insufficiency', label: 'If venous insufficiency is present, the patient is referred to', type: 'text' },
    { name: 'vascular_assessment_results', label: 'Results of vascular assessment (e.g., ABI, toe pressure)', type: 'text' },
    { name: 'vascular_test_date', label: 'Test date', type: 'date' },
    { name: 'vsu_abi_results', label: 'ABI results', type: 'text' },
    { name: 'vsu_surgery_date', label: 'If intervention is needed, date of surgery', type: 'date' },
    { name: 'compression_provided', label: 'Compression therapy provided (≥20 mmHg pressure)', type: 'yn' },
    { name: 'compression_start_date', label: 'Start date', type: 'date' },
    { name: 'compression_tolerance_explanation', label: 'If <20 mmHg, clinical explanation for tolerance issues', type: 'text' },
    { name: 'vsu_wound_free_infection', label: 'Wound free of infection', type: 'yn' },
    { name: 'vsu_culture_date', label: 'Most recent culture date', type: 'date' },
    { name: 'healing_environment_provided', label: 'Provision of wound environment to promote healing', type: 'yn' }
  ],
  'Other Wound Types': [
    { name: 'other_offloading_measures', label: 'Offloading measures documented', type: 'yn' },
    { name: 'xray_bony_area', label: 'If there is a wound in the bony prominence area, an x-ray is taken', type: 'yn_na' },
    { name: 'xray_date', label: 'If yes, date of x-ray', type: 'date' },
    { name: 'xray_results', label: 'Imaging results', type: 'text' },
    { name: 'other_wound_free_infection', label: 'Wound free of infection', type: 'yn' },
    { name: 'other_culture_date', label: 'Most recent culture date', type: 'date' }
  ],
  'Smoking Status': [
    { name: 'smoking_counseling', label: 'Smoking cessation counseling and measures documented', type: 'yn' }
  ],
  'Additional Notes': [
    { name: 'doctor_notes', label: 'Notes from Doctor', type: 'text' },
    { name: 'general_notes', label: 'Notes General', type: 'text' }
  ]
}
