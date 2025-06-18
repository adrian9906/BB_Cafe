"use client"

import { ProductProps } from "@/app/products/page"
import CardAdmin from "./cardsAdmin"
import CardActions from "./cardActions"
import ProductManagement from "./productsManagement"
import StockAlert from "./stockAlert"



// const router = useRouter()
//  const isAdmin = user?.rol === "ADMIN"

//   useEffect(() => {
//     if (!isAdmin) {
//       router.push("/login")
//     }
//   }, [isAdmin, router])

export default function AdminHome({ products}:{products: ProductProps[]}) {
  const notStock = products.filter(product => product.stock === 0).length
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración BB Café</h1>
          <p className="text-muted-foreground text-lg">
            Gestiona tu negocio desde aquí. Controla productos, ventas y más.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CardAdmin products={products}/>
        </div>

        {/* Not Stock Products */}
        {notStock > 0 && (
          <div className="w-full">
            <StockAlert stock={notStock}/>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CardActions/>
        </div>

        {/* Products Management */}
        <ProductManagement products={products}/>
      </div>
    </div>
  )
}
