"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useSearchParams } from "next/navigation"
import Header from "../header"
import { ProductCard } from "./productsCard"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")
  const { t } = useLanguage()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all")
  const [sortBy, setSortBy] = useState("name")

  const products = [
    {
      id: 1,
      name: "Cappuccino Clásico",
      description: "Espresso con leche vaporizada y espuma cremosa",
      price: 4.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "coffee",
      featured: true,
    },
    {
      id: 2,
      name: "Latte Vainilla",
      description: "Espresso con leche vaporizada y jarabe de vainilla",
      price: 5.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      category: "coffee",
      featured: true,
    },
    {
      id: 3,
      name: "Americano",
      description: "Espresso diluido con agua caliente",
      price: 3.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      category: "coffee",
      featured: false,
    },
    {
      id: 4,
      name: "Mocha",
      description: "Espresso con chocolate caliente y leche vaporizada",
      price: 5.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      category: "coffee",
      featured: true,
    },
    {
      id: 5,
      name: "Caramel Macchiato",
      description: "Espresso con leche vaporizada y jarabe de caramelo",
      price: 6.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "coffee",
      featured: true,
    },
    {
      id: 6,
      name: "Frappé de Café",
      description: "Bebida fría de café con hielo y crema batida",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      category: "coffee",
      featured: false,
    },
    {
      id: 7,
      name: "Espresso Doble",
      description: "Doble shot de espresso puro",
      price: 3.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      category: "coffee",
      featured: false,
    },
    {
      id: 8,
      name: "Chai Latte",
      description: "Té chai especiado con leche vaporizada",
      price: 5.29,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      category: "coffee",
      featured: false,
    },
    {
      id: 9,
      name: "Brownies de Chocolate",
      description: "Brownies caseros con chocolate belga",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      category: "sweets",
      featured: true,
    },
    {
      id: 10,
      name: "Cookies de Vainilla",
      description: "Galletas artesanales con extracto de vainilla",
      price: 8.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      category: "sweets",
      featured: false,
    },
    {
      id: 11,
      name: "Cheesecake de Fresa",
      description: "Cheesecake cremoso con fresas frescas",
      price: 18.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      category: "sweets",
      featured: true,
    },
    {
      id: 12,
      name: "Muffins de Arándanos",
      description: "Muffins esponjosos con arándanos naturales",
      price: 6.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      category: "sweets",
      featured: false,
    },
    {
      id: 13,
      name: "Tiramisu Clásico",
      description: "El postre italiano más famoso",
      price: 16.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      category: "sweets",
      featured: true,
    },
    {
      id: 14,
      name: "Croissant de Almendra",
      description: "Croissant francés relleno de crema de almendra",
      price: 4.49,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      category: "sweets",
      featured: false,
    },
  ]

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "featured":
            return b.featured ? 1 : -1
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [searchTerm, selectedCategory, sortBy])

  return (
      <div className="max-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("products.title")}</h1>
          <p className="text-muted-foreground">{t("products.description")}</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
            <Input
              placeholder={t("products.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-5 text-md h-11"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="py-5 px-4 text-md h-11 min-w-[220px]"> {/* Aumentado */}
                <SelectValue placeholder={t("products.category")} />
                </SelectTrigger>
                <SelectContent className="text-md"> {/* Aumentado */}
                <SelectItem value="all" className="text-md py-3"> {/* Aumentado */}
                    {t("products.all-categories")}
                </SelectItem>
                <SelectItem value="coffee" className="text-md py-3">
                    {t("products.coffee-drinks")}
                </SelectItem>
                <SelectItem value="sweets" className="text-md py-3">
                    {t("nav.sweets")}
                </SelectItem>
                </SelectContent>
            </Select>

            {/* Selector de orden - Aumentado */}
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="py-5 px-4 text-md h-11 min-w-[220px]"> {/* Aumentado */}
                <SelectValue placeholder={t("products.sort")} />
                </SelectTrigger>
                <SelectContent className="text-md"> {/* Aumentado */}
                <SelectItem value="name" className="text-md py-3">
                    {t("products.name-az")}
                </SelectItem>
                <SelectItem value="price-low" className="text-md py-3">
                    {t("products.price-low")}
                </SelectItem>
                <SelectItem value="price-high" className="text-md py-3">
                    {t("products.price-high")}
                </SelectItem>
                <SelectItem value="rating" className="text-md py-3">
                    {t("products.rating")}
                </SelectItem>
                <SelectItem value="featured" className="text-md py-3">
                    {t("products.featured")}
                </SelectItem>
                </SelectContent>
            </Select>



          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            {filteredProducts.length} {t("products.found")}
          </div>
        </div>

        {/* Products Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t("products.no-results")}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              {t("products.clear-filters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
