import { Metadata } from 'next'
import Link from 'next/link'

import Header from '@/components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { UserRegisterForm } from '@/components/auth/registerForm'
import { getCurrentUser } from '@/lib/session'
import { UserProps } from '@/app/(landing)/page'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicie sesión en su cuenta'
}

export default async function RegisterPage() {
    const user: UserProps | null = await getCurrentUser ();
     const isAdmin = user?.rol === "ADMIN"
     const isLogged = user !== null  
    return (
        <main className='min-h-screen bg-background'>
        <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
        <div className="container mx-auto px-4 py-30">
            <div className="max-w-xl mx-auto">
            <Card>
                <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <Icons.singIN className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
                <CardDescription>
                    Únete al equipo de BB Café y disfruta de nuestra oferta de café preparado a tu manera.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 mb-2">
                  <Icons.gift className="h-5 w-5" />
                  <span className="font-semibold">¡Beneficio Exclusivo!</span>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Los usuarios registrados obtienen un <strong>10% de descuento</strong> en todas sus compras
                  automáticamente.
                </p>
              </div>
            <UserRegisterForm />
            <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-amber-600 hover:underline">
                        Inicia sesión aquí
                    </Link>
                    </p>
            </div>
            </CardContent>
            </Card>
        </div>
        </div>
        </main>
    )

}