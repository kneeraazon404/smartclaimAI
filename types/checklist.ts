export interface Field {
  name: string
  label: string
  type: 'yn' | 'yn_na' | 'text' | 'date'
  /** Optional clinical hint shown as a tooltip on the form field */
  hint?: string
}

export interface ChecklistSection {
  [section: string]: Field[]
}

export interface EvaluationResult {
  [key: string]: {
    status: 'pass' | 'fail'
    reason: string
  }
}

export type RawFormData = Record<string, string>
