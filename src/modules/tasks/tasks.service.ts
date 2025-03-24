import { Prisma } from '@prisma/client'
import prisma from '../../config/prisma'

export class TasksService {
  static async createTask(data: Prisma.TaskCreateInput) {
    return await prisma.task.create({ data })
  }

  static async removeTask(taskId: number) {
    return await prisma.task.delete({
      where: { id: taskId }
    })
  }

  static async updateTask(taskId: number, data: Prisma.TaskCreateInput) {
    return await prisma.task.update({
      where: { id: taskId },
      data
    })
  }

  static async pinTask(taskId: number, isPin: boolean) {
    return await prisma.task.update({
      where: { id: taskId },
      data: { isPin }
    })
  }

  static async getTask(taskId: number) {
    return await prisma.task.findFirst({
      where: { id: taskId }
    })
  }

  static async getTasks(userId: number) {
    return await prisma.task.findMany({
      where: { userId }
    })
  }

  static async getTasksByList(userId: number, taskListId: number) {
    return await prisma.task.findMany({
      where: { userId, taskListId }
    })
  }

  static async getTasksByTag(userId: number, tagId: number) {
    return await prisma.task.findMany({
      where: { userId },
      include: {
        tags: {
          where: {
            id: tagId
          }
        }
      }
    })
  }
}
