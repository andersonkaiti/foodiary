import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react-native'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { AuthLayout } from '../../components/auth-layout'
import { Button } from '../../components/button'
import { ActivityLevelStep } from '../../components/sign-up-steps/activity-level-step'
import { BirthDateStep } from '../../components/sign-up-steps/birth-date-step'
import { FinalStep } from '../../components/sign-up-steps/final-step'
import { GenderStep } from '../../components/sign-up-steps/gender-step'
import { GoalStep } from '../../components/sign-up-steps/goal-step'
import { HeightStep } from '../../components/sign-up-steps/height-step'
import { schema } from '../../components/sign-up-steps/sign-up-schema'
import { WeightStep } from '../../components/sign-up-steps/weight-step'
import { useAuth } from '../../hooks/use-auth'
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
    {
      icon: '🎂',
      title: 'Qual sua data de nascimento?',
      subtitle: 'Precisamos saber sua idade para personalizar seu plano',
      Component: BirthDateStep,
    },
    {
      icon: '📏',
      title: 'Qual sua altura?',
      subtitle: 'Isso nos ajudará a calcular suas necessidades nutricionais',
      Component: HeightStep,
    },
    {
      icon: '⚖️',
      title: 'Qual seu peso atual?',
      subtitle: 'Precisamos saber seu peso para personalizar seu plano',
      Component: WeightStep,
    },
    {
      icon: '🏃',
      title: 'Qual seu nível de atividade?',
      subtitle: 'Isso nos ajudará a calcular suas necessidades nutricionais',
      Component: ActivityLevelStep,
    },
    {
      icon: '👤',
      title: 'Crie sua conta',
      subtitle: 'Insira seus dados para finalizar o cadastro',
      Component: FinalStep,
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
    if (currentStepIndex === steps.length - 1) {
      // TODO: Implement account creation logic
      return
    }
    setCurrentStepIndex((prevState) => prevState + 1)
  }

  const { signUp } = useAuth()

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      const [day, month, year] = formData.birthDate.split('/')

      await signUp({
        height: Number(formData.height),
        weight: Number(formData.weight),
        activityLevel: Number(formData.activityLevel),
        gender: formData.gender,
        goal: formData.goal,
        birthDate: `${year}-${month}-${day}`,
        account: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        },
      })
    } catch {
      Alert.alert('Erro ao criar a conta. Tente novamente.')
    }
  })

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

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

        {isLastStep ? (
          <Button className="flex-1" onPress={handleSubmit}>
            Criar conta
          </Button>
        ) : (
          <Button onPress={handleNextStep} size="icon">
            <ArrowRightIcon color={colors.black['700']} size={20} />
          </Button>
        )}
      </View>
    </AuthLayout>
  )
}
