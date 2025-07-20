import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { Input } from '../input'
import type { SignUpFormData } from './sign-up-schema'

export function FinalStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            error={error?.message}
            onChangeText={onChange}
            placeholder="Nome completo"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            error={error?.message}
            keyboardType="email-address"
            onChangeText={onChange}
            placeholder="E-mail"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            error={error?.message}
            onChangeText={onChange}
            placeholder="Senha"
            secureTextEntry
            value={value}
          />
        )}
      />
    </View>
  )
}
