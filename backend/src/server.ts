import express from 'express'
import 'reflect-metadata'
console.log(' the good corner!')
import { dataSource } from './dataSource/dbConnection'
import cors from 'cors'
import setupRoutes from './routes'
const PORT = 5000
const app = express()
app.use(cors())
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
