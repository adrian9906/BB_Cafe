import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductProps } from "@/app/products/page";


export default function CardAdmin({products}:{products: ProductProps[]}) {

    return (
        <>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{products.length}</div>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <Package className="h-4 w-4" />
                En catálogo
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Ventas Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${0}</div>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <DollarSign className="h-4 w-4" />
                Este mes
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{0}</div>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <ShoppingCart className="h-4 w-4" />
                Este mes
              </div>
            </CardContent>
          </Card>
        </>
    )
}