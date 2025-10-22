'use client'
import * as React from 'react'
import { CustomOrder } from '@prisma/client'

import { Button, buttonVariants } from '../ui/button'

import { AlertDialog } from '@radix-ui/react-alert-dialog'

import { Icons } from '../ui/icons'

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../ui/alert-dialog'
import Link from 'next/link'
import { toast } from 'sonner'
import { deleteOrder } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type Props = {
    customOrder: CustomOrder
}

export function OrderOptions({ customOrder }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
    const router = useRouter()
    async function handleDeleteOrder(customOrder: CustomOrder) {
        try {
            await deleteOrder({
                id: customOrder.id
            })
            return true
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error al eliminar la orden ${customOrder.id}: ${error.message}`)
                console.log(error.message)
            } else {
                throw error
            }
        }
    }
    return (
        <>
            <div className='flex justify-end gap-2 align-middle'>
                <Link
                    title='Detalles'
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                    href={`/order/view/${customOrder.id}`}
                >
                    <Icons.views className='h-4 w-4' />
                </Link>
                <Button
                    className='border-red-800 hover:border-red-700'
                    title='Descartar'
                    variant='outline'
                    size='icon'
                    onClick={() => {
                        setShowDeleteAlert(true)
                    }}
                >
                    <Icons.close color='red' className='h-4 w-4' />
                </Button>
            </div>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Esta seguro que desea eliminar esta orden?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción es irreversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async event => {
                                event.preventDefault()
                                setIsLoading(true)


                                const deleted = await handleDeleteOrder(customOrder)

                                if (deleted) {
                                    setIsLoading(false)
                                    setShowDeleteAlert(false)
                                    toast.error(`Eliminado con éxito la ordern ${customOrder.id}`)
                                    router.push('/order')

                                }
                            }}
                            className='bg-red-600 focus:ring-red-600'
                        >
                            {isLoading ? (
                                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                            ) : (
                                <Icons.trash className='mr-2 h-4 w-4' />
                            )}
                            <span>Eliminar</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}