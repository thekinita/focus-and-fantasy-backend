export class ApiError extends Error {
  statusCode: number
  errors?: any[]

  constructor(message: string, statusCode: number, errors?: any) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  static Unauthorized(message: string = 'User is not authorized') {
    return new ApiError(message, 401)
  }

  static Forbidden(message: string = 'Access is forbidden') {
    return new ApiError(message, 403)
  }

  static NotFound(message: string = 'Resource not found') {
    return new ApiError(message, 404)
  }

  static BadRequest(message: string = 'Bad Request', errors?: any) {
    return new ApiError(message, 400, errors)
  }

  static Conflict(message: string = 'Conflict occurred') {
    return new ApiError(message, 409)
  }

  static Internal(message: string = 'Internal Server Error') {
    return new ApiError(message, 500)
  }

  static UnprocessableEntity(
    message: string = 'Unprocessable Entity',
    errors?: any
  ) {
    return new ApiError(message, 422, errors)
  }
}

// Use examples:
// throw new ApiError('Custom error message', 400)
// throw ApiError.Unauthorized()
// throw ApiError.BadRequest('Invalid input data', { field: 'email' })
// throw ApiError.NotFound('User not found')
