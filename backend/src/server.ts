import sqlite from 'sqlite3'
import express from 'express'
import bodyParser from 'body-parser'
console.log(' the good corner!')

import { Ads, Location } from './types'

const PORT = 3000

const db = new sqlite.Database('./bdd/db.sqlite').on('error', (err) => {
  err
    ? console.error('Error opening database', err)
    : console.info('Db connected')
  console.log('error', err)
})
db.get('PRAGMA foregin_keys = ON')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API OK')
})
app.get('/ads', (req, res) => {
  let adsWithCategoryQuery =
    'SELECT ads.* ,cat.id as catId, cat.name as categoryName FROM  ADS as ads LEFT JOIN CATEGORY as cat ON cat.id = ads.category '
  db.all(adsWithCategoryQuery, (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: 'Error occured' })
    } else {
      res.json(rows)
    }
  })
})

// retourn toue les categories
app.get('/category', (req, res) => {
  db.all('SELECT * FROM CATEGORY', (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: 'Error occured' })
    } else {
      res.json(rows)
    }
  })
})

// ajout d'une categorie par son nom
app.post('/category/', (req, res) => {
  console.log(req.body)
  if (req.body === undefined) {
    return res.status(400).json({ message: 'Requête incorrecte' })
  }
  const categoryName = req.body.name
  // check is name existe
  console.log(categoryName)
  if (categoryName === undefined) {
    return res
      .status(400)
      .json({ message: 'Requete incorreect sur le nom de la category' })
  }
  db.get(
    'SELECT * FROM CATEGORY WHERE name = $categoryName',
    {
      $categoryName: categoryName,
    },
    (err, row) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error occured' })
      }
      if (row) {
        return res.status(400).json({ message: 'Category already exist' })
      } else {
        db.run(
          'INSERT INTO CATEGORY (name) VALUES ($categoryName)',
          {
            $categoryName: categoryName,
          },
          (err) => {
            if (err) {
              console.error(err)
              res
                .status(500)
                .json({ message: 'Une erreur est survenue dans l ajout' })
            } else {
              res.status(204).send()
            }
          }
        )
      }
    }
  )
})

// rec
app.get('/category/:id', (req, res) => {
  const id = req.params.id
  db.get(
    'SELECT * FROM CATEGORY WHERE id = $id',
    {
      $id: id,
    },
    (err, row) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'Error occured' })
      }
      if (row) {
        return res.status(200).json(row)
      } else {
        return res.status(404).json({ message: 'Category not found' })
      }
    }
  )
})

// retourn tous les anonnces d'une categorie

app.get('/category/:categoryId/ads', (req, res) => {
  if (req.params.categoryId === undefined) {
    return res.status(400).json({ message: 'Requête incorrecte' })
  }

  let adsWithCategoryQuery =
    'SELECT ads.* ,cat.id as catId, cat.name as categoryName FROM  ADS as ads LEFT JOIN CATEGORY\
     as cat ON cat.id = ads.category '
  adsWithCategoryQuery += 'WHERE cat.id = $categoryId'

  db.all(
    adsWithCategoryQuery,
    { $categoryId: req.params.categoryId },
    (err, rows) => {
      if (err) {
        console.error(err)
        res.status(500).json({ message: 'Error occured' })
      } else {
        rows.length === 0
          ? res.status(404).json({ message: 'not found' })
          : res.json(rows)
      }
    }
  )
})

app.get('/ads/:id', (req, res) => {
  const idAds = req.params.id
  let adsWithCategoryQuery =
    'SELECT ads.* ,cat.id as catId, cat.name as categoryName FROM  ADS as ads LEFT JOIN CATEGORY as cat ON cat.id = ads.category WHERE id = $idAds '
  db.all(adsWithCategoryQuery, { $idAds: idAds }, (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: 'Error occured' })
    } else {
      rows.length === 0
        ? res.status(404).json({ message: 'not found' })
        : res.json(rows)
    }
  })
})

//GET /categories/:categoryId/ads
// const ads: Ads[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   title: `Title ${i + 1}`,
//   description: 'description',
//   owner: 'owner',
//   price: Math.round(Math.random() * 90) + 10,
//   picture: 'http://placehold.it/128',
//   location: ['nantes', 'paris', 'lyon', 'marseille', 'bordeaux'][
//     Math.round(Math.random() * 4)
//   ] as Location,
//   category: `category ${Math.round(Math.random() * 4) + 1}`,
//   date: new Date(
//     Date.now() - i * Math.round(Math.random() * 3600000) + 1
//   ).toUTCString() as string,
// }))
app.post('/ads', (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: 'Requête incorrecte' })
  }

  const ad = req.body
  console.log(ad)
  db.run(
    'INSERT INTO ADS (title, description, price, picture, location, category, date) VALUES ($title, $description, $price, $picture, $location, $category, $date)',
    {
      $title: ad.title,
      $description: ad.description || null,
      $price: ad.price || null,
      $picture: ad.picture || null,
      $location: ad.location || null,
      $category: ad.category || null,
      $date: new Date(Date.now()).toUTCString(),
    },
    (err) => {
      if (err) {
        console.error(err)
        res.status(500).json({ message: 'Une erreur est survenue' })
      } else {
        res.status(204).send()
      }
    }
  )
})

// db.run('INSERT INTO ADS (title,description,owner,price,picture,location,category,date) VALUES ($title,$description,$owner,$price,$picture,$location,$category,$date)',
// app.get('/ads', (req, res) => {
//   let results = []
//   if ('title' in req.query) {
//     const filterTitle = req.query.title.toLowerCase()
//     const filterRegExp = new RegExp(filterTitle, 'i') // insensible a al cass i
//     results = ads.filter(
//       (ad) => ad.title && filterRegExp.test(ad.title.toLowerCase())
//     )
//   } else {
//     results = ads
//   }

//   if ('page' in req.query) {
//     const page = req.query.page || 1
//     const limit = req.query.limit || 10
//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     results = [...results.slice(startIndex, endIndex)]

//     return res
//       .status(200)
//       .json({ count: results.length, page: page, results: results })
//   } else {
//     return res.status(200).json({ count: results.length, results: results })
//   }
// })

// app.get('/ads/:id', (req, res) => {
//   const id = req.params.id
//   const ad = ads.find((ad) => ad.id === parseInt(id))
//   if (ad === undefined) return res.status(404).json({ message: 'not found' })
//   return res.status(200).json(ad)
// })

// app.post('/ads', (req, res) => {
//   if (req.body === undefined)
//     return res.status(400).json({ message: 'bad request' })
//   const ad = req.body
//   ad.id = ads.length + 1
//   ads.push(ad)
//   console.log(ads)
//   return res.status(200).json(ads)
// })

// app.get('/ads',(req,res)=>{
//   db.
// })

// app.patch('/ads/:id', (req, res) => {
//   const id = req.params.id
//   const ad = ads.find((ad) => ad.id === parseInt(id))
//   if (ad === undefined) return res.status(404).json({ message: 'not found' })
//   const adToUpdate = req.body
//   Object.assign(ad, adToUpdate)
//   return res.status(200).json(ads)
// })
// app.patch('/ads/:idAd', (req, res) => {
//   try {
//     let query ="UPDATE Ad SET "
//     const fieds = Object.keys(req.body)
//     for(let i=0 ; i<fields.length;i++){
//       query+=fields[i] + "=?"
//       if(i !==fields.lenfth-1){
//         query+=', '
//       }else{
//         query+=''
//       }
//     }
//     query+= "Where id=?"
//     console.log(query)
//     Database.run (query,
//       [...Object.values(req.body),]
//       )

//   } catch (error) {
//     res.status(500).json({ succes: false, message: 'PATCH went wrong!' })
//   }
// })

// app.delete('/ads/:id', (req, res) => {
//   const id = req.params.id
//   const ad = ads.find((ad) => ad.id === parseInt(id))
//   if (ad === undefined) return res.status(404).json({ message: 'not found' })
//   ads.splice(ads.indexOf(ad), 1)
//   return res.status(200).json(ads)
// })

// app.put("/",(rqq,res)=>{
//   Database.run(
//     "marequetet",{
//       $adId : req.params.id
//       ...
//     }
//   )
// })
// app.delete('/ads/:id', (req, res) => {
//   const adId = req.params.id // Récupérez l'ID depuis les paramètres de la requête.

//   // Vérifiez si l'ID est valide (par exemple, s'il est numérique).
//   if (!adId || isNaN(adId)) {
//     res.status(400).send('ID invalide')
//     return
//   }

//   // Vérifiez si l'ID existe en base de données en effectuant une requête SELECT.
//   db.run('SELECT id FROM ads WHERE id = ?', [adId])
//     .then((row) => {
//       if (!row) {
//         // L'ID n'a pas été trouvé en base de données, renvoyez une réponse 404 (Not Found).
//         res.status(404).send('ID introuvable en base de données')
//       } else {
//         // L'ID existe en base de données, procédez à la suppression.
//         db.run(
//           'DELETE FROM ads WHERE id = $adId',
//           {
//             $adId: adId,
//           },
//           (err) => {
//             if (err) {
//               console.error(err)
//               res
//                 .status(500)
//                 .send('Une erreur est survenue lors de la suppression.')
//             } else {
//               res.status(204).send() // Réponse indiquant que la suppression a réussi.
//             }
//           }
//         )
//       }
//     })
//     .catch((error) => {
//       console.error(error)
//       res
//         .status(500)
//         .send(
//           "Une erreur est survenue lors de la recherche de l'ID en base de données."
//         )
//     })
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
