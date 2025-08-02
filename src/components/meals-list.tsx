import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { httpClient } from '../services/http-client'
import { MealCard } from './meal-card'
import { MealsListHeader } from './meals-list-header'

type Meal = {
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

  const [currentDate, setCurrentDate] = useState(new Date())

  const dateParam = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const date = String(currentDate.getDate()).padStart(2, '0')

    return `${year}-${month}-${date}`
  }, [currentDate])

  const { data: meals, refetch } = useQuery({
    queryKey: ['meals', dateParam],
    staleTime: 15_000,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meal[] }>('/meals', {
        params: {
          date: dateParam,
        },
      })

      return data
    },
  })

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  )

  function handlePreviousDate() {
    setCurrentDate((prevState) => {
      const newDate = new Date(prevState)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }

  function handleNextDate() {
    setCurrentDate((prevState) => {
      const newDate = new Date(prevState)
      newDate.setDate(newDate.getDate() + 1)
      return newDate
    })
  }

  return (
    <FlatList
      contentContainerClassName="gap-8 p-5"
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      data={meals?.meals ?? []}
      keyExtractor={(meal) => meal.id}
      ListEmptyComponent={<Text>Nenhuma refeição cadastrada...</Text>}
      ListHeaderComponent={() => (
        <MealsListHeader
          currentDate={currentDate}
          meals={meals?.meals ?? []}
          onNextDate={handleNextDate}
          onPreviousDate={handlePreviousDate}
        />
      )}
      renderItem={({ item: meal }) => (
        <MealCard
          createdAt={new Date(meal.createdAt)}
          foods={meal.foods}
          icon={meal.icon}
          id={meal.id}
          name={meal.name}
        />
      )}
    />
  )
}
