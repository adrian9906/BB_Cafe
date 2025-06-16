'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { userRegisterSchema } from '@/lib/validations/auth'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner"
import { Icons } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const result = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setIsLoading(false)

    if (!result?.ok) {
      return toast('Algo ha salido mal.',{
             description: 'No se ha podido registrar su usuario en el sistema.',
             className: 'toast-error',
             action:{
                 label: 'Intentalo de nuevo',
                 onClick:()=>{
                   router.replace('/')
                 }
             }
           })
         }
    router.push(searchParams?.get('from') || '/')
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='text-muted-foreground' htmlFor='user'>
              Nombre Completo
            </Label>
            <Input
              id='user'
              placeholder='Ej. Jhon Doe'
              autoCorrect='off'
              disabled={isLoading}
              {...register('name')}
            />
            {errors?.name && (
              <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='text-muted-foreground' htmlFor='username'>
              Usuario
            </Label>
            <Input
              id='username'
              autoCapitalize='none'
              placeholder='Ej. jhondoe'
              autoCorrect='off'
              disabled={isLoading}
              {...register('username')}
            />
            {errors?.username && (
              <p className='px-1 text-xs text-red-600'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='text-muted-foreground' htmlFor='email'>
              Correo
            </Label>
            <Input
              id='email'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              placeholder='Ej. jhondoe@cip.cu'
              autoCorrect='off'
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className='px-1 text-xs text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='text-muted-foreground' htmlFor='password'>
              Contraseña
            </Label>
            <Input
              id='password'
              type='password'
              autoComplete='new-password'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className='px-1 text-xs text-red-600'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='text-muted-foreground' htmlFor='confrimPassword'>
              Confirmar contraseña
            </Label>
            <Input
              id='confrimPassword'
              type='password'
              autoCapitalize='none'
              autoComplete='new-password'
              autoCorrect='off'
              disabled={isLoading}
              {...register('confrimPassword')}
            />
            {errors?.confrimPassword && (
              <p className='px-1 text-xs text-red-600'>
                {errors.confrimPassword.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}
