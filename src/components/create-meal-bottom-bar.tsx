import { CameraIcon, MicIcon } from 'lucide-react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from './button'

export function CreateMealBottomBar() {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      className="absolute bottom-0 z-10 h-20 w-full flex-row justify-center gap-4 border-gray-400 border-t bg-white pt-4"
      style={{ height: 80 + bottom }}
    >
      <Button color="gray" size="icon">
        <MicIcon />
      </Button>

      <Button color="gray" size="icon">
        <CameraIcon />
      </Button>
    </View>
  )
}
