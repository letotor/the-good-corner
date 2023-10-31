import { Query, Resolver } from 'type-graphql'
import { Ad } from '../entities'

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(): Promise<Ad[]> {
    return []
  }
}
