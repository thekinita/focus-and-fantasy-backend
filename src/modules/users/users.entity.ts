import {
  Habit,
  InventoryItem,
  Log,
  Session,
  Task,
  UserStats,
  User as UserPrisma
} from '@prisma/client'

export type User = UserPrisma & {
  habits: Habit[]
  inventory: InventoryItem[]
  logs: Log[]
  sessions: Session[]
  tasks: Task[]
  stats: UserStats[]
}
export interface UserSettings {}
