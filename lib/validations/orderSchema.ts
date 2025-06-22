

import * as z from 'zod'


export const OrderSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(12),
  flavors: z.string().min(3).optional(),
  decorations: z.boolean().optional(),
  delivery: z.date(),
  type: z.string().min(5),
  adress:z.string().min(5),
  themeType:z.string(),
  email: z.string().email(),
  quantity: z.coerce.number().min(1),
  theme:z.string().optional(),
  request:z.string().optional(),
  })