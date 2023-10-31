import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { Length, ValidateIf, IsInt } from 'class-validator'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  @Length(3, 100)
  title!: string

  @Column({ nullable: true })
  @Length(0, 5000)
  @ValidateIf((object, value) => !!value)
  @Field()
  description!: string

  @Column()
  price!: number

  @Column()
  picture!: string

  @Column()
  location!: string

  @Column()
  owner!: string

  @CreateDateColumn()
  @Field()
  createdAt!: Date
}
