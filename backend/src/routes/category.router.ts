import { Router } from 'express'
import { CategoryController } from '../controller/Category'

const routerCategory = Router()

const categoriesController = new CategoryController()
routerCategory.get('/categories', categoriesController.getAll)
routerCategory.get('/categories/:id', categoriesController.getOne)
routerCategory.post('/categories', categoriesController.createOne)
routerCategory.delete('/categories/:id', categoriesController.deleteOne)
routerCategory.patch('/categories/:id', categoriesController.patchOne)
routerCategory.put('/categories/:id', categoriesController.updateOne)

export default routerCategory
