import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Length } from 'class-validator'
import { Ad } from './Ad'

export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 100 })
  name!: string

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads!: Ad[]
}
