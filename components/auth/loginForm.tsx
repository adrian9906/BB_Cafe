"use client"

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner"
import { Icons } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { userAuthSchema } from '@/lib/validations/auth'


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = React.useState(false)
  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const signInResult = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/'
    })
    setIsLoading(false)

    if (!signInResult?.ok) {
      console.log(signInResult?.error)
      return toast('Algo ha salido mal.',{
        description: 'Tu solicitud de acceso ha fallado. Intentalo más tarde.',
        className: 'toast-error',
        action:{
            label: 'Intentalo de nuevo',
            onClick:()=>{
              router.replace('/')
            }
        }
      })
    }
    router.replace('/')
  }

  return (
      <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Usuario
            </Label>
            <Input
              id='email'
              autoCapitalize='none'
              placeholder='Email'
              autoComplete='email'
              autoCorrect='off'
              type='email'
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
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <div className='relative'>
                <Input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='Contraseña'
                autoComplete='current-password'
                autoCapitalize='none'
                autoCorrect='off'
                disabled={isLoading}
                {...register('password')}

                />
                <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <Icons.eyeOff className="h-4 w-4" /> : <Icons.views className="h-4 w-4" />}
                </Button>

            </div>
            {errors?.password && (
              <p className='px-1 text-xs text-red-600'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
