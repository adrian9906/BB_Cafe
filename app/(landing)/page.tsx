import Header from "@/components/header"
import HomeContent from "@/components/home-content"
import { db } from "@/lib/db"
import { ProductProps } from "../products/page"
import { getCurrentUser } from "@/lib/session"
import { $Enums } from "@prisma/client"
export interface UserProps {
   name: string | null;
    id: string;
    image: string | null;
    username: string | null;
    email: string;
    rol: $Enums.UserRole;
}
export default async function HomePage() {
  const featuredProducts: ProductProps[] = await db.product.findMany(
    {
      where:{
        featured: true
      }

    }
  )
  const user = await getCurrentUser()
  const isAdmin = user?.rol === "ADMIN"
  const isLogged = user !== null
  
  return (
    <div className="min-h-screen bg-background">
      <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user} />
      <HomeContent featuredProducts={featuredProducts} />
    </div>
  )
}
