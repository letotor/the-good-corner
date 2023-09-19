console.log(' the good corner!')
import { Ads, Location } from './types'

const PORT = 3000
const express = require('express')

const ads: Ads[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Title ${i + 1}`,
  description: 'description',
  owner: 'owner',
  price: Math.round(Math.random() * 90) + 10,
  picture: 'http://placehold.it/128',
  location: ['nantes', 'paris', 'lyon', 'marseille', 'bordeaux'][
    Math.round(Math.random() * 4)
  ] as Location,
  category: `category ${Math.round(Math.random() * 4) + 1}`,
  date: new Date(
    Date.now() - i * Math.round(Math.random() * 3600000) + 1
  ).toUTCString() as string,
}))

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API OK')
})

app.get('/ads', (req, res) => {
  let results = []
  if ('title' in req.query) {
    const filterTitle = req.query.title.toLowerCase()
    const filterRegExp = new RegExp(filterTitle, 'i') // insensible a al cass i
    results = ads.filter(
      (ad) => ad.title && filterRegExp.test(ad.title.toLowerCase())
    )
  } else {
    results = ads
  }

  if ('page' in req.query) {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    results = [...results.slice(startIndex, endIndex)]

    return res
      .status(200)
      .json({ count: results.length, page: page, results: results })
  } else {
    return res.status(200).json({ count: results.length, results: results })
  }
})

app.get('/ads/:id', (req, res) => {
  const id = req.params.id
  const ad = ads.find((ad) => ad.id === parseInt(id))
  if (ad === undefined) return res.status(404).json({ message: 'not found' })
  return res.status(200).json(ad)
})

app.post('/ads', (req, res) => {
  if (req.body === undefined)
    return res.status(400).json({ message: 'bad request' })
  const ad = req.body
  ad.id = ads.length + 1
  ads.push(ad)
  console.log(ads)
  return res.status(200).json(ads)
})

app.patch('/ads/:id', (req, res) => {
  const id = req.params.id
  const ad = ads.find((ad) => ad.id === parseInt(id))
  if (ad === undefined) return res.status(404).json({ message: 'not found' })
  const adToUpdate = req.body
  Object.assign(ad, adToUpdate)
  return res.status(200).json(ads)
})

app.delete('/ads/:id', (req, res) => {
  const id = req.params.id
  const ad = ads.find((ad) => ad.id === parseInt(id))
  if (ad === undefined) return res.status(404).json({ message: 'not found' })
  ads.splice(ads.indexOf(ad), 1)
  return res.status(200).json(ads)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
