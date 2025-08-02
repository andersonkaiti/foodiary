import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useAuth } from '../hooks/use-auth'
import { DailyStats } from './daily-stats'
import { DateSwitcher } from './date-switcher'

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

interface IMealsListHeaderProps {
  currentDate: Date
  meals: Meal[]
  onPreviousDate(): void
  onNextDate(): void
}

export function MealsListHeader({
  onPreviousDate,
  onNextDate,
  currentDate,
  meals,
}: IMealsListHeaderProps) {
  const { user } = useAuth()

  const totals = useMemo(() => {
    let calories = 0
    let proteins = 0
    let carbohydrates = 0
    let fats = 0

    for (const meal of meals) {
      for (const food of meal.foods) {
        calories += food.calories
        proteins += food.proteins
        carbohydrates += food.carbohydrates
        fats += food.fats
      }
    }

    return {
      calories,
      proteins,
      carbohydrates,
      fats,
    }
  }, [meals])

  return (
    <View>
      <DateSwitcher
        currentDate={currentDate}
        onNextDate={onNextDate}
        onPreviousDate={onPreviousDate}
      />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: totals.calories,
            goal: user!.calories,
          }}
          carbohydrates={{
            current: totals.carbohydrates,
            goal: user!.carbohydrates,
          }}
          fats={{
            current: totals.fats,
            goal: user!.fats,
          }}
          proteins={{
            current: totals.proteins,
            goal: user!.proteins,
          }}
        />
      </View>

      <View className="mt-2 h-px bg-gray-200" />

      <Text className="m-5 font-sans-medium text-base text-black-700 tracking-[1.28px]">
        Refeições
      </Text>
    </View>
  )
}
