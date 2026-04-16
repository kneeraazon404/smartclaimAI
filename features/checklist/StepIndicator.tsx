import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { SECTION_ABBREVIATIONS } from '@/lib/constants'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Evaluation progress" className="w-full mb-12">
      <ol className="flex items-start justify-between relative">
        {/* Connector line behind the steps */}
        <div
          className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"
          aria-hidden="true"
        >
          {/* Completed portion of connector */}
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-600 transition-all duration-500 ease-out"
            style={{
              width:
                currentStep === 0
                  ? '0%'
                  : `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          const label = SECTION_ABBREVIATIONS[step] ?? step

          return (
            <li
              key={step}
              className="flex flex-col items-center gap-2"
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Circle */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-sm border-2',
                  isActive
                    ? 'bg-emerald-600 border-emerald-600 text-white scale-110 shadow-emerald-300/50 dark:shadow-emerald-700/50 shadow-md'
                    : isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{index + 1}</span>
                )}
                <span className="sr-only">
                  Step {index + 1}: {step}
                  {isActive && ' (current)'}
                  {isCompleted && ' (completed)'}
                </span>
              </div>

              {/* Label — visible on sm+ */}
              <span
                className={cn(
                  'hidden sm:block text-xs font-medium text-center max-w-[72px] leading-tight transition-colors duration-300',
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : isCompleted
                      ? 'text-emerald-600 dark:text-emerald-500'
                      : 'text-gray-400 dark:text-gray-500'
                )}
                aria-hidden="true"
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
