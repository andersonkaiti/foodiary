import { Text, View } from 'react-native'
import { MealCard } from './meal-card'

export function MealsList() {
  return (
    <View className="p-5">
      <Text className="font-sans-medium text-base text-black-700 tracking-[1.28px]">
        Refeições
      </Text>

      <View className="mt-4 gap-8">
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
      </View>
    </View>
  )
}
