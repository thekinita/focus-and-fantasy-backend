import prisma from '../../../config/prisma'
import { ApiError } from '../../../exceptions/api-error'

export default async function checkUserExistence(
  email: string,
  username: string
) {
  const [existingUserByEmail, existingUserByUserName] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } })
  ])

  if (existingUserByEmail) throw ApiError.Conflict('Email is already in use.')
  if (existingUserByUserName)
    throw ApiError.Conflict('Username is already in use.')
}
