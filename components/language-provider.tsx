"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.drinks": "Bebidas",
    "nav.sweets": "Dulces",
    "nav.custom-orders": "Encargos",
    "nav.about": "Nosotros",

    // Home Page
    "hero.title": "Las Mejores Bebidas de Café y Dulces Gourmets",
    "hero.subtitle": "a tu Puerta",
    "hero.description":
      "Descubre nuestras deliciosas bebidas de café preparadas al momento y dulces gourmets. Delivery rápido y seguro en toda la ciudad.",
    "hero.view-products": "Ver Productos",
    "hero.free-delivery": "Delivery Gratis",

    // Features
    "features.artisan-drinks": "Bebidas",
    "features.artisan-description": "Capuchinos, lattes y más, preparados al momento con los mejores ingredientes",
    "features.fast-delivery": "Delivery Rápido",
    "features.delivery-description": "Entrega en 30-45 minutos, gratis en compras mayores a $25",
    "features.quality": "Calidad Garantizada",
    "features.quality-description": "Productos frescos y de la más alta calidad, satisfacción garantizada",

    // Products
    "products.featured": "Productos Destacados",
    "products.featured-description":
      "Descubre nuestros productos más populares, cuidadosamente seleccionados para ofrecerte la mejor experiencia",
    "products.add-to-cart": "Agregar al Carrito",
    "products.view-all": "Ver Todos los Productos",

    // Custom Orders
    "custom-orders.title": "Encargos Personalizados",
    "custom-orders.description":
      "¿Tienes una ocasión especial? Creamos galletas decoradas, cupcakes y pasteles únicos para tus celebraciones.",
    "custom-orders.decorated-cookies": "Galletas decoradas para cualquier tema",
    "custom-orders.custom-cupcakes": "Cupcakes personalizados",
    "custom-orders.special-cakes": "Tortas para eventos especiales",
    "custom-orders.make-order": "Hacer un Encargo",

    // Delivery
    "delivery.title": "Delivery Rápido y Seguro",
    "delivery.step1": "Realiza tu Pedido",
    "delivery.step1-desc": "Selecciona tus productos favoritos y procede al checkout",
    "delivery.step2": "Preparamos tu Orden",
    "delivery.step2-desc": "Nuestro equipo prepara cuidadosamente cada producto",
    "delivery.step3": "Entrega a Domicilio",
    "delivery.step3-desc": "Recibe tu pedido en 30-45 minutos, fresco y delicioso",
    "delivery.free-info": "Delivery gratuito en pedidos mayores a $25. Costo de envío: $3.99 para pedidos menores.",

    // Footer
    "footer.description": "Tu destino para las mejores bebidas de café y dulces gourmets con delivery rápido.",
    "footer.products": "Productos",
    "footer.coffee-drinks": "Bebidas de Café",
    "footer.sweets": "Dulces",
    "footer.all-products": "Todos los Productos",
    "footer.service": "Servicio",
    "footer.delivery": "Delivery",
    "footer.contact": "Contacto",
    "footer.about": "Sobre Nosotros",
    "footer.rights": "Todos los derechos reservados.",

    // Cart
    "cart.title": "Carrito de Compras",
    "cart.empty": "Tu carrito está vacío",
    "cart.empty-description": "¡Agrega algunos productos deliciosos para comenzar!",
    "cart.subtotal": "Subtotal:",
    "cart.delivery": "Delivery:",
    "cart.free": "¡GRATIS!",
    "cart.total": "Total:",
    "cart.checkout": "Proceder al Checkout",
    "cart.continue-shopping": "Continuar Comprando",

    // Products Page
    "products.title": "Nuestros Productos",
    "products.description": "Descubre nuestra selección de bebidas de café preparadas al momento y dulces gourmet",
    "products.search": "Buscar productos...",
    "products.category": "Categoría",
    "products.all-categories": "Todas las categorías",
    "products.coffee-drinks": "Bebidas de Café",
    "products.sort": "Ordenar por",
    "products.name-az": "Nombre A-Z",
    "products.price-low": "Precio: Menor a Mayor",
    "products.price-high": "Precio: Mayor a Menor",
    "products.rating": "Mejor Calificación",

    "products.found": "productos encontrados",
    "products.no-results": "No se encontraron productos que coincidan con tu búsqueda.",
    "products.clear-filters": "Limpiar Filtros",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.drinks": "Drinks",
    "nav.sweets": "Sweets",
    "nav.custom-orders": "Custom Orders",
    "nav.about": "About Us",

    // Home Page
    "hero.title": "The Best Coffee Drinks and Sweets",
    "hero.subtitle": "to your Door",
    "hero.description":
      "Discover our artisan coffee drinks prepared fresh and gourmet desserts. Fast and secure delivery throughout the city.",
    "hero.view-products": "View Products",
    "hero.free-delivery": "Free Delivery",

    // Features
    "features.artisan-drinks": "Drinks",
    "features.artisan-description": "Cappuccinos, lattes and more, prepared fresh with the finest ingredients",
    "features.fast-delivery": "Fast Delivery",
    "features.delivery-description": "Delivery in 30-45 minutes, free on orders over $25",
    "features.quality": "Quality Guaranteed",
    "features.quality-description": "Fresh products of the highest quality, satisfaction guaranteed",

    // Products
    "products.featured": "Featured Products",
    "products.featured-description":
      "Discover our most popular products, carefully selected to offer you the best experience",
    "products.add-to-cart": "Add to Cart",
    "products.view-all": "View All Products",

    // Custom Orders
    "custom-orders.title": "Custom Orders",
    "custom-orders.description":
      "Have a special occasion? We create decorated cookies, cupcakes and unique cakes for your celebrations.",
    "custom-orders.decorated-cookies": "Decorated cookies for any theme",
    "custom-orders.custom-cupcakes": "Custom cupcakes",
    "custom-orders.special-cakes": "Cakes for special events",
    "custom-orders.make-order": "Make an Order",

    // Delivery
    "delivery.title": "Fast and Secure Delivery",
    "delivery.step1": "Place your Order",
    "delivery.step1-desc": "Select your favorite products and proceed to checkout",
    "delivery.step2": "We Prepare your Order",
    "delivery.step2-desc": "Our team carefully prepares each product",
    "delivery.step3": "Home Delivery",
    "delivery.step3-desc": "Receive your order in 30-45 minutes, fresh and delicious",
    "delivery.free-info": "Free delivery on orders over $25. Shipping cost: $3.99 for smaller orders.",

    // Footer
    "footer.description": "Your destination for the best coffee drinks and artisan sweets with fast delivery.",
    "footer.products": "Products",
    "footer.coffee-drinks": "Coffee Drinks",
    "footer.sweets": "Sweets",
    "footer.all-products": "All Products",
    "footer.service": "Service",
    "footer.delivery": "Delivery",
    "footer.contact": "Contact",
    "footer.about": "About Us",
    "footer.rights": "All rights reserved.",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty-description": "Add some delicious products to get started!",
    "cart.subtotal": "Subtotal:",
    "cart.delivery": "Delivery:",
    "cart.free": "FREE!",
    "cart.total": "Total:",
    "cart.checkout": "Proceed to Checkout",
    "cart.continue-shopping": "Continue Shopping",

    // Products Page
    "products.title": "Our Products",
    "products.description": "Discover our selection of freshly prepared coffee drinks and artisan sweets",
    "products.search": "Search products...",
    "products.category": "Category",
    "products.all-categories": "All categories",
    "products.coffee-drinks": "Coffee Drinks",
    "products.sort": "Sort by",
    "products.name-az": "Name A-Z",
    "products.price-low": "Price: Low to High",
    "products.price-high": "Price: High to Low",
    "products.rating": "Best Rating",
    "products.found": "products found",
    "products.no-results": "No products found matching your search.",
    "products.clear-filters": "Clear Filters",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("bb-cafe-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("bb-cafe-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
