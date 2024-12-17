import { hash } from 'bcrypt'
import { CreateUserDto, UserResponseDto } from './auth.dto'
import { UserMapper } from './auth.mapper'
import { getDefaultItems } from '../users/utils/inventory.utils'
import checkUserExistence from './utils/check-user-existence'
import createUser from './utils/create-user'
import TokenService from '../../services/token.service'
import { User } from '../users/users.entity'

export default class AuthService {
  static async register(userData: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password, ...rest } = userData

    await checkUserExistence(email, username)

    const hashedPassword = await hash(password, 10)
    const defaultItems = await getDefaultItems()
    const createdUser = await createUser({
      username,
      email,
      password: hashedPassword,
      defaultItems,
      rest
    })

    const tokens = TokenService.generateTokens(createdUser.id)
    await TokenService.saveToken(createdUser.id, tokens.refreshToken)

    return {
      ...UserMapper.entityToResponseDto(createdUser as User),
      ...tokens
    }
  }
}
