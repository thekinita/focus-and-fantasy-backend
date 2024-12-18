import prisma from '../../../config/prisma'
import { User } from '@prisma/client'
import { ApiError } from '../../../exceptions/api-error'
import { compare } from 'bcrypt'

export default async function getUserThroughVerify(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw ApiError.Unauthorized('Invalid credentials')
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    throw ApiError.Unauthorized('Invalid credentials')
  }

  return user
}
