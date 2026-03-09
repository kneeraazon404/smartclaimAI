import * as React from 'react'
import { motion } from 'framer-motion'
import { Field, EvaluationResult } from '@/types/checklist'
import { FormField } from './FormField'

interface WizardStepProps {
  category: string
  fields: Field[]
  evaluation?: EvaluationResult
}

export const WizardStep: React.FC<WizardStepProps> = ({ category, fields, evaluation }) => {
  return (
    <motion.div
      key={category}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white capitalize tracking-tight">
          {category}
        </h2>
        <div className="h-1 w-full bg-linear-to-r from-emerald-600 to-emerald-400 dark:from-emerald-500 dark:to-emerald-300 rounded-full mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            evaluationResult={evaluation?.[field.name]}
          />
        ))}
      </div>
    </motion.div>
  )
}
