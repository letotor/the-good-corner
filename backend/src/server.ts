import sqlite from 'sqlite3'
import express from 'express'
import 'reflect-metadata'
console.log(' the good corner!')

import { dataSource } from './dataSource/dbConnection'
import { Ads as AdsType, Location } from './types'
import { Ad } from './entities/Ad'

const PORT = 3000

// const db = new sqlite.Database('./bdd/db.sqlite').on('error', (err) => {
//   err
//     ? console.error('Error opening database', err)
//     : console.in('Db connected')
//   console.log('error', err)
// })
// db.get('PRAGMA foregin_keys = ON')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API OK')
})

app.get('/ads', async (_req, res) => {
  try {
    const ads = await dataSource.getRepository(Ad).find()
    res.send(ads)
  } catch (err) {
    res.send(err)
  }
})

app.post('/ads', async (req, res) => {
  try {
    const { title, description, price, picture, location, category, date } =
      req.body
    const ad = new Ad(title, description, price, picture, location, category)
    await ad.save()
    res.send(ad)
  } catch (err) {
    res.send(err)
  }
})

app.get('/ads', async (req, res) => {
  try {
    const ads = await dataSource.getRepository(Ad).find()
    res.send(ads)
  } catch {
    console.log('error')
  }
})

app.get('/ads/:id', async (req, res) => {
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
})

app.delete('/ads/:id', async (req, res) => {
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
})

app.patch('/ads/:id', async (req, res) => {
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

  const adUpdate = await dataSource.getRepository(Ad).merge(ad, req.body)
  if (!adUpdate) {
    return res.status(404).json({ message: `ad with id  not found` })
  }
  await dataSource.getRepository(Ad).save(adUpdate)
  res.status(200).send(adUpdate)
})

app
  .listen(PORT, async () => {
    dataSource.initialize()
    console.log(`Le serveur écoute sur le port ${PORT}`)
  })
  .on('error', (err: Error) => {
    console.error('Erreur lors de la mise en écoute du serveur :', err)
  })
