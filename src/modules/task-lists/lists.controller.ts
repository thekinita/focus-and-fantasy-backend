import { NextFunction, Request, Response, Router } from 'express'
import TaskListsService from './lilsts.service'
import { asyncHandler } from '../../exceptions/async-handler'

const taskListsRouter = Router()

class TaskListsController {
  static async createTaskList(req: Request, res: Response, next: NextFunction) {
    try {
      const taskList = TaskListsService.createTaskList(req.body)
      res.status(201).json({
        status: 'success',
        data: taskList
      })
    } catch (error) {
      next(error)
    }
  }

  static async removeTaskList(req: Request, res: Response, next: NextFunction) {
    try {
      TaskListsService.removeTaskList(req.body)
      res.status(201).json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateTaskList(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId, ...data } = req.body
      const taskList = TaskListsService.updateTaskList(listId, data)
      res.status(201).json({
        status: 'success',
        data: taskList
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTaskLists(req: Request, res: Response, next: NextFunction) {
    try {
      const taskLists = TaskListsService.getTaskLists(req.body)
      res.status(201).json({
        status: 'success',
        data: taskLists
      })
    } catch (error) {
      next(error)
    }
  }
}

taskListsRouter.post(
  '/create',
  asyncHandler(TaskListsController.createTaskList)
)
taskListsRouter.delete(
  '/remove',
  asyncHandler(TaskListsController.removeTaskList)
)
taskListsRouter.patch(
  '/update',
  asyncHandler(TaskListsController.updateTaskList)
)
taskListsRouter.get(
  '/get-task-lists',
  asyncHandler(TaskListsController.getTaskLists)
)

export default taskListsRouter
