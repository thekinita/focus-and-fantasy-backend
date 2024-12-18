import { NextFunction, Request, Response, Router } from 'express'
import AuthService from './auth.service'
import { CreateUserDto } from './auth.dto'
import { RegisterSchema } from './auth.validation'
import { asyncHandler } from './utils/async-handler'

const authRouter = Router()

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RegisterSchema.parse(req.body)
      const userData = await AuthService.register(
        validatedData as CreateUserDto
      )
      res.status(201).json({
        status: 'success',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await AuthService.login(email, password)
      res.status(200).json({
        status: 'success',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      await AuthService.logout(refreshToken)
      res.clearCookie('refreshToken')
      res.status(200).json({ status: 'success' })
    } catch (error) {
      next(error)
    }
  }
}

authRouter.post('/register', asyncHandler(AuthController.register))
authRouter.post('/login', asyncHandler(AuthController.login))
authRouter.delete('/logout', asyncHandler(AuthController.logout))

export default authRouter
