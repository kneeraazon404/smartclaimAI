'use client'

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { Loader2, ArrowRight, ArrowLeft, Send } from 'lucide-react'

import { checklistSchema, ChecklistFormValues } from '@/lib/schemas'
import { CHECKLIST_SECTIONS } from '@/lib/constants'
import { EvaluationResult } from '@/types/checklist'
import { StepIndicator } from './StepIndicator'
import { WizardStep } from './WizardStep'

export const ChecklistWizard = () => {
  const steps = Object.keys(CHECKLIST_SECTIONS)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<{ evaluation: EvaluationResult } | null>(null)
  const [showProModal, setShowProModal] = React.useState(false)

  const methods = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    mode: 'onTouched',
    defaultValues: {}
  })

  const { handleSubmit, trigger } = methods

  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0
  const currentCategory = steps[currentStepIndex]
  const currentFields = CHECKLIST_SECTIONS[currentCategory]

  const nextStep = async () => {
    // Validate current step fields before progressing
    const fieldsToValidate = currentFields.map(f => f.name as keyof ChecklistFormValues)
    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid) {
      setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const normalizeValue = (value?: string): string => {
    const v = value?.toLowerCase().trim()
    if (v === 'y' || v === 'yes') return 'yes'
    if (v === 'n' || v === 'no') return 'no'
    if (v === 'na') return 'na'
    return value || ''
  }

  const onSubmit = async (data: ChecklistFormValues) => {
    setLoading(true)

    // Build payload matching exact old format
    const payload: Record<string, string> = { username: 'admin' }

    Object.values(CHECKLIST_SECTIONS).flat().forEach(({ name, type }) => {
      const raw = data[name as keyof ChecklistFormValues]
      if (type === 'yn' || type === 'yn_na') {
        payload[name] = normalizeValue(raw)
      } else {
        payload[name] = raw || ''
      }
    })

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      const responseData = await response.json()

      if (!response.ok) {
        setShowProModal(true)
        setLoading(false)
        return
      }

      setResult(responseData)
      toast.success('Evaluation completed successfully!')
      
      // Optionally reset form if needed
      // methods.reset(payload)
      
    } catch {
      setShowProModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-300">
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full border dark:border-gray-700">
            <Loader2 className="animate-spin h-12 w-12 text-emerald-600 dark:text-emerald-500 mb-4" />
            <p className="text-gray-900 dark:text-white font-semibold text-lg text-center">Evaluating checklist...</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">This may take a few moments.</p>
          </div>
        </div>
      )}

      {/* Pro Modal Overlay */}
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Pro Version Required</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our free evaluation tier has reached capacity. Please contact <a href="mailto:kneeraazon@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">kneeraazon@gmail.com</a> if you want to use the Pro version.
            </p>
            <button
              onClick={() => setShowProModal(false)}
              className="w-full py-3 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <StepIndicator steps={steps} currentStep={currentStepIndex} />
          
          <div className="min-h-[400px]">
            <WizardStep 
              category={currentCategory}
              fields={currentFields}
              evaluation={result?.evaluation}
            />
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={isFirstStep || loading}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Previous step
            </button>
            
            {isLastStep ? (
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Evaluation
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="group flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-gray-900 hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white shadow-md transition-all duration-200"
              >
                Next step
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
