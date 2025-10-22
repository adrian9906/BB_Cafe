"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ArrowLeft, Palette, Coffee, Cookie, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductProps } from "@/app/products/page"
import { DeleteProduct } from "@/lib/actions"
import { toast } from "sonner"
import { CreateProductForm } from "./createProductForm"
import { EditProductForm } from "./EditProductForm"

export default function AdminProductsPage({ isAdmin, products }: { isAdmin: boolean, products: ProductProps[] }) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)


  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
      return
    }
  }, [isAdmin, router])


  const handleDelete = async (productId: string) => {
    const result = await DeleteProduct(productId)
    if (result === null) {
      return toast('Algo ha salido mal.', {
        description: 'Tu solicitud de acceso ha fallado. Intentalo más tarde.'
      })
    }
    router.refresh()
  }


  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col mb-8">
          <div className="flex w-full mb-6 justify-between items-start">
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="icon">
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>

              <div className="flex flex-col items-start">
                <h1 className="text-3xl font-bold">Gestión de Productos</h1>
                <p className="text-muted-foreground">Administra el catálogo de productos de BB Café</p>
              </div>
            </div>

            <Button onClick={() => setDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          <CreateProductForm productSize={products.length} dialog={dialogOpen} setDialog={setDialogOpen} />
        </div>



        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="relative pb-14 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >

              <CardContent className="p-4">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    sizes="100vw"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && <Badge className="absolute top-2 left-2 bg-amber-600">Destacado</Badge>}
                  {product.flavors && (
                    <Badge className="absolute top-2 right-2 bg-purple-600 text-white text-xs flex items-center gap-1">
                      <Palette className="h-3 w-3" />
                      Sabores
                    </Badge>
                  )}
                  <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm">
                    Stock: {product.stock}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {product.category === "coffee" ? (
                        <>
                          <Coffee className="h-3 w-3" />
                          Bebida
                        </>
                      ) : (
                        <>
                          <Cookie className="h-3 w-3" />
                          Dulce
                        </>
                      )}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-800 dark:text-amber-400">${product.price}</span>
                    <div className="flex gap-2">
                      <EditProductForm product={product} />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </div>
  )
}
