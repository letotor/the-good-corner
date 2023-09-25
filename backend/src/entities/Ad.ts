import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Length, ValidateIf } from 'class-validator'
import { Category } from './Category'

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
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
  category!: string

  @Column()
  dateAtCreated!: Date
}
