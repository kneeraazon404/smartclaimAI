'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-hot-toast'

interface Field {
  name: string
  label: string
  type: 'yn' | 'yn_na' | 'text' | 'date'
}

interface ChecklistSection {
  [section: string]: Field[]
}

interface EvaluationResult {
  [key: string]: {
    status: 'pass' | 'fail'
    reason: string
  }
}

export default function Page() {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [result, setResult] = useState<{ evaluation: EvaluationResult } | null>(null)
  const [loading, setLoading] = useState(false)

  const normalizeValue = (value: string): string => {
    const v = value?.toLowerCase().trim()
    if (v === 'y' || v === 'yes') return 'yes'
    if (v === 'n' || v === 'no') return 'no'
    if (v === 'na') return 'na'
    return value
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const defaultData: Record<string, any> = { username: 'admin' }

    Object.values(checklist).flat().forEach(({ name, type }) => {
      const raw = formData[name]
      if (type === 'yn' || type === 'yn_na') {
        defaultData[name] = normalizeValue(raw || '')
      } else {
        defaultData[name] = raw || ''
      }
    })

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultData),
      })
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'An unexpected error occurred')
        setLoading(false)
        return
      }

      setResult(data)
      setFormData(defaultData)
    } catch (err) {
      toast.error('Network or server error')
    } finally {
      setLoading(false)
    }
  }

  const checklist: ChecklistSection = {
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

  const LoadingOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-green-800 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="text-gray-800 font-semibold">Evaluating checklist, please wait...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-800 flex flex-col border-2 border-emerald-800 rounded justify-items-end-safe justify-around max-w-7xl mx-auto shadow-lg m-8">
      {loading && <LoadingOverlay />}

      <form onSubmit={handleSubmit} className="w-full max-w-full bg-white rounded px-8 py-4 space-y-4 shadow-2xl">
        {Object.entries(checklist).map(([category, fields]) => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4 text-gray-800">{category}</h2>
            <div className="border-b-2 border-green-800 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {fields.map(({ name, label, type }) => {
                const evaluation = result?.evaluation?.[name]
                const statusClass = evaluation
                  ? evaluation.status === 'pass'
                    ? 'border-green-500 text-green-800'
                    : 'border-red-500 text-red-800'
                  : ''

                const useTextarea = ['doctor_notes', 'general_notes', 'edema_explanation'].includes(name)

                return (
                  <div key={name} className="flex flex-col">
                    <label htmlFor={name} className={`text-base font-medium mb-1 ${statusClass}`}>
                      {label} {type === 'yn_na' ? '(Y / NA)' : type === 'yn' ? '(Y / N)' : ''}
                    </label>
                    {type === 'date' ? (
                      <input
                        type="date"
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleChange}
                        className={`border p-2 rounded ${statusClass}`}
                      />
                    ) : useTextarea ? (
                      <textarea
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleChange}
                        rows={3}
                        className={`border p-2 rounded resize-y ${statusClass}`}
                      />
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={formData[name] || ''}
                        onChange={handleChange}
                        placeholder={type === 'yn_na' ? 'Y / NA' : type === 'yn' ? 'Y / N' : ''}
                        className={`border p-2 rounded ${statusClass}`}
                      />
                    )}
                    {evaluation?.status === 'fail' && (
                      <span className="text-red-600 text-sm mt-1">{evaluation.reason}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <button type="submit" disabled={loading} className="bg-green-900 text-white px-6 py-3 rounded font-semibold">
          {loading ? 'Evaluating...' : 'Submit for Evaluation'}
        </button>
      </form>
    </main>
  )
}
