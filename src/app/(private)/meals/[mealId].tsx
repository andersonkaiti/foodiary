import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'
import { Button } from '../../../components/button'
import { Logo } from '../../../components/logo'
import { httpClient } from '../../../services/http-client'

type Meal = {
  id: string
  createdAt: string
  icon: string
  name: string
  status: 'uploading' | 'processing' | 'success' | 'failed'
  foods: {
    name: string
    quantity: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
  }[]
}

export default function MealDetails() {
  const { mealId } = useLocalSearchParams()

  const { data: meal, isFetching } = useQuery({
    queryKey: ['meal'],
    queryFn: async () => {
      const { data: response } = await httpClient.get<{ meal: Meal }>(
        `/meals/${mealId}`
      )

      return response.meal
    },
    refetchInterval: (query) => {
      if (query.state.data?.status === 'success') {
        return false
      }

      return 2000
    },
  })

  if (isFetching || meal?.status !== 'success') {
    return (
      <View className="flex-1 items-center justify-center bg-lime-700">
        <Logo height={60} width={150} />

        <ActivityIndicator color="#fff" />
      </View>
    )
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={router.back}>Voltar</Button>

      <Text className="text-center">{JSON.stringify(meal, null, 2)}</Text>
    </View>
  )
}
