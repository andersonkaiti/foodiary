import { useMutation } from '@tanstack/react-query'
import * as FileSystem from 'expo-file-system'
import { httpClient } from '../services/http-client'

type CreateMealResponse = {
  uploadURL: string
  mealId: string
}

type CreateMealParams = {
  fileType: 'image/jpeg' | 'audio/m4a'
}

export function useCreateMeal({ fileType }: CreateMealParams) {
  const { mutateAsync } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealResponse>(
        '/create-meal',
        {
          fileType,
        }
      )

      await FileSystem.uploadAsync(data.uploadURL, uri, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      })
    },
  })

  return {
    createMeal: mutateAsync,
  }
}
