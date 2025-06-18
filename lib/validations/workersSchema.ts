import * as z from 'zod'


export const WorkersSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(20),
  image: z.string().min(3),
  position: z.string().min(3),
  phone: z.string().min(3),
  email: z.string().email()

  })
