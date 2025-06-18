import { UserProps } from "../(landing)/page";
import AdminHome from "@/components/admin/adminHome";
import Header from "@/components/header";
import { getCurrentUser } from "@/lib/session";
import { ProductProps } from "../products/page";
import { db } from "@/lib/db";




export default async function AdminDashboard() {
 const user: UserProps | null = await getCurrentUser();
 const isAdmin = user?.rol === "ADMIN"
 const isLogged = user !== null

const products: ProductProps[] = await db.product.findMany()
  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
        <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
        <AdminHome  products={products} />
    </div>
    )
}


 