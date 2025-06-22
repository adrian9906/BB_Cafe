import * as z from 'zod'

const passwordValidation = (value: string) => {
  // Expresión regular para validar la contraseña
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,16}$/;
  return regex.test(value);
}
export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(passwordValidation, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
  })
})

export const userRegisterSchema = z.object({
  name: z.string(),
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().refine(passwordValidation, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
  }),
  confrimPassword: z.string().refine(passwordValidation, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
  })
}).refine(data => data.password === data.confrimPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confrimPassword"]
})