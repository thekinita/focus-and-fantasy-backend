import { Prisma } from '@prisma/client'
import prisma from '../../config/prisma'
import { ApiError } from '../../exceptions/api-error'

export default class ColumnsOfTaskListService {
  static async createColumn(title: string, listId: number) {
    const currentList = await prisma.taskList.findUnique({
      where: { id: listId },
      select: { columns: true }
    })
    if (currentList) {
      const newPosition = currentList.columns.length + 1
      return await prisma.columnOfTaskList.create({
        data: {
          title,
          position: newPosition,
          taskListId: listId
        }
      })
    }
    throw ApiError.NotFound('List not found')
  }

  static async removeColumn(columnId: number) {
    return await prisma.columnOfTaskList.delete({
      where: { id: columnId }
    })
  }

  static async updateColumn(
    columnId: number,
    data: Prisma.ColumnOfTaskListCreateInput
  ) {
    return await prisma.columnOfTaskList.update({
      where: { id: columnId },
      data
    })
  }

  static async getColumns(taskListId: number) {
    return await prisma.columnOfTaskList.findMany({
      where: { taskListId },
      orderBy: { position: 'asc' }
    })
  }

  static async reorderColumns() {
    //
  }
}
