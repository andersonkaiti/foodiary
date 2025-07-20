import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import './styles/globals.css'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-lime-500">
      <Text className="text-base">
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}
