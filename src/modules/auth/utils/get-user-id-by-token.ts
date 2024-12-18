import { ApiError } from '../../../exceptions/api-error'
import TokenService from '../../../services/token.service'

export default async function getUserIdByToken(refreshToken: string) {
  if (!refreshToken) {
    throw ApiError.Unauthorized()
  }

  const userId = TokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = TokenService.findToken(refreshToken)

  if (!userId || !tokenFromDb) {
    throw ApiError.Unauthorized()
  }

  return userId
}
