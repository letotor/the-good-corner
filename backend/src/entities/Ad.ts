import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Length, ValidateIf, IsInt } from 'class-validator'
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
  @IsInt()
  price!: number

  @Column()
  picture!: string

  @Column()
  location!: string

  @Column()
  owner!: string

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category

  @Column()
  dateAtCreated!: Date
}
