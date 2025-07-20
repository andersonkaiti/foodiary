import { router } from 'expo-router'
import { ArrowLeftIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { AuthLayout } from '../../components/auth-layout'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { colors } from '../../styles/colors'

export default function SignIn() {
  return (
    <AuthLayout
      icon="👤"
      subtitle="Acesse sua conta para continuar"
      title="Entre em sua conta"
    >
      <View className="flex-1 justify-between">
        <View className="gap-6">
          <Input
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            label="E-mail"
          />
          <Input
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            label="Senha"
            secureTextEntry
          />
        </View>

        <View className="flex-row gap-6">
          <Button color="gray" onPress={router.back} size="icon">
            <ArrowLeftIcon color={colors.black['700']} size={20} />
          </Button>
          <Button className="flex-1">Entrar</Button>
        </View>
      </View>
    </AuthLayout>
  )
}
