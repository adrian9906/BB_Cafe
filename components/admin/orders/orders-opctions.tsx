'use client'
import * as React from 'react'



import { OrdersCustom } from '@/types'
import { Eye } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { db } from '@/lib/db'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useRouter } from 'next/navigation'
import { UpdateOrders } from '@/lib/actions'
import OrdersDetails from './ordersDatils'

type Props = {
  orders: OrdersCustom
}

export function OrdersOptions({ orders }: Props) {
  const router = useRouter()
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)

  const openOrderDetail = () => {
    setIsDetailOpen(true)
  }

   const updateOrderStatus = async (orderId: string, newStatus: OrdersCustom["state"]) => {
    console.log(newStatus)
    try {
      await UpdateOrders(orderId, newStatus || 'pending')
      router.refresh()
      // setOrders(updatedOrders)
      // localStorage.setItem("bb-cafe-orders", JSON.stringify(updatedOrders))
    } catch (error) {
      console.log(error)
    }
    // setOrders(updatedOrders)
    // localStorage.setItem("bb-cafe-orders", JSON.stringify(updatedOrders))
  }

  async function handleDeleteOrder(order: OrdersCustom) {
    try {
      const response = await db.customOrder.delete({
        where:{
          id: order.id
        }
      })
      if (response) {
       console.log('eliminado')
      }
      return true
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        throw error
      }
    }
  }
  return (
    <>
      <div className="flex gap-2">
       <Button
         size="sm"
         variant="outline"
         onClick={(e) => {
           e.stopPropagation()
           openOrderDetail()
         }}
       >
         <Eye className="h-4 w-4" />
       </Button>
       <Select
         value={orders.state || 'pending'}
         onValueChange={(value) => {
           updateOrderStatus(orders.id, value as OrdersCustom["state"])
         }}
       >
         <SelectTrigger className="w-32" onClick={(e) => e.stopPropagation()}>
           <SelectValue />
         </SelectTrigger>
         <SelectContent>
           <SelectItem value="pending">Pendiente</SelectItem>
           <SelectItem value="confirmed">Confirmado</SelectItem>
           <SelectItem value="completed">Completado</SelectItem>
           <SelectItem value="delivered">Entregado</SelectItem>
           <SelectItem value="cancelled">Cancelado</SelectItem>
         </SelectContent>
       </Select>
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
              Esta seguro que desea descartar esta orden?
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

                const deleted = await handleDeleteOrder(orders)

                if (deleted) {
                  setIsLoading(false)
                  setShowDeleteAlert(false)
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

      {isDetailOpen &&(
        <OrdersDetails order={orders} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen}/>
      )}
    </>
    )
}
