// import { Category } from './Category';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Ad } from './Ad'
import { Length } from 'class-validator'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, length: 50 })
  @Length(2, 50, {
    message: 'Le nom de la catégorie doit contenir entre 2 et 50 caractères',
  })
  name!: string

  @OneToMany(() => Ad, (ad) => ad.category)
  ads!: Ad[]
}
