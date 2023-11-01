import { DataSource } from 'typeorm'
import { Ad, Tag, Category } from '../entities/'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './bdd/ads.db', // Path to your database file. a aprtir de la racine du projet
  entities: [Ad, Tag, Category],
  synchronize: true,
  logging: true,
  // migrations: ['./migration/**/*.ts'],
})
