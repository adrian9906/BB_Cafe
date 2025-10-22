"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, File } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../header"
import { ProductCard } from "./productsCard"
import Footer from "../footer"
import { ProductProps } from "@/app/products/page"
import { createUrl } from "@/lib/utils"
import { UserProps } from "@/app/(landing)/page"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "../ui/empty"

export default function ProductsPage({ products, isAdmin, isLogged, user }: { products: ProductProps[], isAdmin: boolean, isLogged: boolean, user: UserProps | null }) {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")
  const { t } = useLanguage()
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all")
  const [sortBy, setSortBy] = useState("name")


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
  }, [searchTerm, selectedCategory, sortBy, products])
  function handleFilter(name: string, value: Date | string | null) {
    const newParams = new URLSearchParams(searchParams.toString())
    if (typeof value === 'string') {
      if (name === 'category') {
        setSelectedCategory(value)
      }
      if (name === 'sort') {
        setSortBy(value)
      }
      newParams.set(name, value)
    }
    router.push(createUrl('/products', newParams))
  }
  return (
    <div className="max-h-screen bg-background">
      <Header isAdmin={isAdmin} isLogged={isLogged} user={user || null} />

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

          <Select value={selectedCategory} onValueChange={(value) => handleFilter('category', value)}>
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
              <SelectItem value="drinks" className="text-md py-3">
                {t("nav.drinks")}
              </SelectItem>

            </SelectContent>
          </Select>

          {/* Selector de orden - Aumentado */}
          <Select value={sortBy} onValueChange={(value) => handleFilter('sort', value)}>
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
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <File />
                </EmptyMedia>
                <EmptyTitle>No productos aún</EmptyTitle>
                <EmptyDescription>
                  Aún no se ha creado ningún producto. Por favor espere a que se creen los productos.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
