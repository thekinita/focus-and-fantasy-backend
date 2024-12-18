import { Gender, InventoryItem, Log, UserStats } from '@prisma/client'
import { UserSettings } from './users.entity'

export interface updatedInventoryOptions {
  items: { id: number }[]
  userId?: number
  quantity?: number
  isEquiped: boolean
}

export default interface CreateWithDefaultSettings {}
