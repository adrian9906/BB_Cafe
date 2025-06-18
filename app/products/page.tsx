import ProductsPage from "@/components/products/products";
import { ProductGridSkeleton } from "@/components/products/productSkeleton";
import { db } from "@/lib/db"
import { Suspense } from "react";
import { UserProps } from "../(landing)/page";
import { getCurrentUser } from "@/lib/session";

export interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    featured: boolean;
    flavors : string,
    stock: number
}

export default async function HomePage() {
    const products: ProductProps[] = await db.product.findMany()
     const user: UserProps | null = await getCurrentUser();
     const isAdmin = user?.rol === "ADMIN"
     const isLogged = user !== null
    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<ProductGridSkeleton count={products.length} />}>
                <ProductsPage products = {products || []} isAdmin={isAdmin} isLogged={isLogged} user={user || null} />
            </Suspense>
        </div>
    )
}