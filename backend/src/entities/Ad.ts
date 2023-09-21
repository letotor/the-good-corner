import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  price!: number

  @Column()
  picture!: string

  @Column()
  location!: string

  @Column()
  category!: string

  @Column()
  date!: Date

  // Ajoutez d'autres colonnes au besoin
  constructor(
    title: string,
    description: string,
    price: number,
    picture: string,
    location: string,
    category: string
  ) {
    super()
    this.title = title
    this.description = description
    this.price = price
    this.picture = picture
    this.location = location
    this.category = category
    this.date = new Date(Date.now().toLocaleString())
  }
}
