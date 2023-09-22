import { Router } from 'express'
import { CategoryController } from '../controller/Category'

const routerCategory = Router()

const categoriesController = new CategoryController()
routerCategory.get('/', categoriesController.getAll)
routerCategory.get('/:id', categoriesController.getOne)
routerCategory.post('', categoriesController.createOne)
routerCategory.delete('/:id', categoriesController.deleteOne)
routerCategory.patch('/:id', categoriesController.patchOne)
routerCategory.put('/:id', categoriesController.updateOne)

export default routerCategory
