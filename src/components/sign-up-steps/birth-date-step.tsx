import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../input'
import type { SignUpFormData } from './sign-up-schema'

export function BirthDateStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <Controller
      control={control}
      name="birthDate"
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          error={error?.message}
          keyboardType="numeric"
          mask="99/99/9999"
          onChangeText={onChange}
          placeholder="Data de nascimento"
          value={value}
        />
      )}
    />
  )
}
