import {
  Gender,
  Habit,
  InventoryItem,
  Log,
  Session,
  Task,
  UserStats
} from '@prisma/client'
import { UserSettings } from '../users/users.entity'

export interface CreateUserDto {
  username: string
  email: string
  password: string
  gender: Gender
  [key: string]: any
}

export interface UserResponseDto {
  id: number
  username: string
  email: string
  gender: Gender
  settings?: UserSettings | null
  isAdmin: boolean
  habits: Habit[]
  inventory: InventoryItem[]
  logs: Log[]
  sessions: Session[]
  tasks: Task[]
  stats: UserStats[]
}
