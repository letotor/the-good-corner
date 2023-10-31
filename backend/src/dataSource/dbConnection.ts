import { DataSource } from 'typeorm'
import { Ad, Category, Tag } from '../entities/'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './bdd/ads.db', // Path to your database file. a aprtir de la racine du projet
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: true,
  migrations: ['./migration/**/*.ts'],
})
