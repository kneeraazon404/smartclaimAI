import { z } from 'zod'

const ynSchema = z.enum(['y', 'n', 'yes', 'no', '']).optional()
const ynNaSchema = z.enum(['y', 'n', 'yes', 'no', 'na', '']).optional()

export const checklistSchema = z.object({
  // General Wound Information
  chronic_wound_4wks: ynSchema,
  measurement_4wks_ago: z.string().optional(),
  current_measurement: z.string().optional(),
  wound_decreased_50: ynSchema,
  failed_response: ynSchema,
  wound_clean: ynSchema,
  culture_date: z.string().optional(),
  infection_confirmed: ynSchema,
  rx_iv_date: z.string().optional(),
  adequate_circulation: ynSchema,
  referred_for_abi: z.string().optional(),
  abi_test_date: z.string().optional(),
  abi_results: z.string().optional(),
  surgery_needed: ynSchema,
  surgery_date: z.string().optional(),

  // Diabetic Foot Ulcers (DFUs)
  dfu_present: ynSchema,
  diabetes_type1_or_2: ynSchema,
  active_diabetes_mgmt: ynSchema,
  offloading_measures: z.string().optional(),
  edema_control: ynNaSchema,
  edema_explanation: z.string().optional(),
  underlying_issues_eliminated: ynSchema,
  xray_mri_date: z.string().optional(),
  imaging_results: z.string().optional(),
  debridement_done: ynSchema,

  // Venous Stasis Ulcers (VSUs)
  vsu_present: ynSchema,
  referred_for_venous_insufficiency: z.string().optional(),
  vascular_assessment_results: z.string().optional(),
  vascular_test_date: z.string().optional(),
  vsu_abi_results: z.string().optional(),
  vsu_surgery_date: z.string().optional(),
  compression_provided: ynSchema,
  compression_start_date: z.string().optional(),
  compression_tolerance_explanation: z.string().optional(),
  vsu_wound_free_infection: ynSchema,
  vsu_culture_date: z.string().optional(),
  healing_environment_provided: ynSchema,

  // Other Wound Types
  other_offloading_measures: ynSchema,
  xray_bony_area: ynNaSchema,
  xray_date: z.string().optional(),
  xray_results: z.string().optional(),
  other_wound_free_infection: ynSchema,
  other_culture_date: z.string().optional(),

  // Smoking Status
  smoking_counseling: ynSchema,

  // Additional Notes
  doctor_notes: z.string().optional(),
  general_notes: z.string().optional(),
})

export type ChecklistFormValues = z.infer<typeof checklistSchema>
