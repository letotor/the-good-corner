import { Express } from 'express'
import routerAds from './ads.router'
import routerCategory from './category.router'

export default function setupRoutes(app: Express) {
  app.get('/api', (_req, res) => {
    res.send('API OK')
  })

  app.use('/api/ads', routerAds)
  app.use('/api/category', routerCategory)
}
