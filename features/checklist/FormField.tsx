import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Field } from '@/types/checklist'

interface FormFieldProps extends Field {
  evaluationResult?: {
    status: 'pass' | 'fail'
    reason: string
  }
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type, evaluationResult }) => {
  const { register, formState: { errors } } = useFormContext()
  
  const error = errors[name]
  const isFail = evaluationResult?.status === 'fail'
  const isPass = evaluationResult?.status === 'pass'

  const borderClass = isFail || error 
    ? 'border-red-500 focus:ring-red-500 dark:border-red-500' 
    : isPass 
      ? 'border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500' 
      : 'border-gray-300 dark:border-gray-700 focus:ring-emerald-500'

  const labelClass = isFail || error 
    ? 'text-red-700 dark:text-red-400' 
    : isPass 
      ? 'text-emerald-700 dark:text-emerald-400' 
      : 'text-gray-700 dark:text-gray-200'

  const useTextarea = ['doctor_notes', 'general_notes', 'edema_explanation'].includes(name)

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className={cn("text-sm font-semibold", labelClass)}>
        {label}
        {type === 'yn' && ' (Y / N)'}
        {type === 'yn_na' && ' (Y / N / NA)'}
      </label>

      {type === 'date' ? (
        <input
          {...register(name)}
          type="date"
          className={cn(
            "w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-colors focus:outline-none focus:ring-2",
            borderClass
          )}
        />
      ) : useTextarea ? (
        <textarea
          {...register(name)}
          rows={3}
          className={cn(
            "w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm resize-y transition-colors focus:outline-none focus:ring-2",
            borderClass
          )}
        />
      ) : (
        <input
          {...register(name)}
          type="text"
          placeholder={type === 'yn' ? 'y or n' : type === 'yn_na' ? 'y, n, or na' : ''}
          className={cn(
            "w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm transition-colors focus:outline-none focus:ring-2",
            borderClass
          )}
        />
      )}

      {error && (
        <span className="text-red-500 dark:text-red-400 text-xs font-medium">
          {error.message as string}
        </span>
      )}
      
      {isFail && evaluationResult?.reason && (
        <span className="text-red-600 dark:text-red-400 text-sm font-medium mt-1">
          {evaluationResult.reason}
        </span>
      )}
    </div>
  )
}
