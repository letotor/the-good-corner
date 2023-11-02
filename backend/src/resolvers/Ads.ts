import { AdCreateInput } from './../entities/Ad'
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Ad, Category } from '../entities'

import { validate } from 'class-validator'
// import { dataSource } from '../dataSource/dbConnection'

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad], { nullable: true })
  async allAds(): Promise<Ad[] | null> {
    const ads = await Ad.find({ relations: { category: true, tags: true } })
    return ads
    // return await dataSource.manager.find(Ad, { relations: { category: true } })
  }

  @Query(() => Ad, { nullable: true })
  async ad(@Arg('id', () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { category: true, tags: true },
    })

    return ad
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
