'use client'

import { columns } from './table/columns'
import { OrdersCustom } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Calendar, Filter, Package, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { OrdersTable } from './table/orders-table'
import { EmptyPlaceholder } from '@/components/ui/empty-placeholder'
import { Icons } from '@/components/ui/icons'

interface OrdersListProps {
  orders: OrdersCustom[]
}

export function OrdersList({
  orders,
}: OrdersListProps) {

    const [filteredOrders, setFilteredOrders] = useState<OrdersCustom[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [productFilter, setProductFilter] = useState("all")
    useEffect(() => {
    // Filtrar encargos
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)

      const matchesStatus = statusFilter === "all" || order.state === statusFilter
      const matchesProduct = productFilter === "all" || order.type === productFilter

      return matchesSearch && matchesStatus && matchesProduct
    })

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, productFilter])
  return (
    <>
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Encargos</h1>
              <p className="text-muted-foreground">Administra todos los encargos personalizados</p>
            </div>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Encargos</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter((o) => o.state === "pending").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En Proceso</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {orders.filter((o) => o.state === "in-progress").length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completados</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter((o) => o.state === "delivered").length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8 flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por cliente, email o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="in-progress">En Proceso</SelectItem>
                  <SelectItem value="ready">Listo</SelectItem>
                  <SelectItem value="delivered">Entregado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Producto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los productos</SelectItem>
                  <SelectItem value="cookies">Galletas</SelectItem>
                  <SelectItem value="macarons">Macarons</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                {filteredOrders.length} encargos encontrados
              </div>
            </div>
          </CardContent>
        </Card>
      {orders ? (
          <OrdersTable
          columns={columns}
          data={filteredOrders}
          />
        ) : (
            <EmptyPlaceholder>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
            <Icons.pending className='h-10 w-10' />
          </div>
          <EmptyPlaceholder.Title>
            No hay ordenes pendientes
          </EmptyPlaceholder.Title>
        </EmptyPlaceholder>
      )}
      </div>
    </>
  )
}



