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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      { name: 'wound_decreased_50', label: 'Has wound decreased by 50% over 4 weeks', type: 'yn' },
      { name: 'failed_response', label: 'Failed conservative care', type: 'yn' },
      { name: 'wound_clean', label: 'The wound is clean and free of infection', type: 'yn' },
      { name: 'culture_date', label: 'Most recent culture date', type: 'date' },
      { name: 'infection_confirmed', label: 'Infection confirmed', type: 'yn' },
      { name: 'rx_iv_date', label: 'Date RX/IV therapy prescribed', type: 'date' }
    ],
    'Circulation Evaluation': [
      { name: 'adequate_circulation', label: 'Adequate circulation (ABI ≥ 0.60)', type: 'yn' },
      { name: 'referred_for_abi', label: 'If ABI ABNORMAL, referred to', type: 'text' },
      { name: 'abi_test_date', label: 'Date of ABI test', type: 'date' },
      { name: 'abi_results', label: 'ABI test results', type: 'text' },
      { name: 'surgery_needed', label: 'Intervention or surgery needed', type: 'yn' },
      { name: 'surgery_date', label: 'Date of surgery', type: 'date' },
      { name: 'surgery_details', label: 'Procedure performed', type: 'text' }
    ],
    'Diabetic Foot Ulcers (DFUs)': [
      { name: 'dfu_present', label: 'Presence of diabetic foot ulcer >4 weeks', type: 'yn' },
      { name: 'diabetes_type1_or_2', label: 'Diagnosis of Type 1 or 2 diabetes', type: 'yn' },
      { name: 'active_diabetes_mgmt', label: 'Active diabetes management', type: 'yn' },
      { name: 'offloading_measures', label: 'Offloading measures in use', type: 'text' },
      { name: 'edema_control', label: 'Control of edema, venous hypertension, or lymphedema', type: 'yn_na' },
      { name: 'edema_explanation', label: 'If yes, explain', type: 'text' },
      { name: 'underlying_issues_eliminated', label: 'Underlying issues eliminated', type: 'yn' },
      { name: 'xray_mri_date', label: 'X-Ray/MRI date', type: 'date' },
      { name: 'imaging_results', label: 'Imaging results', type: 'text' },
      { name: 'debridement_done', label: 'Debridement done', type: 'yn' }
    ],
    'Venous Stasis Ulcers (VSUs)': [
      { name: 'vsu_present', label: 'Venous stasis ulcer >4 weeks', type: 'yn' },
      { name: 'referred_for_venous_insufficiency', label: 'If venous insufficiency, referred to', type: 'text' },
      { name: 'vascular_assessment_results', label: 'Vascular assessment results', type: 'text' },
      { name: 'vascular_test_date', label: 'Vascular test date', type: 'date' },
      { name: 'vsu_abi_results', label: 'ABI results', type: 'text' },
      { name: 'vsu_surgery_date', label: 'If intervention needed, surgery date', type: 'date' },
      { name: 'compression_provided', label: 'Compression therapy provided', type: 'yn' },
      { name: 'compression_start_date', label: 'Compression start date', type: 'date' },
      { name: 'compression_tolerance_explanation', label: 'If <20 mmHg, reason for tolerance issues', type: 'text' },
      { name: 'vsu_wound_free_infection', label: 'Wound free of infection (VSU)', type: 'yn' },
      { name: 'vsu_culture_date', label: 'Most recent culture date (VSU)', type: 'date' },
      { name: 'healing_environment_provided', label: 'Healing environment provided', type: 'yn' }
    ],
    'Other Wound Types': [
      { name: 'other_offloading_measures', label: 'Other offloading measures documented', type: 'yn' },
      { name: 'xray_bony_area', label: 'X-ray for wound on bony prominence', type: 'yn_na' },
      { name: 'xray_date', label: 'Date of x-ray', type: 'date' },
      { name: 'xray_results', label: 'X-ray results', type: 'text' },
      { name: 'other_wound_free_infection', label: 'Other wound free of infection', type: 'yn' },
      { name: 'other_culture_date', label: 'Other most recent culture date', type: 'date' }
    ],
    'Smoking Status': [
      { name: 'smoking_counseling', label: 'Smoking cessation counseling provided', type: 'yn' }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-500 flex flex-col items-around justify-center max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-full bg-white border border-gray-200 rounded px-16 py-8 shadow-md space-y-8">
        {Object.entries(checklist).map(([category, fields]) => (
          <div key={category}>
            <h2 className="text-xl font-bold mb-4 text-gray-800">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fields.map(({ name, label, type }) => {
                const evaluation = result?.evaluation?.[name]
                const statusClass = evaluation
                  ? evaluation.status === 'pass'
                    ? 'border-green-500 text-green-800'
                    : 'border-red-500 text-red-800'
                  : ''

                return (
                  <div key={name} className="flex flex-col">
                    <label htmlFor={name} className={`text-base font-medium mb-1 ${statusClass}`}>
                      {label} {type === 'yn_na' ? '(Y / NA)' : type === 'yn' ? '(Y / N)' : ''}
                    </label>
                    <input
                      type={type === 'date' ? 'date' : 'text'}
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleChange}
                      placeholder={type === 'yn_na' ? 'Y / NA' : type === 'yn' ? 'Y / N' : ''}
                      className={`border p-2 rounded ${statusClass}`}
                    />
                    {evaluation?.status === 'fail' && (
                      <span className="text-red-600 text-sm mt-1">{evaluation.reason}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <button type="submit" disabled={loading} className="bg-green-800 text-white px-6 py-3 rounded font-semibold">
          {loading ? 'Evaluating...' : 'Submit for Evaluation'}
        </button>
      </form>
    </main>
  )
}
