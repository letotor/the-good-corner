import { InputType, Field, ID } from 'type-graphql'

@InputType()
export class ObjectId {
  @Field(() => ID)
  id!: number
}




