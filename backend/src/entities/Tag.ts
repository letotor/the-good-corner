import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Ad } from './Ad'
import { Length } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ length: 20, unique: true })
  @Length(3, 20)
  @Field()
  name!: string

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[]
}

@InputType()
export class TagCreateInput {
  @Field()
  name!: string
}
