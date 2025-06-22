'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/tables/data-table-header'
import { OrdersCustom } from '@/types'
import { OrdersOptions } from '../orders-opctions'
import { Palette } from 'lucide-react'


export const getThemeLabel = (theme: string) => {
    const themes: Record<string, string> = {
      halloween: "Halloween 🎃",
      anime: "Anime 🌸",
      disney: "Disney ✨",
      superheroes: "Superhéroes 🦸",
      unicorns: "Unicornios 🦄",
      sports: "Deportes ⚽",
      flowers: "Flores 🌺",
      baby: "Baby Shower 👶",
      wedding: "Bodas 💒",
      birthday: "Cumpleaños 🎉",
      christmas: "Navidad 🎄",
      custom: "Personalizado 🎨",
    }
    return themes[theme] || theme
  }


export const columns: ColumnDef<OrdersCustom>[] = [
  {
    accessorKey: 'name',
    meta: {
      name: 'name'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Nombre del cliente' />
    },
    cell: ({ row }) => {
      const name = row.original.name
      return <div>{name}</div>
    }
  },
  {
    accessorKey: 'type',
    meta: {
      name: 'type'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Producto' />
    },
     cell: ({ row }) => {
      const name = row.original.type
      return <div>{name}</div>
    }
  },
  {
    accessorKey: 'themeType',
    meta: {
      name: 'themeType'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Temática' />
    },
     cell: ({ row }) => {
                          
                        
      const theme = row.original.themeType
      return (
      <div>
        <Badge variant="outline" className="text-xs">
            <Palette className="h-3 w-3 mr-1" />
             {getThemeLabel(theme || 'custom')}
        </Badge>
    </div>)
    }
  },
  {
    accessorKey: 'quantity',
    meta: {
      name: 'quantity'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Cantidad' />
    },
     cell: ({ row }) => {
      const name = row.original.quantity
      return <div>{name}</div>
    }
  },
  {
    accessorKey: 'delivery',
    meta: {
      name: 'delivery'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Fecha de Entrega' />
    },
    cell: ({ row }) => {
      const startDate = row.getValue('delivery') as Date
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
      name: 'state'
    },
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Estado' />
    },
    cell: ({ row }) => {
      const profile = row.original
      const name = profile?.state
      const badges = {
        pending: <Badge className='border-gray-200 bg-gradient-to-r from-yellow-400 to-pink-500 dark:border-gray-800'>{'pendiente'.toUpperCase()}</Badge>,
        completed: <Badge className='border-gray-200 bg-gradient-to-r from-green-400 to-blue-500 dark:border-gray-800'>{'completado'.toUpperCase()}</Badge>,
        confirmed:<Badge className='border-gray-200 bg-gradient-to-r from-blue-300 to-amber-200 dark:border-gray-800'>{'confirmado'.toUpperCase()}</Badge>,
        delivered:<Badge className='border-gray-200 bg-gradient-to-r from-fuchsia-600 to-cyan-500 dark:border-gray-800'>{'entregado'.toUpperCase()}</Badge>,
        cancelled: <Badge variant={'destructive'}>{'cancelado'.toUpperCase()}</Badge>,
        error: (
          <Badge variant={'destructive'}>
            {'no envidao'.toUpperCase()}
          </Badge>
        )
      }
      return badges[name as keyof typeof badges]
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const orders = row.original

      return <OrdersOptions orders={orders} />
    }
  }
]
