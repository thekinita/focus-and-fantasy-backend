import prisma from '../../../config/prisma'
import { updatedInventoryOptions } from '../users.dto'

export async function getDefaultItems() {
  return prisma.item.findMany({
    where: { collection: 'DEFAULT' },
    select: { id: true }
  })
}

export const updatedInventory = ({
  items,
  userId,
  quantity,
  isEquiped = false
}: updatedInventoryOptions) => {
  return items.map((item) => ({
    userId,
    itemId: item.id,
    quantity,
    isEquiped
  }))
}
