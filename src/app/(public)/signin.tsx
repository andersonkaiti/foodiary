import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { router } from 'expo-router'
import { ArrowLeftIcon } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import z from 'zod'
import { AuthLayout } from '../../components/auth-layout'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { useAuth } from '../../hooks/use-auth'
import { colors } from '../../styles/colors'

const schema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z.string().min(8, 'Deve conter pelo menos 8 caracteres'),
})

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { signIn } = useAuth()

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      await signIn(formData)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(JSON.stringify(error.response?.data, null, 2))
      }
      Alert.alert('Credenciais inválidas!')
    }
  })

  return (
    <AuthLayout
      icon="👤"
      subtitle="Acesse sua conta para continuar"
      title="Entre em sua conta"
    >
      <View className="flex-1 justify-between">
        <View className="gap-6">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                error={fieldState.error?.message}
                keyboardType="email-address"
                label="E-mail"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                error={fieldState.error?.message}
                label="Senha"
                onChangeText={field.onChange}
                secureTextEntry
                value={field.value}
              />
            )}
          />
        </View>

        <View className="flex-row gap-6">
          <Button color="gray" onPress={router.back} size="icon">
            <ArrowLeftIcon color={colors.black['700']} size={20} />
          </Button>
          <Button
            className="flex-1"
            loading={form.formState.isSubmitting}
            onPress={handleSubmit}
          >
            Entrar
          </Button>
        </View>
      </View>
    </AuthLayout>
  )
}
