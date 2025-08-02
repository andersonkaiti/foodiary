import { Text, View } from 'react-native'
import { useAuth } from '../hooks/use-auth'
import { DailyStats } from './daily-stats'
import { DateSwitcher } from './date-switcher'

interface IMealsListHeaderProps {
  currentDate: Date
  onPreviousDate(): void
  onNextDate(): void
}

export function MealsListHeader({
  onPreviousDate,
  onNextDate,
  currentDate,
}: IMealsListHeaderProps) {
  const { user } = useAuth()

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
