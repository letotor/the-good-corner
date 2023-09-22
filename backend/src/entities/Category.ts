// import { Category } from './Category';
import { Entity,ManyToOne, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
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


  // @ManyToOne(() => Category, (category) => category.ads)
  // category!:Category
  
  constructor(name: string) {
    super()
    this.name = name
    // this.category = category
  }

}
