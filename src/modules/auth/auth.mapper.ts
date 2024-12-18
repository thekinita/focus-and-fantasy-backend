import { User } from '../users/users.entity'
import { CreateUserDto, UserResponseDto } from './auth.dto'

export class UserMapper {
  static entityToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      settings: user.settings,
      isAdmin: user.isAdmin,
      habits: user.habits,
      inventory: user.inventory,
      logs: user.logs,
      sessions: user.sessions,
      tasks: user.tasks,
      stats: user.stats
    }
  }

  static dtoToEntity(dto: CreateUserDto): Partial<User> {
    return {
      username: dto.username,
      email: dto.email,
      password: dto.password,
      gender: dto.gender
    }
  }
}
