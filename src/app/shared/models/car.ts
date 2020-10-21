export class Car {
  color: string
  created_at: string
  dealership_id: number
  id: number
  image: string
  make: string
  model: string
  notes: string
  price: number
  updated_at: string
  year: number
  constructor({
    color = '',
    created_at = '',
    dealership_id = null,
    id = null,
    image = '',
    make = '',
    model = '',
    notes = '',
    price = null,
    updated_at = '',
    year = null,
    ...rest
  }) {
    Object.assign(this, rest)
    this.color = color,
    this.created_at = created_at,
    this.dealership_id = dealership_id,
    this.id = id,
    this.image = image,
    this.make = make,
    this.model = model,
    this.notes = notes,
    this.price = price,
    this.updated_at = updated_at,
    this.year = year
  }
}
