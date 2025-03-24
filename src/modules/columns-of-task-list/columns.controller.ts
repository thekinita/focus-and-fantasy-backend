import { NextFunction, Request, Response, Router } from 'express'
import { asyncHandler } from '../../exceptions/async-handler'
import ColumnsOfTaskListService from './columns.service'

const columnsOfTaskListRouter = Router()

class ColumnsOfTaskListController {
  static async createColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, listId } = req.body
      const column = ColumnsOfTaskListService.createColumn(title, listId)
      res.status(201).json({
        status: 'success',
        data: column
      })
    } catch (error) {
      next(error)
    }
  }

  static async removeColumn(req: Request, res: Response, next: NextFunction) {
    try {
      ColumnsOfTaskListService.removeColumn(req.body)
      res.status(201).json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const { columnId, ...data } = req.body
      const column = ColumnsOfTaskListService.updateColumn(columnId, data)
      res.status(201).json({
        status: 'success',
        data: column
      })
    } catch (error) {
      next(error)
    }
  }

  static async getColumns(req: Request, res: Response, next: NextFunction) {
    try {
      const columns = ColumnsOfTaskListService.getColumns(req.body)
      res.status(201).json({
        status: 'success',
        data: columns
      })
    } catch (error) {
      next(error)
    }
  }

  // static async reorderColumns(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const columns = ColumnsOfTaskListService.reorderColumns(req.body)
  //     res.status(201).json({
  //       status: 'success',
  //       data: columns
  //     })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

columnsOfTaskListRouter.post(
  '/create',
  asyncHandler(ColumnsOfTaskListController.createColumn)
)
columnsOfTaskListRouter.delete(
  '/remove',
  asyncHandler(ColumnsOfTaskListController.removeColumn)
)
columnsOfTaskListRouter.patch(
  '/update',
  asyncHandler(ColumnsOfTaskListController.updateColumn)
)
columnsOfTaskListRouter.get(
  '/get-columns',
  asyncHandler(ColumnsOfTaskListController.getColumns)
)
// ColumnsOfTaskListRouter.patch(
//   '/reorder',
//   asyncHandler(ColumnsOfTaskListController.removeColumn)
// )

export default columnsOfTaskListRouter
