import { View } from 'react-native'
import { HomeHeader } from '../components/home-header'
import { MealsList } from '../components/meals-list'

export function Home() {
  return (
    <View className="flex-1 ">
      <HomeHeader />

      <MealsList />
    </View>
  )
}
