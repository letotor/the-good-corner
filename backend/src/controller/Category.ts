import { Request, Response } from 'express'
import Icontroller from '.'
import { Ad, Category } from '../entities'
import { validate } from 'class-validator'
import { dataSource } from '../dataSource/dbConnection'

export class CategoryController implements Icontroller {
  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const categories = await Category.find()
      res.status(200).json(categories)
    } catch (err: any) {
      res.status(500).json({ message: err.stack })
    }
  }

  async getOne(req: Request, res: Response): Promise<any> {
    if (!req.params.id) {
      return res.status(400).send('id is missing')
    }
    //const ad = Ad.findByOne({ id: Number(req.params.id) })
    const ad = await Category.findOneBy({ id: Number(req.params.id) })
    if (!ad) {
      return res
        .status(404)
        .json({ message: `category id ${req.params.id} not found` })
    }
    res.status(200).send(ad)
  }

  async createOne(req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'name is missing' })
      const category = new Category()
      category.name = name

      const errors = await validate(category)
      if (errors.length > 0) {
        console.error(errors)
        res
          .status(400)
          .json({ message: errors.map((error) => error.constraints) })
      } else {
        const categorySave = await category.save()
        res.status(201).json(categorySave)
      }
    } catch (err: any) {
      res.status(500).json({ message: err.stack })
    }
  }

  async updateOne(req: Request, res: Response): Promise<any> {
    return
  }

  async patchOne(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).send('id is missing')
      }
      if (!req.body) {
        return res.status(400).send('body is missing')
      }
      let cat = await Category.findOneBy({ id: Number(req.params.id) })
      if (!cat) {
        return res
          .status(404)
          .json({ message: `cat with id ${req.params.id} not found` })
      }

      const catUpdate = Category.merge(cat, req.body)
      if (!catUpdate) {
        return res.status(404).json({ message: `ad with id  not found` })
      }
      await dataSource.getRepository(Ad).save(catUpdate)
      res.status(201).json(catUpdate)
    } catch (err: any) {
      console.error(err.stack)
      res.status(500).json({ message: err.stack })
    }
  }
  async deleteOne(req: Request, res: Response): Promise<any> {
    if (!req.params.id) {
      return res.status(400).send('id is missing')
    }
    const categoryToRemve = await Category.delete(Number(req.params.id))
    console.log(categoryToRemve)

    if (categoryToRemve.affected == 0) {
      return res
        .status(404)
        .json({ message: `cateegory with id ${req.params.id} not found` })
    }
    res
      .status(204)
      .json({ message: `category with id ${req.params.id} deleted` })
  }
}
// app.get('/category', async (_req, res) => {

// })

// app.get('/category/:id', async (req, res) => {

// })

// app.post('/category', async (req, res) => {

// })

// app.delete('/category/:id', async (req, res) => {

// })

// app.patch('/category/:id', async (req, res) => {

// })
