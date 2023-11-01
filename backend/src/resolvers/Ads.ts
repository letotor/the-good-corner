import { AdCreateInput } from './../entities/Ad'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Ad, Category } from '../entities'

import { validate } from 'class-validator'
// import { dataSource } from '../dataSource/dbConnection'

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad], { nullable: true })
  async allAds(): Promise<Ad[] | null> {
    const ads = await Ad.find({ relations: { category: true } })
    return ads
    // return await dataSource.manager.find(Ad, { relations: { category: true } })
  }

  @Mutation(() => Ad)
  async createAd(
    @Arg('data', () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad()
    Object.assign(newAd, data)

    const errors = await validate(newAd)
    if (errors.length === 0) {
      await newAd.save()
      return newAd
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`)
    }
  }

  @Mutation(() => Ad)
  async modifyAds(): Promise<Ad | null> {
    return null
  }
}
