'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Field } from '@/types/checklist'
import { Info, CheckCircle, XCircle } from 'lucide-react'

interface FormFieldProps extends Field {
  evaluationResult?: {
    status: 'pass' | 'fail'
    reason: string
  }
}

// ── Tooltip ───────────────────────────────────────────────────────────────────

function Tooltip({ content }: { content: string }) {
  return (
    <span className="relative group/tip inline-flex items-center ml-1.5 align-middle">
      <button
        type="button"
        tabIndex={0}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus-visible:text-emerald-500 transition-colors"
        aria-label="Field guidance"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none invisible group-hover/tip:visible group-focus-within/tip:visible opacity-0 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 transition-opacity duration-150 absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-xl shadow-xl leading-relaxed"
      >
        {content}
        <span
          aria-hidden="true"
          className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-900 dark:border-t-gray-800"
        />
      </span>
    </span>
  )
}

// ── Y / N / NA toggle buttons ─────────────────────────────────────────────────

function YNButtonGroup({
  name,
  type,
  isPass,
  isFail,
}: {
  name: string
  type: 'yn' | 'yn_na'
  isPass: boolean
  isFail: boolean
}) {
  const { watch, setValue } = useFormContext()
  const value = watch(name) as string | undefined

  const options =
    type === 'yn'
      ? [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
        ]
      : [
          { value: 'y', label: 'Yes' },
          { value: 'n', label: 'No' },
          { value: 'na', label: 'N/A' },
        ]

  const handleSelect = (selected: string) => {
    // Toggle off if clicking the same option
    setValue(name, value === selected ? '' : selected, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return (
    <div
      role="group"
      aria-label={`Select an answer for this field`}
      className="flex gap-2 flex-wrap"
    >
      {options.map((opt) => {
        const isSelected = value === opt.value
        const isSelectedFail = isSelected && isFail
        const isSelectedPass = isSelected && isPass

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            aria-pressed={isSelected}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1',
              isSelectedFail
                ? 'bg-red-500 border-red-500 text-white shadow-sm'
                : isSelectedPass
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Main FormField component ──────────────────────────────────────────────────

const TEXTAREA_FIELDS = new Set(['doctor_notes', 'general_notes', 'edema_explanation'])

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  hint,
  evaluationResult,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const isFail = evaluationResult?.status === 'fail'
  const isPass = evaluationResult?.status === 'pass'

  const inputBorderClass = isFail || error
    ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
    : isPass
      ? 'border-emerald-400 focus:ring-emerald-400 dark:border-emerald-500'
      : 'border-gray-200 dark:border-gray-700 focus:ring-emerald-500'

  const labelColorClass = isFail || error
    ? 'text-red-700 dark:text-red-400'
    : isPass
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-gray-700 dark:text-gray-200'

  const isYNField = type === 'yn' || type === 'yn_na'
  const useTextarea = TEXTAREA_FIELDS.has(name)

  return (
    <div className="flex flex-col gap-2 print-section">
      {/* Label row */}
      <label
        htmlFor={isYNField ? undefined : name}
        id={isYNField ? `label-${name}` : undefined}
        className={cn('text-sm font-semibold leading-snug', labelColorClass)}
      >
        {label}
        {hint && <Tooltip content={hint} />}
      </label>

      {/* Input */}
      {isYNField ? (
        <YNButtonGroup name={name} type={type} isPass={isPass} isFail={isFail} />
      ) : type === 'date' ? (
        <input
          {...register(name)}
          id={name}
          type="date"
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2',
            inputBorderClass
          )}
        />
      ) : useTextarea ? (
        <textarea
          {...register(name)}
          id={name}
          rows={3}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm shadow-sm resize-y transition-colors focus:outline-none focus:ring-2',
            inputBorderClass
          )}
        />
      ) : (
        <input
          {...register(name)}
          id={name}
          type="text"
          className={cn(
            'w-full px-3 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2',
            inputBorderClass
          )}
        />
      )}

      {/* Validation error */}
      {error && (
        <p role="alert" className="text-red-500 dark:text-red-400 text-xs font-medium">
          {error.message as string}
        </p>
      )}

      {/* Evaluation result */}
      {evaluationResult && (
        <div
          className={cn(
            'flex items-start gap-1.5 text-xs font-medium mt-0.5',
            isFail ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
          )}
        >
          {isFail ? (
            <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{evaluationResult.reason}</span>
        </div>
      )}
    </div>
  )
}
