import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Category } from '../entities'

@Resolver(Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async allCategory(): Promise<Category[] | null> {
    const categories = await Category.find()
    return categories
  }

  @Query(() => Category, { nullable: true })
  async category(@Arg('id', () => ID) id: number): Promise<Category | null> {
    const category = await Category.findOne({
      where: { id: id },
      relations: { ads: true },
    })
    return category
  }
}
