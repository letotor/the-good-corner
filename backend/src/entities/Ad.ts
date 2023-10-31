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
import { Category } from './Category'
import { Tag } from './Tag'

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @Length(3, 100)
  title!: string

  @Column({ nullable: true })
  @Length(0, 5000)
  @ValidateIf((object, value) => !!value)
  description!: string

  @Column()
  price!: number

  @Column()
  picture!: string

  @Column()
  location!: string

  @Column()
  owner!: string

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags!: Tag[]

  @CreateDateColumn()
  createdAt!: Date
}
