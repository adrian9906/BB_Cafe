"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Menu, X, BarChart3, Package, Users, ClipboardList } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useCart } from "./cart/cart-provider"
import { UserProps } from "@/app/(landing)/page"
import { UserAccountNav } from "./userNavComponent"

export default function Header({ isAdmin, isLogged, user }: { isAdmin: boolean, isLogged: boolean, user: UserProps | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { t } = useLanguage()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  if (isAdmin) {
    return (
      <header className="bg-background shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Admin */}
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/bb-cafe-logo.jpg"
                  alt="BB Café Logo"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-lg">BB Café</span>
                <span className="block text-xs text-amber-400">Panel Admin</span>
              </div>
            </Link>

            {/* Admin Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2 text-foreground hover:text-amber-600 transition-colors">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-2 text-foreground hover:text-amber-600 transition-colors"
              >
                <Package className="h-4 w-4" />
                Productos
              </Link>
              <Link
                href="/admin/employees"
                className="flex items-center gap-2 text-foreground hover:text-amber-600 transition-colors"
              >
                <Users className="h-4 w-4" />
                Empleados
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-2 text-foreground hover:text-amber-600 transition-colors"
              >
                <ClipboardList className="h-4 w-4" />
                Encargos
              </Link>
              <Link
                href="/admin/reports"
                className="flex items-center gap-2 text-foreground hover:text-amber-600 transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                Reportes
              </Link>
            </nav>

            {/* Admin Controls */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
              <UserAccountNav user={user} />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Admin Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  Productos
                </Link>
                <Link
                  href="/admin/employees"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-4 w-4" />
                  Empleados
                </Link>
                <Link
                  href="/admin/reports"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Reportes
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    )
  }
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
            <Link href="/order" className="text-foreground hover:text-amber-600 transition-colors">
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

            {isLogged && (
              <UserAccountNav user={user} />
            )}

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
              <Link href="/products" className="text-foreground hover:text-amber-600 transition-colors">
                {t("nav.products")}
              </Link>
              <Link
                href="/order"
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
