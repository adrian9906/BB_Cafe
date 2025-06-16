"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Header from "@/components/header"
import { useLanguage } from "@/components/language-provider"
import { useCart } from "./cart-provider"
export default function CartComponent() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const { t } = useLanguage()
  const discount = 0.1

  const subtotal = total
  const discountAmount = subtotal * discount
  const deliveryFee = total >= 20000 ? 0 : 100
  const finalTotal = subtotal - discountAmount + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">{t("cart.empty")}</h1>
            <p className="text-muted-foreground mb-8">{t("cart.empty-description")}</p>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/products">{t("hero.view-products")}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-amber-800 dark:text-amber-400 font-bold">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />

                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t("cart.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* agregar isLoggedIn && */}
                { discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento de usuario (10%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t("cart.delivery")}</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0 ? t("cart.free") : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                {total < 20000 && (
                  <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950 p-2 rounded">
                    Agrega ${(20000 - total).toFixed(2)} más para delivery gratuito
                  </p>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("cart.total")}</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                  <Link href="/checkout">{t("cart.checkout")}</Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/products">{t("cart.continue-shopping")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
