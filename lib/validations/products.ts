import * as z from 'zod'


export const ProductsSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(20),
  price:z.coerce.number().min(0.01),
  image: z.string().min(3),
  category: z.string().min(3),
  stock: z.coerce.number().min(0),
  featured: z.boolean(),
  flavors:z.string().optional()

  })
