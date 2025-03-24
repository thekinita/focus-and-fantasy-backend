import { NextFunction, Request, Response, Router } from 'express'
import { asyncHandler } from '../../exceptions/async-handler'
import TagsService from './tags.service'

const tagsRouter = Router()

class TagsController {
  static async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const tag = TagsService.createTag(req.body)
      res.status(201).json({
        status: 'success',
        data: tag
      })
    } catch (error) {
      next(error)
    }
  }

  static async removeTag(req: Request, res: Response, next: NextFunction) {
    try {
      TagsService.removeTag(req.body)
      res.status(201).json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { tagId, ...data } = req.body
      const tag = TagsService.updateTag(tagId, data)
      res.status(201).json({
        status: 'success',
        data: tag
      })
    } catch (error) {
      next(error)
    }
  }

  static async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = TagsService.getTags(req.body)
      res.status(201).json({
        status: 'success',
        data: tags
      })
    } catch (error) {
      next(error)
    }
  }
}

tagsRouter.post('/create', asyncHandler(TagsController.createTag))
tagsRouter.delete('/remove', asyncHandler(TagsController.removeTag))
tagsRouter.patch('/update', asyncHandler(TagsController.updateTag))
tagsRouter.get('/get-tags', asyncHandler(TagsController.getTags))

export default tagsRouter
