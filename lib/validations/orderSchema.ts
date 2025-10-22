

import * as z from 'zod'


export const OrderSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^[\d\s\-$$$$+]+$/, "Formato de teléfono inválido"),
  flavors: z.array(z.string()).default([]).optional(),
  decorations: z.array(z.string()).default([]).optional(),
  type: z.string().min(5),
  adress: z.string().min(5),
  themeType: z.string(),
  email: z.string().email("Ingresa un email válido"),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1").max(1000, "Cantidad máxima: 1000"),
  theme: z.string().optional(),
  request: z.string().optional(),
  referenceImage: z.string().optional(),
  deliveryDate: z.date({
    required_error: "Selecciona una fecha de entrega",
  }),
  deliveryAddress: z.string().max(300, "La dirección es muy larga").optional(),

  // Solicitudes especiales
  specialRequests: z.string().max(1000, "Las solicitudes especiales no pueden exceder 1000 caracteres").optional(),
})
