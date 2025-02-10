import { createClient } from '@sanity/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
// Create Sanity client
const client = createClient({
  projectId: 'r520isj1',
  dataset: 'production',
  useCdn: true,
  token: 'skIglqUqSOmBvUVUaE8EuvPVJZHmg5NDlsNvfkd2LcyYPiFF5olIikH9ykVnQ1n0OWIOhqGbRPNYv5of2WZ1rzjdMa5fb52PguKWxhaE0z30736XdwHx9ftiv65uUR0OUeUNoNNvqyrwoA7fgruZh9mESBz6XnDMxFlTurVUGmAFNEIuVLD2',
  apiVersion: '2025-01-13'
})
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    })
    console.log(`Image uploaded successfully: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error)
    return null
  }
}
async function importData() {
  try {
    console.log('Fetching products from API...')
    const response = await axios.get('https://template1-neon-nu.vercel.app/api/products')
    const products = response.data
    console.log(`Fetched ${products.length} products`)
    for (const product of products) {
      console.log(`Processing product: ${product.title}`)
      let imageRef = null
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image)
      }
      const sanityProduct = {
        _type: 'product',
        name: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: 0,
        priceWithoutDiscount: product.price,
        rating: product.rating?.rate || 0,
        ratingCount: product.rating?.count || 0,
        tags: product.category ? [product.category] : [],
        sizes: [],
        image: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef,
          },
        } : undefined,
      }
      console.log('Uploading product to Sanity:', sanityProduct.name)
      const result = await client.create(sanityProduct)
      console.log(`Product uploaded successfully: ${result._id}`)
    }
    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }
}
importData()