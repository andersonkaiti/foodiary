import { Text, View } from 'react-native'
import { DailyStats } from './daily-stats'
import { DateSwitcher } from './date-switcher'

export function MealsListHeader() {
  return (
    <View>
      <DateSwitcher />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: 500,
            goal: 2500,
          }}
          carbohydrates={{
            current: 500,
            goal: 2500,
          }}
          fats={{
            current: 500,
            goal: 2500,
          }}
          proteins={{
            current: 500,
            goal: 2500,
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
