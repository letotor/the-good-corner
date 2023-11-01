import { Location } from './../types/Ads'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Length, ValidateIf } from 'class-validator'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Tag } from './Tag'
import { ObjectId } from './ObjectId'
import { Category } from './Category'

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ length: 50 })
  @Field()
  @Length(3, 50)
  title!: string

  @Column({ nullable: true })
  @Length(0, 5000)
  @ValidateIf((object, value) => !!value)
  @Field()
  description!: string

  @Column()
  @Field(() => Int)
  price!: number

  @Column()
  @Field()
  picture!: string

  @Column()
  @Field()
  location!: string

  @Column()
  owner!: string

  // @Column()
  // @Field(() => ID)
  // categoryId!: number

  @CreateDateColumn()
  @Field()
  createdAt!: Date

  @ManyToOne(() => Category, (category) => category.ads)
  @JoinColumn()
  @Field(() => Category, { nullable: true })
  // ecommandé d'écrire le @JoinColumn() pour plus de clarté. Cela permet de spécifier explicitement la colonne de jointure qui sera utilisée pour la relation.
  category!: Category

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags!: Tag[]
}

@InputType()
export class AdCreateInput {
  @Field()
  title!: string

  @Field(() => Int)
  price!: number

  @Field()
  picture!: string

  @Field({ nullable: true })
  location!: string

  @Field()
  description!: string

  @Field(() => [ObjectId])
  tags!: ObjectId[]
}
