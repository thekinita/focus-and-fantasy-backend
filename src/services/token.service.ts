import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import prisma from '../config/prisma'
import { ApiError } from '../exceptions/api-error'

interface JwtPayload {
  userId: number
}

enum TokenType {
  Access = 'access',
  Refresh = 'refresh'
}

export default class TokenService {
  static generateTokens(userId: number) {
    const accessToken = jwt.sign(
      { userId, type: TokenType.Access },
      env.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    const refreshToken = jwt.sign(
      { userId, type: TokenType.Refresh },
      env.REFRESH_SECRET_KEY,
      {
        expiresIn: '7d'
      }
    )
    return { accessToken, refreshToken }
  }

  static validateAccessToken(token: string): number | null {
    try {
      const payload = jwt.verify(token, env.SECRET_KEY) as JwtPayload
      return payload.userId
    } catch {
      throw ApiError.UnprocessableEntity('Unable to validate token')
    }
  }

  static validateRefreshToken(token: string): number | null {
    try {
      const payload = jwt.verify(token, env.REFRESH_SECRET_KEY) as JwtPayload
      return payload.userId
    } catch {
      throw ApiError.UnprocessableEntity('Unable to validate token')
    }
  }

  static async saveToken(userId: number, refreshToken: string) {
    try {
      const tokenData = await prisma.token.findFirst({
        where: { refreshToken }
      })
      if (tokenData) {
        return await prisma.token.update({
          where: { id: tokenData.id },
          data: { refreshToken }
        })
      }
      return await prisma.token.create({
        data: { userId, refreshToken }
      })
    } catch (error) {
      throw ApiError.Internal('Unable to save token')
    }
  }

  static async removeToken(refreshToken: string) {
    try {
      const tokenData = await prisma.token.findFirst({
        where: { refreshToken }
      })
      if (!tokenData) throw ApiError.NotFound('Token not found')

      return await prisma.token.delete({ where: { id: tokenData.id } })
    } catch (error) {
      throw ApiError.Internal('Unable to remove token')
    }
  }

  static async findToken(refreshToken: string) {
    try {
      return await prisma.token.findFirst({
        where: { refreshToken }
      })
    } catch (error) {
      throw ApiError.NotFound('Unable to find token')
    }
  }

  static async clearExpiredTokens() {
    try {
      const now = new Date()
      await prisma.token.deleteMany({
        where: {
          updatedAt: {
            lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    } catch (error) {
      throw ApiError.Internal('Unable to clear expired tokens')
    }
  }
}
