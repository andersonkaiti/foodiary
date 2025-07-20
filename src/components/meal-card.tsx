import { Text, TouchableOpacity, View } from 'react-native'

export function MealCard() {
  return (
    <TouchableOpacity>
      <Text className="font-sans-regular text-base text-gray-700">
        Hoje, 12h25
      </Text>

      <View className="mt-2 flex-row gap-3 rounded-2xl border border-gray-400 px-4 py-5">
        <View className="size-12 items-center justify-center rounded-full bg-gray-200">
          <Text>🍞</Text>
        </View>
        <View>
          <Text className="font-sans-regular text-base text-gray-700">
            Café da manhã
          </Text>
          <Text className="font-sans-medium text-base text-black-700">
            Pão, manteiga e café
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
