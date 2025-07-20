import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Input } from '../input'
import type { SignUpFormData } from './sign-up-schema'

export function HeightStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <View className="items-center">
      <Controller
        control={control}
        name="height"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="w-full">
            <Input
              append="cm"
              error={error?.message}
              keyboardType="numeric"
              mask="999"
              maxLength={3}
              onChangeText={onChange}
              placeholder="Altura (cm)"
              value={value}
            />
          </View>
        )}
      />
    </View>
  )
}
