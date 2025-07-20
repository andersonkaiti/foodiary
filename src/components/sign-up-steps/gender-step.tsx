import { Controller, useFormContext } from 'react-hook-form'
import { OptionsSelector } from '../options-selector'
import type { SignUpFormData } from './sign-up-schema'

export function GenderStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, value } }) => (
        <OptionsSelector
          onChange={onChange}
          options={[
            {
              icon: '♂️',
              title: 'Masculino',
              value: 'male',
            },
            {
              icon: '♀️',
              title: 'Feminino',
              value: 'female',
            },
          ]}
          value={value}
        />
      )}
    />
  )
}
