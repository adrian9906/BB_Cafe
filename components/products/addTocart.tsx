"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "../cart/cart-provider"
import { ProductProps } from "@/app/products/page"


interface AddToCartModalProps {
  product: ProductProps | null
  isOpen: boolean
  onClose: () => void
}

// Sabores disponibles por categoría

export function AddToCartModal({ product, isOpen, onClose }: AddToCartModalProps) {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState("")

  if (!product) return null

  const hasFlavorOptions = product.category === "sweets"
  const availableFlavors = product.flavors.split(',').filter(item=>item !== 'none')

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity))
  }

  const handleAddToCart = () => {
    // Crear el nombre del producto con las opciones seleccionadas
    let productName = product.name
    if (selectedFlavor) {
      productName += ` (${selectedFlavor})`
    }

    // Añadir al carrito con la cantidad especificada
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id, // ID único para cada variación
        name: productName,
        price: product.price,
        image: product.image,
      })
    }

    // Resetear el modal
    setQuantity(1)
    setSelectedFlavor("")
    onClose()
  }

  const totalPrice = product.price * quantity

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-amber-600" />
            Añadir al Carrito
          </DialogTitle>
          <DialogDescription>Personaliza tu pedido antes de añadirlo al carrito</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Producto */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-bold text-amber-800 dark:text-amber-400">${product.price}</span>
                <Badge variant="outline" className="text-xs">
                  {product.category === "coffee" ? t("nav.drinks") : t("nav.sweets")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Cantidad */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                className="w-20 text-center"
                min="1"
              />
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sabores (solo para dulces) */}
          {hasFlavorOptions && availableFlavors.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="flavor">Sabor</Label>
              <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un sabor (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {availableFlavors.map((flavor) => (
                    <SelectItem key={flavor} value={flavor}>
                      {flavor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Puedes elegir un sabor específico o dejarlo en blanco para el sabor original
              </p>
            </div>
          )}

          {/* Resumen */}
          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl font-bold text-amber-800 dark:text-amber-400">${totalPrice.toFixed(2)}</span>
            </div>
            {quantity > 1 && (
              <p className="text-sm text-muted-foreground mt-1">
                {quantity} × ${product.price.toFixed(2)} cada uno
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-amber-600 hover:bg-amber-700 flex-1"
            disabled={hasFlavorOptions && availableFlavors.length > 0 && !selectedFlavor && quantity > 1}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir al Carrito
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
