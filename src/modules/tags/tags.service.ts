import { Prisma } from '@prisma/client'
import prisma from '../../config/prisma'

export default class TagsService {
  static async createTag(data: Prisma.TaskTagCreateInput) {
    return await prisma.taskTag.create({ data })
  }

  static async removeTag(tagId: number) {
    return await prisma.taskTag.delete({
      where: { id: tagId }
    })
  }

  static async updateTag(tagId: number, data: Prisma.TaskCreateInput) {
    return await prisma.taskTag.update({
      where: { id: tagId },
      data
    })
  }

  static async getTags(userId: number) {
    return await prisma.taskTag.findMany({
      where: { userId }
    })
  }
}
