import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error-handler'
import authRouter from './modules/auth/auth.controller'
import tasksRouter from './modules/tasks/tasks.controller'
import tagsRouter from './modules/tags/tags.controller'
import taskListsRouter from './modules/task-lists/lists.controller'
import columnsOfTaskListRouter from './modules/columns-of-task-list/columns.controller'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/task-lists', taskListsRouter)
app.use('/api/columns-of-task-list', columnsOfTaskListRouter)

app.use('/public', express.static('public'))

app.use(errorHandler)

export default app
