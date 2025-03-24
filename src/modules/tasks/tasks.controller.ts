import { NextFunction, Request, Response, Router } from 'express'
import { TasksService } from './tasks.service'
import { asyncHandler } from '../../exceptions/async-handler'

const tasksRouter = Router()

class TasksController {
  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = TasksService.createTask(req.body)
      return res.status(201).json({
        status: 'success',
        data: task
      })
    } catch (error) {
      next(error)
    }
  }

  static async removeTask(req: Request, res: Response, next: NextFunction) {
    try {
      TasksService.removeTask(req.body)
      res.status(201).json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId, ...data } = req.body
      const task = TasksService.updateTask(taskId, data)
      res.status(201).json({
        status: 'success',
        data: task
      })
    } catch (error) {
      next(error)
    }
  }

  static async pinTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId, isPin } = req.body
      TasksService.pinTask(taskId, isPin)
      res.status(201).json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = TasksService.getTask(req.body)
      res.status(201).json({
        status: 'success',
        data: task
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = TasksService.getTasks(req.body)
      res.status(201).json({
        status: 'success',
        data: tasks
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTasksByList(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId, taskListId } = req.body
      const tasks = TasksService.getTasksByList(taskId, taskListId)
      res.status(201).json({
        status: 'success',
        data: tasks
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTasksByTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId, tagId } = req.body
      const tasks = TasksService.getTasksByTag(taskId, tagId)
      res.status(201).json({
        status: 'success',
        data: tasks
      })
    } catch (error) {
      next(error)
    }
  }
}

tasksRouter.post('/create', asyncHandler(TasksController.createTask))
tasksRouter.delete('/remove', asyncHandler(TasksController.removeTask))
tasksRouter.patch('/update', asyncHandler(TasksController.updateTask))
tasksRouter.patch('/pin', asyncHandler(TasksController.pinTask))
tasksRouter.get('/get-task', asyncHandler(TasksController.getTask))
tasksRouter.get('/get-tasks', asyncHandler(TasksController.getTasks))
tasksRouter.get(
  '/get-tasks-by-list',
  asyncHandler(TasksController.getTasksByList)
)
tasksRouter.get(
  '/get-tasks-by-tag',
  asyncHandler(TasksController.getTasksByTag)
)

export default tasksRouter
