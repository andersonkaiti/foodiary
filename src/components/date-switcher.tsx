import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../styles/colors'
import { formatDate } from '../utils/format-date'

interface IDateSwitcherProps {
  currentDate: Date
  onPreviousDate(): void
  onNextDate(): void
}

export function DateSwitcher({
  onPreviousDate,
  onNextDate,
  currentDate,
}: IDateSwitcherProps) {
  return (
    <View className="flex-row items-center justify-between px-2">
      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={onPreviousDate}
      >
        <ChevronLeftIcon color={colors.black[700]} size={20} />
      </TouchableOpacity>

      <Text className="text-center font-sans-medium text-gray-700 text-xs tracking-[1.28px]">
        {formatDate(currentDate)}
      </Text>

      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={onNextDate}
      >
        <ChevronRightIcon color={colors.black[700]} size={20} />
      </TouchableOpacity>
    </View>
  )
}
