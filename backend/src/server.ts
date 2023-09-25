import express from 'express'
import 'reflect-metadata'
console.log(' the good corner!')
import { dataSource } from './dataSource/dbConnection'

import setupRoutes from './routes'
const PORT = 3000
const app = express()
app.use(express.json())
setupRoutes(app)

app
  .listen(PORT, async () => {
    await dataSource.initialize()
    console.log(`🚀 Server ready on port ${PORT} ! `)
  })
  .on('error', (err: Error) => {
    console.error('Error on  serveur :', err)
  })
