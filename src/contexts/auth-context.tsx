import { useMutation } from '@tanstack/react-query'
import { createContext } from 'react'
import { httpClient } from '../services/http-client'

type SignInParams = {
  email: string
  password: string
}

type SignOutParams = {
  goal: string
  gender: string
  birthDate: string
  activityLevel: number
  height: number
  weight: number
  account: {
    name: string
    email: string
    password: string
  }
}

interface IAuthContextValue {
  isLoggedIn: boolean
  isLoading: boolean
  signIn(params: SignInParams): Promise<void>
  signUp(params: SignOutParams): Promise<void>
}

export const AuthContext = createContext({} as IAuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post('/signin', params)

      console.log(data)
    },
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignOutParams) => {
      const { data } = await httpClient.post('/signup', params)

      console.log(data)
    },
  })

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: false, isLoading: false, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
