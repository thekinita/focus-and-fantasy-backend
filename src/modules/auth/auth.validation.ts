import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      'Password must contain at least one letter and one number'
    ),
  gender: z
    .enum(['MALE', 'FEMALE'])
    .refine((value) => ['MALE', 'FEMALE'].includes(value), {
      message: 'Invalid gender value'
    })
})
