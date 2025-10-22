'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/tables/data-table-header'
import { CustomOrder } from '@prisma/client'
import { OrderOptions } from '../order-options'

export const columns: ColumnDef<CustomOrder>[] = [
    {
        accessorKey: 'name',
        meta: {
            name: 'name'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Nombre' />
        },
        cell: ({ row }) => {
            const profile = row.original.name
            return <div>{profile}</div>
        }
    },
    {
        accessorKey: 'phone',
        meta: {
            name: 'Teléfono'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Teléfono' />
        },
        cell: ({ row }) => {
            return <div>{row.original.phone}</div>
        }
    },

    {
        accessorKey: 'email',
        meta: {
            name: 'Email'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Correo Electrónico' />
        },
        cell: ({ row }) => {
            return <div>{row.original.email}</div>
        }
    },
    {
        accessorKey: 'theme',
        meta: {
            name: 'Tema'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Tema' />
        },
        cell: ({ row }) => {
            return <div>{row.original.theme}</div>
        }
    },
    {
        accessorKey: 'quantity',
        meta: {
            name: 'Cantidad'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Cantidad' />
        },
        cell: ({ row }) => {
            return <div>{row.original.quantity}</div>
        }
    },

    {
        accessorKey: 'type',
        meta: {
            name: 'Tipo'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Tipo de Orden' />
        },
        cell: ({ row }) => {
            return <div>{row.original.type}</div>
        }
    },
    {
        accessorKey: 'deliveryDate',
        meta: {
            name: 'Fecha de Entrega'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Fecha de Entrega' />
        },
        cell: ({ row }) => {
            const startDate = row.getValue('deliveryDate') as Date
            const formatedDate = startDate.toLocaleDateString('es-ES', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric'
            })
            return <div>{formatedDate}</div>
        }
    },

    {
        accessorKey: 'state',
        meta: {
            name: 'Estado'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Estado' />
        },
        cell: ({ row }) => {
            const profile = row.original.state
            const isCanceled = profile === 'canceled'
            const name = profile ?? ''
            console.log(name)
            const badges = {
                pending: <Badge className='border-gray-200 bg-yellow-400 dark:border-gray-800'>{name.toUpperCase()}</Badge>,
                processing: <Badge className='border-gray-200 bg-blue-400 dark:border-gray-800'>{name.toUpperCase()}</Badge>,
                delivered: (
                    <Badge className='border-gray-200 bg-green-600 dark:border-gray-800'>
                        {name.toUpperCase()}
                    </Badge>
                )
            }
            if (isCanceled) {
                return <Badge variant={'destructive'}>CANCELADO</Badge>
            }
            return badges[name as keyof typeof badges]
        }
    },
    {
        accessorKey: 'price',
        meta: {
            name: 'Precio'
        },
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Precio' />
        },
        cell: ({ row }) => {
            return <div> $ {row.original.price}</div>
        }
    },
    {
        id: 'actions',
        meta: {
            name: 'Acciones'
        },
        header: () => <div className='text-right'>Acciones</div>,
        cell: ({ row }) => {
            const customOrder = row.original

            return <OrderOptions customOrder={customOrder} />
        }
    }
]