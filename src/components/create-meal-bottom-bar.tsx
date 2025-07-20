import { CameraIcon, MicIcon } from 'lucide-react-native'
import { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AudioModal } from './audio-modal'
import { Button } from './button'
import { CameraModal } from './camera-modal'

export function CreateMealBottomBar() {
  const { bottom } = useSafeAreaInsets()

  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false)

  return (
    <View
      className="absolute bottom-0 z-10 h-20 w-full flex-row justify-center gap-4 border-gray-400 border-t bg-white pt-4"
      style={{ height: 80 + bottom }}
    >
      <Button
        color="gray"
        onPress={() => setIsAudioModalOpen(true)}
        size="icon"
      >
        <MicIcon />
      </Button>

      <Button
        color="gray"
        onPress={() => setIsPictureModalOpen(true)}
        size="icon"
      >
        <CameraIcon />
      </Button>

      <AudioModal
        onClose={() => setIsAudioModalOpen(false)}
        open={isAudioModalOpen}
      />

      <CameraModal
        onClose={() => setIsPictureModalOpen(false)}
        open={isPictureModalOpen}
      />
    </View>
  )
}
