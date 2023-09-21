import { DataSource } from 'typeorm'
import { Ad, Category } from '../entities/'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './bdd/ads.db', // Path to your database file. a aprtir de la racine du projet
  entities: [Ad, Category],
  synchronize: true,

  migrations: ['./migration/**/*.ts'],
})
