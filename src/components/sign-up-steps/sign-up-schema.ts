import { z } from 'zod'

export const schema = z.object({
  goal: z.enum(['lose', 'mantain', 'gain']),
  gender: z.enum(['male', 'female']),
  birthDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Data de nascimento inválida' })
    .refine(
      (value) => {
        const [day, month, year] = value.split('/').map(Number)
        const birthDate = new Date(year, month - 1, day)
        return !Number.isNaN(birthDate.getTime())
      },
      { message: 'Data de nascimento inválida' }
    ),
  height: z
    .string()
    .regex(/^\d{3}$/, { message: 'Altura inválida' })
    .refine(
      (value) => {
        const heightNum = Number(value)
        return heightNum >= 100 && heightNum <= 250
      },
      { message: 'Altura deve estar entre 100cm e 250cm' }
    ),
  weight: z
    .string()
    .regex(/^\d{2,3}$/, { message: 'Peso inválido' })
    .refine(
      (value) => {
        const weightNum = Number(value)
        return weightNum >= 30 && weightNum <= 300
      },
      { message: 'Peso deve estar entre 30kg e 300kg' }
    ),
  activityLevel: z.enum(['1', '2', '3', '4', '5']),
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
})

export type SignUpFormData = z.infer<typeof schema>
