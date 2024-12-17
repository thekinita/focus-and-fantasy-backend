import { Gender } from '@prisma/client'
import { UserSettings } from '../users/users.entity'

export interface CreateUserDto {
  username: string
  email: string
  password: string
  gender: Gender
  [key: string]: any
}

export interface UserResponseDto {
  username: string
  email: string
  gender: Gender
  settings?: UserSettings | null
}
