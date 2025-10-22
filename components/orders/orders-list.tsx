import { CustomOrder } from '@prisma/client'
import { EmptyPlaceholder } from '../ui/empty-placeholder'
import { Icons } from '../ui/icons'
import { OrdersTable } from './tables/orders-table'
import { columns } from './tables/columns'

interface OrdersListProps {
    orders: CustomOrder[] | null
}

export function OrdersList({
    orders,
}: OrdersListProps) {
    const total = orders?.reduce((acc, order) => acc + (order.price ?? 0), 0) ?? 0

    return (
        <>
            {orders ? (
                <OrdersTable
                    total={total}
                    columns={columns}
                    data={orders}
                />
            ) : (
                <EmptyPlaceholder>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
                        <Icons.pending className='h-10 w-10' />
                    </div>
                    <EmptyPlaceholder.Title>
                        No hay órdenes pendientes
                    </EmptyPlaceholder.Title>
                </EmptyPlaceholder>
            )}
        </>
    )
}