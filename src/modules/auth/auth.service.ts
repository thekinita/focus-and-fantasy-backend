import { hash } from 'bcrypt'
import { CreateUserDto, UserResponseDto } from './auth.dto'
import { UserMapper } from './auth.mapper'
import { getDefaultItems } from '../users/utils/inventory.utils'
import checkUserExistence from './utils/check-user-existence'
import createUser from './utils/create-user'
import TokenService from '../../services/token.service'
import getUserThroughVerify from './utils/get-user-through-verify'
import { ApiError } from '../../exceptions/api-error'
import { User } from '../users/users.entity'
import prisma from '../../config/prisma'

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

  static async login(
    email: string,
    password: string
  ): Promise<UserResponseDto & { accessToken: string; refreshToken: string }> {
    const user = await getUserThroughVerify(email, password)
    if (user) {
      const tokens = TokenService.generateTokens(user.id)
      await TokenService.saveToken(user.id, tokens.refreshToken)
      return {
        ...UserMapper.entityToResponseDto(user as User),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    }
    throw ApiError.Unauthorized('Invalid credentials')
  }

  static async logout(refreshToken: string) {
    return await prisma.token.delete({
      where: { refreshToken }
    })
  }
}
