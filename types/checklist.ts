export interface Field {
  name: string
  label: string
  type: 'yn' | 'yn_na' | 'text' | 'date'
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

export type RawFormData = Record<string, any>
