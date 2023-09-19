export type Location = 'nantes' | 'paris' | 'lyon' | 'marseille' | 'bordeaux'
export type Ads = {
  id: number | string
  title: string
  description: string
  owner: string
  price: number
  picture: string
  location: Location
  category: string
  date: string
}
