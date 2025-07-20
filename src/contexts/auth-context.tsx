import { createContext, useCallback } from 'react'

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
  const signIn = useCallback(async (params: SignInParams) => {
    console.log(params)
  }, [])

  const signUp = useCallback(async (params: SignOutParams) => {
    console.log(params)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: false, isLoading: false, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  )
}
