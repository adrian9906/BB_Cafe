"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useCart } from "./cart/cart-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { t } = useLanguage()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/bb-cafe-logo.jpg"
                alt="BB Café Logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-foreground font-bold text-xl hidden sm:block">
              BB <span className="text-amber-600">Café</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-amber-600 transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/products" className="text-foreground hover:text-amber-600 transition-colors">
              {t("nav.products")}
            </Link>
            <Link href="/custom-orders" className="text-foreground hover:text-amber-600 transition-colors">
              {t("nav.custom-orders")}
            </Link>
            <Link href="/about" className="text-foreground hover:text-amber-600 transition-colors">
              {t("nav.about")}
            </Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />

            <Button asChild variant="outline" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs">{itemCount}</Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.products")}
              </Link>
              <Link
                href="/products?category=coffee"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.drinks")}
              </Link>
              <Link
                href="/products?category=sweets"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.sweets")}
              </Link>
              <Link
                href="/custom-orders"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.custom-orders")}
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
