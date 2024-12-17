import {
  InventoryItem as InventoryItemPrisma,
  Log as LogPrisma,
  User as UserPrisma,
  UserStats as UserStatsPrisma
} from '@prisma/client'

export type User = UserPrisma & {
  stats: UserStatsPrisma[]
  settings: UserSettings
  inventory: InventoryItemPrisma[]
  // tasks: Task[]
  // habits: Habit[]
  // sessions: Session[]
  logs: LogPrisma[]
}
export interface UserSettings {}
