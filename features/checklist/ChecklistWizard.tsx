'use client'

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  XCircle,
  RotateCcw,
  Printer,
  ChevronRight,
} from 'lucide-react'

import { checklistSchema, ChecklistFormValues } from '@/lib/schemas'
import { CHECKLIST_SECTIONS } from '@/lib/constants'
import { EvaluationResult } from '@/types/checklist'
import { StepIndicator } from './StepIndicator'
import { WizardStep } from './WizardStep'
import { cn } from '@/lib/utils'

const DRAFT_KEY = 'smartclaim_checklist_draft'

// ── Evaluation summary helpers ────────────────────────────────────────────────

interface SummaryFailure {
  section: string
  fieldName: string
  label: string
  reason: string
}

function computeSummary(evaluation: EvaluationResult) {
  const entries = Object.entries(evaluation)
  const total = entries.length
  const passed = entries.filter(([, v]) => v.status === 'pass').length
  const failed = total - passed
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0

  const failures: SummaryFailure[] = []
  for (const [sectionName, fields] of Object.entries(CHECKLIST_SECTIONS)) {
    for (const field of fields) {
      const result = evaluation[field.name]
      if (result?.status === 'fail') {
        failures.push({
          section: sectionName,
          fieldName: field.name,
          label: field.label,
          reason: result.reason,
        })
      }
    }
  }

  return { total, passed, failed, passRate, failures }
}

// ── Evaluation Summary Card ───────────────────────────────────────────────────

function EvaluationSummaryCard({
  evaluation,
  onNewEvaluation,
  onPrint,
}: {
  evaluation: EvaluationResult
  onNewEvaluation: () => void
  onPrint: () => void
}) {
  const { total, passed, failed, passRate, failures } = computeSummary(evaluation)

  const statusColor =
    passRate === 100
      ? 'text-emerald-700 dark:text-emerald-400'
      : passRate >= 75
        ? 'text-amber-700 dark:text-amber-400'
        : 'text-red-700 dark:text-red-400'

  const barColor =
    passRate === 100
      ? 'bg-emerald-500'
      : passRate >= 75
        ? 'bg-amber-500'
        : 'bg-red-500'

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden print-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Evaluation Results
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {passed} of {total} criteria passed
          </p>
        </div>

        {/* Score pill */}
        <div className={cn('text-4xl font-extrabold tabular-nums', statusColor)}>
          {passRate}
          <span className="text-lg font-semibold">%</span>
        </div>
      </div>

      {/* Stats + progress */}
      <div className="p-6 space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Pass rate</span>
            <span>
              {passed} passed · {failed} failed
            </span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor)}
              style={{ width: `${passRate}%` }}
              role="progressbar"
              aria-valuenow={passRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${passRate}% compliance`}
            />
          </div>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" aria-hidden="true" />
            {passed} passed
          </div>
          {failed > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full text-sm font-medium">
              <XCircle className="w-4 h-4" aria-hidden="true" />
              {failed} failed
            </div>
          )}
        </div>

        {/* Failures list */}
        {failures.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Issues Requiring Attention
            </h3>
            <ul className="space-y-2">
              {failures.map((f) => (
                <li
                  key={f.fieldName}
                  className="flex items-start gap-2.5 p-3 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-sm"
                >
                  <XCircle
                    className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 leading-snug">
                      {f.label}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">
                      {f.reason}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      {f.section}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {passRate === 100 && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
            <CheckCircle
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              All criteria passed — your documentation appears compliant with CMS LCD L35041
              requirements.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0 no-print">
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          Print Report
        </button>
        <button
          type="button"
          onClick={onNewEvaluation}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-black dark:hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Start New Evaluation
        </button>
      </div>
    </div>
  )
}

// ── Checklist Wizard ──────────────────────────────────────────────────────────

export const ChecklistWizard = () => {
  const steps = Object.keys(CHECKLIST_SECTIONS)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<{ evaluation: EvaluationResult } | null>(null)
  const [showProModal, setShowProModal] = React.useState(false)
  const wizardRef = React.useRef<HTMLDivElement>(null)

  const methods = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    mode: 'onTouched',
    defaultValues: {},
  })

  const { handleSubmit, trigger } = methods

  // ── Feature: Draft persistence ────────────────────────────────────────────

  // Restore saved draft on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY)
      if (!saved) return
      const data = JSON.parse(saved) as Record<string, string>
      const hasData = Object.values(data).some((v) => v !== '' && v !== undefined && v !== null)
      if (hasData) {
        methods.reset(data)
        toast.success('Previous session restored.', {
          id: 'draft-restored',
          duration: 4000,
          icon: '📋',
        })
      }
    } catch {
      // invalid JSON or unavailable localStorage — silent
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save draft on every form change (debounced via React batching)
  React.useEffect(() => {
    const subscription = methods.watch((data) => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
      } catch {
        // quota exceeded or private mode — silent
      }
    })
    return () => subscription.unsubscribe()
  }, [methods])

  // ── Navigation ────────────────────────────────────────────────────────────

  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0
  const currentCategory = steps[currentStepIndex]
  const currentFields = CHECKLIST_SECTIONS[currentCategory]

  const scrollToTop = () => {
    wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nextStep = async () => {
    const fieldsToValidate = currentFields.map((f) => f.name as keyof ChecklistFormValues)
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
      scrollToTop()
    }
  }

  const prevStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0))
    scrollToTop()
  }

  const normalizeValue = (value?: string): string => {
    const v = value?.toLowerCase().trim()
    if (v === 'y' || v === 'yes') return 'yes'
    if (v === 'n' || v === 'no') return 'no'
    if (v === 'na') return 'na'
    return value ?? ''
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = async (data: ChecklistFormValues) => {
    setLoading(true)

    const payload: Record<string, string> = { username: 'admin' }
    Object.values(CHECKLIST_SECTIONS)
      .flat()
      .forEach(({ name, type }) => {
        const raw = data[name as keyof ChecklistFormValues]
        if (type === 'yn' || type === 'yn_na') {
          payload[name] = normalizeValue(raw)
        } else {
          payload[name] = raw ?? ''
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
        return
      }

      setResult(responseData)
      toast.success('Evaluation completed!', { duration: 4000 })
      // Clear draft after successful evaluation
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {}
      scrollToTop()
    } catch {
      setShowProModal(true)
    } finally {
      setLoading(false)
    }
  }

  // ── New evaluation ────────────────────────────────────────────────────────

  const handleNewEvaluation = () => {
    setResult(null)
    setCurrentStepIndex(0)
    methods.reset({})
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {}
    scrollToTop()
  }

  // ── Print ─────────────────────────────────────────────────────────────────

  const handlePrint = () => {
    window.print()
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      ref={wizardRef}
      className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-300 scroll-mt-20"
    >
      {/* Loading overlay */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Evaluating checklist, please wait"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-sm w-full mx-4 border border-gray-100 dark:border-gray-700">
            <Loader2 className="animate-spin h-12 w-12 text-emerald-600 dark:text-emerald-500 mb-4" aria-hidden="true" />
            <p className="text-gray-900 dark:text-white font-semibold text-lg text-center">
              Evaluating checklist…
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
              GPT-4o is analyzing your documentation against LCD requirements.
            </p>
          </div>
        </div>
      )}

      {/* Pro / capacity modal */}
      {showProModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pro-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700 text-center">
            <h3
              id="pro-modal-title"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
            >
              Pro Version Required
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our free evaluation tier has reached capacity. Please{' '}
              <a
                href="/contact"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                contact us
              </a>{' '}
              to request access to the Pro version.
            </p>
            <button
              onClick={() => setShowProModal(false)}
              className="w-full py-3 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:bg-black dark:hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Evaluation summary (shown after successful evaluation) */}
      {result && (
        <EvaluationSummaryCard
          evaluation={result.evaluation}
          onNewEvaluation={handleNewEvaluation}
          onPrint={handlePrint}
        />
      )}

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <StepIndicator steps={steps} currentStep={currentStepIndex} />

          <div className="min-h-[400px]">
            <WizardStep
              category={currentCategory}
              fields={currentFields}
              evaluation={result?.evaluation}
            />
          </div>

          {/* Navigation */}
          <div className="pt-6 mt-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between no-print">
            <button
              type="button"
              onClick={prevStep}
              disabled={isFirstStep || loading}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                aria-hidden="true"
              />
              Previous
            </button>

            {isLastStep ? (
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Submit Evaluation
                <Send
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="group flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-gray-900 hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Next
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
