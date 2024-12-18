import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exceptions/api-error'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      errors: error.errors || []
    })
    return
  }

  if (error instanceof Error && 'errors' in error) {
    res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: (error as any).errors
    })
    return
  }

  console.error('Unhandled error:', error)
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
  return
}
