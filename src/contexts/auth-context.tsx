import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createContext, useCallback, useEffect, useState } from 'react'
import { httpClient } from '../services/http-client'

type User = {
  email: string
  name: string
  id: string
  calories: number
  proteins: number
  carbohydrates: number
  fats: number
}

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
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  signIn(params: SignInParams): Promise<void>
  signUp(params: SignOutParams): Promise<void>
  signOut(): Promise<void>
}

export const AuthContext = createContext({} as IAuthContextValue)

const TOKEN_STORAGE_KEY = '@foodiary::token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoadingToken, setIsLoadingToken] = useState(true)

  useEffect(() => {
    async function load() {
      const accessToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)

      setToken(accessToken)

      setIsLoadingToken(false)
    }

    load()
  }, [])

  useEffect(() => {
    async function run() {
      if (!token) {
        httpClient.defaults.headers.common.Authorization = null
        return
      }

      httpClient.defaults.headers.common.Authorization = `Bearer ${token}`

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token)
    }

    run()
  }, [token])

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data: accessToken } = await httpClient.post('/signin', params)

      setToken(accessToken)

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, accessToken)
    },
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignOutParams) => {
      const {
        data: { accessToken },
      } = await httpClient.post('/signup', params)

      setToken(accessToken)

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, accessToken)
    },
  })

  const { data: user } = useQuery({
    queryKey: ['user'],
    enabled: !!token,
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>('/me')

      return data.user
    },
  })

  const signOut = useCallback(async () => {
    setToken(null)
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        isLoading: isLoadingToken,
        user: user ?? null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
