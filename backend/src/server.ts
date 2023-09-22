// import sqlite from 'sqlite3'
import express from 'express'
import 'reflect-metadata'
console.log(' the good corner!')
// import { validate } from 'class-validator'

import { dataSource } from './dataSource/dbConnection'
// import { Ads as AdsType, Location } from './types'
// import { Ad, Category } from './entities/'

import setupRoutes from './routes'
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
setupRoutes(app)

app
  .listen(PORT, async () => {
    dataSource.initialize()
    console.log(`Le serveur écoute sur le port ${PORT}`)
  })
  .on('error', (err: Error) => {
    console.error('Erreur lors de la mise en écoute du serveur :', err)
  })
