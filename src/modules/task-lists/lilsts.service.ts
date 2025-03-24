import { Prisma } from '@prisma/client'
import prisma from '../../config/prisma'
import ColumnsOfTaskListService from '../columns-of-task-list/columns.service'

export default class TaskListsService {
  static async createTaskList(data: Prisma.TaskListCreateInput) {
    const taskList = await prisma.taskList.create({ data })
    ColumnsOfTaskListService.createColumn('all', taskList.id)
    return taskList
  }

  static async removeTaskList(listId: number) {
    await prisma.columnOfTaskList.deleteMany({
      where: { taskListId: listId }
    })
    return await prisma.taskList.delete({
      where: { id: listId }
    })
  }

  static async updateTaskList(listId: number, data: Prisma.TaskCreateInput) {
    return await prisma.taskList.update({
      where: { id: listId },
      data
    })
  }

  static async getTaskLists(userId: number) {
    return await prisma.taskList.findMany({
      where: { userId }
    })
  }
}
