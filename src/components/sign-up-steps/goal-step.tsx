import { Controller, useFormContext } from 'react-hook-form'
import { OptionsSelector } from '../options-selector'
import type { SignUpFormData } from './sign-up-schema'

export function GoalStep() {
  const form = useFormContext<SignUpFormData>()

  return (
    <Controller
      control={form.control}
      name="goal"
      render={({ field }) => (
        <OptionsSelector
          onChange={field.onChange}
          options={[
            {
              icon: '🥦',
              title: 'Perder peso',
              value: 'lose',
            },
            {
              icon: '🍍',
              title: 'Manter peso',
              value: 'mantain',
            },
            {
              icon: '🍖',
              title: 'Ganhar peso',
              value: 'gain',
            },
          ]}
          value={field.value}
        />
      )}
    />
  )
}
