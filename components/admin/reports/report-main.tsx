"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Download,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { KpiCards } from "./kpiCards"


export default function AdminReportsMain({isAdmin, usersActive}:{isAdmin: boolean, usersActive:number}) {
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
    }
  }, [isAdmin, router])


  const topProducts = [
    { name: "Cappuccino Clásico", sales: 89, revenue: 445.11, growth: 15.2 },
    { name: "Brownies de Chocolate", sales: 67, revenue: 869.33, growth: 8.7 },
    { name: "Latte Vainilla", sales: 54, revenue: 296.46, growth: -2.1 },
    { name: "Mocha", sales: 43, revenue: 257.57, growth: 22.3 },
    { name: "Cheesecake de Fresa", sales: 38, revenue: 721.62, growth: 31.5 },
  ]

  const monthlyData = [
    { month: "Enero", sales: 12500, orders: 280 },
    { month: "Febrero", sales: 13200, orders: 295 },
    { month: "Marzo", sales: 13750, orders: 298 },
    { month: "Abril", sales: 15420, orders: 342 },
  ]

  if (!isAdmin) {
    return null
  }

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Reportes y Análisis</h1>
              <p className="text-muted-foreground">Análisis detallado del rendimiento de BB Café</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Filtrar Fechas
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <KpiCards usersActive={usersActive}/>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Productos Más Vendidos
              </CardTitle>
              <CardDescription>Rendimiento de productos este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} ventas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${product.revenue.toFixed(2)}</p>
                      <div className="flex items-center gap-1">
                        {product.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                        <span className={`text-xs ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                          {product.growth > 0 ? "+" : ""}
                          {product.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Tendencia Mensual
              </CardTitle>
              <CardDescription>Ventas y pedidos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{data.month}</p>
                      <p className="text-sm text-muted-foreground">{data.orders} pedidos</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${data.sales.toLocaleString()}</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.sales / 16000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">Resumen Positivo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Ventas crecieron 12.1% este mes
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Pedidos aumentaron 14.8%
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Cheesecake de Fresa +31.5%
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <CardHeader>
              <CardTitle className="text-amber-700 dark:text-amber-300">Áreas de Atención</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-amber-600" />
                  Latte Vainilla bajó 2.1%
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-amber-600" />3 productos con stock bajo
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-amber-600" />
                  Revisar precios competitivos
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Recomendaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Promocionar Mocha (+22.3%)
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Aumentar stock de Cheesecake
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Revisar receta Latte Vainilla
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
