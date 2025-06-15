import Header from "@/components/header"
import HomeContent from "@/components/home-content"
import { db } from "@/lib/db"
import { ProductProps } from "../products/page"

export default async function HomePage() {
  const featuredProducts: ProductProps[] = await db.product.findMany(
    {
      where:{
        featured: true
      }

    }
  )
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeContent featuredProducts={featuredProducts} />
    </div>
  )
}
