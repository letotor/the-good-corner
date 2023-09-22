import Icontroller from '.'
import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { Ad } from '../entities'
import { dataSource } from '../dataSource/dbConnection'

export class AdsController implements Icontroller {
  async getOne(req: Request, res: Response): Promise<any> {
    if (!req.params.id) {
      return res.status(400).send('id is missing')
    }

    const ad = await dataSource
      .getRepository(Ad)
      .findOneBy({ id: Number(req.params.id) })
    if (!ad) {
      return res
        .status(404)
        .json({ message: `ad wilth id ${req.params.id} not found` })
    }
    res.status(200).send(ad)
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const ads = await dataSource.getRepository(Ad).find()
      res.status(200).json(ads)
    } catch (err: any) {
      // Cf les typeguards
      res.status(500).json({ message: err.stack })
    }
  }

  async createOne(req: Request, res: Response): Promise<any> {
    try {
      const { title, description, price, picture, location, category, date } =
        req.body
      const ad = new Ad(title, description, price, picture, location, category)

      const errors = await validate(ad)
      if (errors.length > 0) {
        throw new Error('validation failed')
      } else {
        const adSave = await ad.save()
        res.status(201).json(adSave)
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
      if (!req.params.id) {
        return res.status(400).send('id is missing')
      }
      if (!req.body) {
        return res.status(400).send('body is missing')
      }
      let ad = await dataSource
        .getRepository(Ad)
        .findOneBy({ id: Number(req.params.id) })
      if (!ad) {
        return res
          .status(404)
          .json({ message: `ad with id ${req.params.id} not found` })
      }

      // update

      const adUpdate = dataSource.getRepository(Ad).merge(ad, req.body)
      if (!adUpdate) {
        return res.status(404).json({ message: `ad with id  not found` })
      }
      await dataSource.getRepository(Ad).save(adUpdate)
      res.status(201).json(adUpdate)
    } catch (err: any) {
      console.error(err.stack)
      res.status(500).json({ message: err.stack })
    }
  }

  async updateOne(req: Request, res: Response): Promise<any> {
    res.status(204).send('not yet')
  }

  async deleteOne(req: Request, res: Response): Promise<any> {
    if (!req.params.id) {
      return res.status(400).send('id is missing')
    }
    const adToRemve = await dataSource
      .getRepository(Ad)
      .delete(Number(req.params.id))
    console.log(adToRemve)

    if (adToRemve.affected == 0) {
      return res
        .status(404)
        .json({ message: `ad with id ${req.params.id} not found` })
    }
    res.status(204).json({ message: `ad with id ${req.params.id} deleted` })
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
