import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { AuthLayout } from '../../components/auth-layout'
import { Button } from '../../components/button'
import { GenderStep } from '../../components/sign-up-steps/gender-step'
import { GoalStep } from '../../components/sign-up-steps/goal-step'
import { schema } from '../../components/sign-up-steps/sign-up-schema'
import { colors } from '../../styles/colors'

export default function SignUp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const steps = [
    {
      icon: '🎯',
      title: 'Qual é seu objetivo?',
      subtitle: 'O que você pretende alcançar com a dieta?',
      Component: GoalStep,
    },
    {
      icon: '👥',
      title: 'Qual é seu gênero?',
      subtitle: 'Seu gênero influencia no tipo da dieta',
      Component: GenderStep,
    },
  ]

  function handlePreviousStep() {
    if (currentStepIndex === 0) {
      router.back()
      return
    }

    setCurrentStepIndex((prevState) => prevState - 1)
  }

  function handleNextStep() {
    setCurrentStepIndex((prevState) => prevState + 1)
  }

  const currentStep = steps[currentStepIndex]

  return (
    <AuthLayout
      icon={currentStep.icon}
      subtitle={currentStep.subtitle}
      title={currentStep.title}
    >
      <View className="flex-1">
        <FormProvider {...form}>
          <currentStep.Component />
        </FormProvider>
      </View>

      <View className="flex-row justify-between gap-6">
        <Button color="gray" onPress={handlePreviousStep} size="icon">
          <ArrowLeftIcon color={colors.black['700']} size={20} />
        </Button>

        <Button onPress={handleNextStep} size="icon">
          <ArrowRightIcon color={colors.black['700']} size={20} />
        </Button>
      </View>
    </AuthLayout>
  )
}
