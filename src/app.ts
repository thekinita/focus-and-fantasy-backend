import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error-handler'
import authRouter from './modules/auth/auth.controller'
import { env } from './config/env'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/api', authRouter)
app.use('/public', express.static('public'))

app.use(errorHandler)

export default app
