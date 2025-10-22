"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Cookie, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useState, useEffect } from "react"
import { StarRating } from "./startRating"
import { ProductProps } from "@/app/products/page"
import { AddToCartModal } from "./addTocart"
import { editRating } from "@/lib/actions"

interface ProductCardProps {
  product: ProductProps
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useLanguage()
  const [userRating, setUserRating] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasCustomization = product.category === "drinks" || product.category === "sweets"

  useEffect(() => {
    // Cargar calificación del usuario desde localStorage
    const savedRatings = JSON.parse(localStorage.getItem("bb-cafe-ratings") || "{}")
    if (savedRatings[product.id]) {
      setUserRating(savedRatings[product.id])
    }
  }, [product.id])

  const handleAddToCart = () => {
    setIsModalOpen(true)
  }
  const handleRatingChange = async (product: string, rating: number) => {
    try {
      await editRating(product, rating)
      setUserRating(rating)

    }
    catch (error) {
      console.log(error)

    }
  }

  return (
    <div>
      <Card
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
            {product.featured && <Badge className="absolute top-2 left-2 bg-amber-600">{t("products.featured")}</Badge>}

            {/* Indicador de personalización */}
            {hasCustomization && product.flavors !== 'none' && (
              <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs flex items-center gap-1">
                {product.category === "drinks" ? (
                  <>
                    <Coffee className="h-3 w-3" />
                    Sabores
                  </>
                ) : (
                  <>
                    <Cookie className="h-3 w-3" />
                    Sabores
                  </>
                )}
              </Badge>
            )}

            <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {product.rating}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            {/* Indicador de opciones disponibles */}
            {hasCustomization && product.flavors !== 'none' && (
              <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                {product.category === "coffee" ? (
                  <>
                    <Coffee className="h-3 w-3" />
                    <span>Disponible en múltiples sabores de bebida</span>
                  </>
                ) : (
                  <>
                    <Cookie className="h-3 w-3" />
                    <span>Disponible en múltiples sabores</span>
                  </>
                )}
              </div>
            )}
            {/* Star Rating Component */}
            <div className="py-2">
              <StarRating
                productId={product.id}
                initialRating={userRating}
                onRatingChange={(value) => handleRatingChange(product.name, value)}
                size="sm"
                showText={true}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-amber-800 dark:text-amber-400">${product.price}</span>
              <Badge variant="outline" className="text-xs">
                {product.category === "coffee" ? t("nav.drinks") : t("nav.sweets")}
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300"
                onClick={handleAddToCart}
              >
                {t("products.add-to-cart")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <AddToCartModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
