import prisma from '../../../config/prisma'
import { updatedInventory } from '../../users/utils/inventory.utils'

export default async function createUser({
  username,
  email,
  password,
  defaultItems,
  rest
}: {
  username: string
  email: string
  password: string
  defaultItems: { id: number }[]
  rest: Record<string, any>
}) {
  const { gender, ...otherFields } = rest
  return prisma.user.create({
    data: {
      username,
      email,
      password,
      gender,
      stats: { create: {} },
      settings: {},
      inventory: {
        create: updatedInventory({
          items: defaultItems,
          isEquiped: true
        })
      },
      logs: { create: { action: 'Account created' } },
      ...otherFields
    }
  })
}
