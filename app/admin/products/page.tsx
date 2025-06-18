import { UserProps } from "@/app/(landing)/page";
import { ProductProps } from "@/app/products/page";
import AdminProductsPage from "@/components/admin/product/productsPage";
import Header from "@/components/header";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export default async function ProductAdminPage() {
    const user: UserProps | null = await getCurrentUser();
    const isAdmin = user?.rol === "ADMIN"
    const isLogged = user !== null
    const products: ProductProps[] = await db.product.findMany()
    
    return (
        <div>
            <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
            <AdminProductsPage isAdmin = {isAdmin} products={products}/>
        </div>
    )
    
}