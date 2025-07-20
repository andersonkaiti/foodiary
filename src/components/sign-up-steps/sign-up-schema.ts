import z from 'zod'

export const schema = z.object({
  goal: z.enum(['lose', 'mantain', 'gain']),
})

export type SignUpFormData = z.infer<typeof schema>
