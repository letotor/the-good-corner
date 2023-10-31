import { Category } from './../entities/Category'
import Icontroller from '.'
import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { Ad } from '../entities'
// on travail ici en modele ACtive Record(BaseEntity) et non Data mapper ( repository ) , c'est le model utilisé par prisma optimisé

export class AdsController implements Icontroller {
  async getAll(_req: Request, res: Response): Promise<any> {
    try {
      const ads = await Ad.find({ relations: ['category'] })
      res.status(200).json(ads)
    } catch (err: any) {
      // Cf les typeguards
      res.status(500).json({ message: err.stack })
    }
  }

  async getOne(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) {
        return res.status(400).send('id is missing')
      }

      const ad = await Ad.findOne({
        where: { id: Number(req.params.id) },
        relations: ['category'],
      })
      if (!ad) {
        return res
          .status(404)
          .json({ message: `ad wilth id ${req.params.id} not found` })
      }
      res.status(200).send(ad)
    } catch (err: any) {
      // Cf les typeguards
      res.status(500).json({ message: err.stack })
    }
  }

  async createOne(req: Request, res: Response): Promise<any> {
    try {
      const { title, description, price, picture, owner, location, category } =
        req.body
      const ad = new Ad()
      ad.title = title
      ad.description = description
      ad.price = price
      ad.picture = picture
      ad.location = location
      ad.category = { ...category }
      ad.owner = owner
      ad.tags = []
      ad.createdAt = new Date(Date.now())

      const errors = await validate(ad)
      if (errors.length > 0) {
        throw new Error('validation failed')
      } else {
        await ad.save()
        res.status(201).json(ad)
      }
    } catch (err: any) {
      res.status(500).json({ message: err.stack })
    }
  }

  // async updateOne(req: Request, res: Response): Promise<any> {
  //  try {
  //  if(!req.body) return res.status(400).send('body is missing')
  //
  //   ad = req.body
  //  const adSearch = dataSource().getRepository(Ad).findOneBy({id: Number(req.params.id)})
  //     if(!idSearch) return(res.status(400).json({message: `id ${req.params.id} not found`})
  // //const adUpdate = new Ad(...ad)
  // res.status(204).send('not yet isOctal(value)')
  //  } catch (error : any) {
  //
  //   console.error(error)
  //       res.status(500).json({message : error})
  //  }
  // }

  async patchOne(req: Request, res: Response): Promise<any> {
    try {
      const ad = await Ad.findOne({
        where: { id: Number(req.params.id) },
        relations: ['category'],
      })

      if (!ad) {
        return res.status(404).send()
      }
      const resz = Object.assign(ad, req.body)
      const errors = await validate(ad)

      if (errors.length > 0) {
        return res.status(400).json({ errors: errors })
      }

      await ad.save()
      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Une erreur interne est survenue' })
    }
  }

  async updateOne(req: Request, res: Response): Promise<any> {
    res.status(204).send('not yet')
  }

  async deleteOne(req: Request, res: Response): Promise<any> {
    const AdId = Number(req.params.id)
    if (!AdId) {
      return res.status(400).send('id is missing')
    }
    const adExist = await Ad.findOne({ where: { id: AdId } })

    if (!adExist) {
      return res.status(404).json({ message: `ad with id ${AdId} not found` })
    }
    await Ad.remove(adExist)
    res.status(204).send()
    // const ad = await dataSource
    //   .getRepository(Ad)
    //   .findOne({ where: { id: Number(req.params.id) } })
    // console.log(ad)
    // if (!ad) {
    //   return res
    //     .status(404)
    //     .json({ message: `ad with id ${req.params.id} not found` })
    // } else {
    //   await dataSource.getRepository(Ad).remove(ad)
    //   res.status(204).json({ message: `ad with id ${req.params.id} deleted` })
    // }
  }
}
