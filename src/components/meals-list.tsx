import { useQuery } from '@tanstack/react-query'
import { FlatList, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { httpClient } from '../services/http-client'
import { MealCard } from './meal-card'
import { MealsListHeader } from './meals-list-header'

type Meals = {
  name: string
  id: string
  icon: string
  foods: {
    name: string
    quantity: string
    calories: number
    proteins: number
    carbohydrates: number
    fats: number
  }[]
  createdAt: Date
}

export function MealsList() {
  const { bottom } = useSafeAreaInsets()

  const { data: meals } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meals[] }>('/meals', {
        params: {
          date: new Date().toISOString().split('T')[0],
        },
      })

      return data
    },
  })

  return (
    <FlatList
      contentContainerClassName="gap-8 p-5"
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      data={meals?.meals ?? []}
      keyExtractor={(meal) => meal.id}
      ListEmptyComponent={<Text>Nenhuma refeição cadastrada...</Text>}
      ListHeaderComponent={MealsListHeader}
      renderItem={({ item: meal }) => (
        <MealCard id={meal.id} name={meal.name} />
      )}
    />
  )
}
