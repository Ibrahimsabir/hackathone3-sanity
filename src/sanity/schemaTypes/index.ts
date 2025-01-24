import { type SchemaTypeDefinition } from 'sanity'
import product from './products'
import products from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products],
}
