import 'reflect-metadata'
import { dataSource } from './dataSource/dbConnection'
import { AdsResolver } from './resolvers/Ads'
import { TagsResolver } from './resolvers/Tags'
import { CategoriesResolver } from './resolvers/Categories'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'

async function start() {
  await dataSource.initialize()

  const schema = await buildSchema({
    resolvers: [AdsResolver, CategoriesResolver,TagsResolver],
  })

  const server = new ApolloServer({
    schema,
  })

  await startStandaloneServer(server, {
    listen: {
      port: 5000,
    },
  })

  console.log('🚀 Server started!')
}

start()
