import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Input } from '../input'
import type { SignUpFormData } from './sign-up-schema'

export function WeightStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <View className="items-center">
      <Controller
        control={control}
        name="weight"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="w-full">
            <Input
              append="kg"
              error={error?.message}
              keyboardType="numeric"
              mask="999"
              maxLength={3}
              onChangeText={onChange}
              placeholder="Peso (kg)"
              value={value}
            />
          </View>
        )}
      />
    </View>
  )
}
