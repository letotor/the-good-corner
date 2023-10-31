export type Location = 'nantes' | 'paris' | 'lyon' | 'marseille' | 'bordeaux'
import { Tag } from '../entities/Tag'
export type Ads = {
  id: number | string
  title: string
  description: string
  owner: string
  price: number
  picture: string
  location: Location
  category: string
  createdAt: Date
  tags: Tag[]
}
