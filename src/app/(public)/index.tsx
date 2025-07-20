import { Link } from 'expo-router'
import { ImageBackground, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../../components/button'
import { Logo } from '../../components/logo'

export default function SignIn() {
  return (
    <ImageBackground
      className="flex-1"
      source={require('../../assets/onboarding-bg/onboarding-bg.png')}
    >
      <SafeAreaView className="x flex-1 items-center justify-between">
        <View className="mx-auto">
          <Logo height={100} width={100} />
        </View>

        <View className="w-full items-center">
          <Text className="w-[311px] text-center font-sans-semibold text-3xl text-white">
            Controle sua dieta de forma simples
          </Text>

          <View className="mt-6 w-full px-5">
            <Link asChild href="/signup">
              <Button className="w-full">Criar conta</Button>
            </Link>

            <View className="mt-[30px] flex-row items-center justify-center gap-2">
              <Text className="font-sans-regular text-base text-white">
                Já tem conta?
              </Text>
              <Link href="signin">
                <Text className="font-sans-medium text-base text-lime-500">
                  Acesse agora!
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
