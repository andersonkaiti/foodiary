import { View } from 'react-native'
import { CreateMealBottomBar } from '../components/create-meal-bottom-bar'
import { HomeHeader } from '../components/home-header'
import { MealsList } from '../components/meals-list'

export default function Home() {
  return (
    <View className="flex-1 ">
      <HomeHeader />

      <MealsList />

      <CreateMealBottomBar />
    </View>
  )
}
