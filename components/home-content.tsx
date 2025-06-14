"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Truck, Star, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Footer from "./footer"

export function HomeContent() {
  const { t } = useLanguage()
  
  const featuredProducts = [
    {
      id: 1,
      name: "Cappuccino Clásico",
      price: 4.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "coffee",
    },
    {
      id: 2,
      name: "Brownies de Chocolate",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      category: "sweets",
    },
    {
      id: 3,
      name: "Latte Vainilla",
      price: 5.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      category: "coffee",
    },
    {
      id: 4,
      name: "Cookies de Vainilla",
      price: 8.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      category: "sweets",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-amber-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                {t("hero.title")}
                <span className="text-amber-400"> {t("hero.subtitle")}</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">{t("hero.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/products">
                    {t("hero.view-products")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="border-inherit  hover:bg-white hover:text-black"
                >
                  <Link href="#delivery">{t("hero.free-delivery")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-80 h-80">
                <Image
                  src="/images/bb-cafe-logo.jpg"
                  alt="BB Café Logo"
                  width={320}
                  height={320}
                  className="rounded-full shadow-2xl object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-amber-800 dark:text-amber-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.artisan-drinks")}</h3>
              <p className="text-muted-foreground">{t("features.artisan-description")}</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-800 dark:text-amber-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.fast-delivery")}</h3>
              <p className="text-muted-foreground">{t("features.delivery-description")}</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 dark:bg-amber-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-800 dark:text-amber-200" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("features.quality")}</h3>
              <p className="text-muted-foreground">{t("features.quality-description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("products.featured")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("products.featured-description")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 bg-background rounded-full px-2 py-1 text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-3">${product.price}</p>
                  <Button className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    {t("products.add-to-cart")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">{t("products.view-all")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("custom-orders.title")}</h2>
              <p className="text-lg text-muted-foreground mb-6">{t("custom-orders.description")}</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    🍪
                  </div>
                  <span>{t("custom-orders.decorated-cookies")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    🎂
                  </div>
                  <span>{t("custom-orders.special-cakes")}</span>
                </div>
              </div>
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link href="/custom-orders">
                  {t("custom-orders.make-order")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square bg-background rounded-lg shadow-lg flex items-center justify-center text-6xl">
                  🍪
                </div>
                <div className="aspect-square bg-background rounded-lg shadow-lg flex items-center justify-center text-6xl">
                  🎂
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square bg-background rounded-lg shadow-lg flex items-center justify-center text-6xl">
                  🍫
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section id="delivery" className="py-16 bg-amber-50 dark:bg-amber-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("delivery.title")}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("delivery.step1")}</h4>
                    <p className="text-muted-foreground">{t("delivery.step1-desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("delivery.step2")}</h4>
                    <p className="text-muted-foreground">{t("delivery.step2-desc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">{t("delivery.step3")}</h4>
                    <p className="text-muted-foreground">{t("delivery.step3-desc")}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-background rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-muted-foreground">
                  <strong>{t("delivery.free-info")}</strong>
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Delivery"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </>
  )
}

export default HomeContent
