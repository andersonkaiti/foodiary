import { router, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../../../components/button'

export default function MealDetails() {
  const { mealId } = useLocalSearchParams()

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center">Detalhes da refeição: {mealId}</Text>

      <Button onPress={router.back}>Voltar</Button>
    </View>
  )
}
