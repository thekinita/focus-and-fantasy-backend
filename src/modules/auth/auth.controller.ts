import { NextFunction, Request, Response, Router } from 'express'
import AuthService from './auth.service'
import { CreateUserDto } from './auth.dto'
import { RegisterSchema } from './auth.validation'
import { ApiError } from '../../exceptions/api-error'

const authRouter = Router()
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)

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
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          status: error.statusCode,
          message: error.message
        })
      }
      if (error instanceof Error && 'errors' in error) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation error',
          errors: error.errors
        })
      }
      next(error)
    }
  }
}

authRouter.post('/register', asyncHandler(AuthController.register))

export default authRouter
