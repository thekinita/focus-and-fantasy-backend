import { User } from '../users/users.entity'
import { CreateUserDto, UserResponseDto } from './auth.dto'

export class UserMapper {
  static entityToResponseDto(user: UserResponseDto) {
    return {
      username: user.username,
      email: user.email,
      gender: user.gender
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
