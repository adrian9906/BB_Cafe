

import { Edit, Package, Plus, Search, Settings, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ProductProps } from "@/app/products/page";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import Image from "next/image"
import { Badge } from "../ui/badge";
import { DeleteProduct, EditFeatured } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function ProductManagement({ products }: { products: ProductProps[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const handleDeleteProduct = async (productId: string) => {
        const result = await DeleteProduct(productId)
        if (result === null) {
            return toast('Algo ha salido mal.', {
                description: 'Tu solicitud de acceso ha fallado. Intentalo más tarde.'
            })
        }
        router.refresh()
    }

    const toggleFeatured = async (productId: string) => {
        const result = await EditFeatured(productId)
        if (result === null) {
            return toast('Algo ha salido mal.', {
                description: 'Tu solicitud de acceso ha fallado. Intentalo más tarde.'
            })
        }
        router.refresh()
    }

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesSearch =
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                return matchesSearch
            })
    }, [searchTerm, products])
    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Gestión de Productos</CardTitle>
                            <CardDescription>Administra tu catálogo de productos directamente desde aquí</CardDescription>
                        </div>
                        <Button asChild className="bg-amber-600 hover:bg-amber-700">
                            <Link href="/admin/products">
                                <Settings className="h-4 w-4 mr-2" />
                                Gestión Avanzada
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                                <div className="relative">
                                    <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            {product.featured && <Badge className="bg-amber-600">Destacado</Badge>}
                                            <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>Stock: {product.stock}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-amber-600">${product.price}</span>
                                                <Badge variant="outline">{product.category === "coffee" ? "Bebida" : "Dulce"}</Badge>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => toggleFeatured(product.id)}
                                                className="flex-1"
                                            >
                                                {product.featured ? "Quitar Destacado" : "Destacar"}
                                            </Button>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/admin/products?edit=${product.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                {searchTerm ? "No se encontraron productos" : "No hay productos"}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm
                                    ? "Intenta con otros términos de búsqueda"
                                    : "Comienza agregando tu primer producto al catálogo"}
                            </p>
                            <Button asChild className="bg-green-600 hover:bg-green-700">
                                <Link href="/admin/products">
                                    <Plus className="h-4 w-4 mr-2" />
                                    {searchTerm ? "Ver Todos los Productos" : "Agregar Primer Producto"}
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )

}