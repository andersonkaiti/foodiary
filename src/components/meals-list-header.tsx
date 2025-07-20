import { Text, View } from 'react-native'
import { useAuth } from '../hooks/use-auth'
import { DailyStats } from './daily-stats'
import { DateSwitcher } from './date-switcher'

export function MealsListHeader() {
  const { user } = useAuth()

  return (
    <View>
      <DateSwitcher />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: 0,
            goal: user!.calories,
          }}
          carbohydrates={{
            current: 0,
            goal: user!.carbohydrates,
          }}
          fats={{
            current: 0,
            goal: user!.fats,
          }}
          proteins={{
            current: 0,
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
