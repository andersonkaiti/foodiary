import { Controller, useFormContext } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { OptionsSelector } from '../options-selector'
import type { SignUpFormData } from './sign-up-schema'

export function ActivityLevelStep() {
  const { control } = useFormContext<SignUpFormData>()

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 gap-4">
        <Controller
          control={control}
          name="activityLevel"
          render={({ field: { onChange, value } }) => (
            <OptionsSelector
              onChange={onChange}
              options={[
                {
                  icon: '🛋️',
                  title: 'Sedentário',
                  description: 'Pouco ou nenhum exercício',
                  value: '1',
                },
                {
                  icon: '🚶',
                  title: 'Leve',
                  description: 'Exercícios leves 1-3 dias por semana',
                  value: '2',
                },
                {
                  icon: '🏃',
                  title: 'Moderado',
                  description: 'Exercícios moderados 3-5 dias por semana',
                  value: '3',
                },
                {
                  icon: '🏋️',
                  title: 'Pesado',
                  description: 'Exercícios intensos 6-7 dias por semana',
                  value: '4',
                },
                {
                  icon: '🏆',
                  title: 'Atleta',
                  description:
                    'Exercícios muito intensos diariamente ou duas vezes ao dia',
                  value: '5',
                },
              ]}
              value={value}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}
