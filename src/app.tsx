import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/host-grotesk'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DailyStats } from './components/daily-stats'
import { DateSwitcher } from './components/date-switcher'
import { HomeHeader } from './components/home-header'
import { MealsList } from './components/meals-list'
import './styles/globals.css'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded, error] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    HostGrotesk_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!(loaded || error)) {
    return null
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaProvider>
        <HomeHeader />
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

        <MealsList />
      </SafeAreaProvider>
    </View>
  )
}
