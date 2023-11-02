import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Tag } from '../entities/'

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag], { nullable: true })
  async allTag(): Promise<Tag[] | null> {
    const tags = await Tag.find({ relations: { ads: true } })
    return tags
  }

  @Query(() => Tag, { nullable: true })
  async tag(@Arg('id', () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id: id },
      relations: { ads: true },
    })
    return tag
  }
}
