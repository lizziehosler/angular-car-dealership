export class Dealership {
  id: number
  name: string
  city: string
  state: string
  owner: string
  image: string
  created_at: string
  updated_at: string
  constructor({
    id = null,
    name = '',
    city = '',
    state = '',
    owner = '',
    image = '',
    created_at = '',
    updated_at = '',
    ...rest
  }) {
    Object.assign(this, rest)
    this.id = id,
    this.name = name,
    this.city = city,
    this.state = state,
    this.owner = owner,
    this.image = image,
    this.created_at = created_at,
    this.updated_at = updated_at
  }
}
