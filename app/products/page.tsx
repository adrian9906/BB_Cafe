import ProductsPage from "@/components/products/products";
import { ProductGridSkeleton } from "@/components/products/productSkeleton";
import { db } from "@/lib/db"
import { Suspense } from "react";

export interface ProductProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    featured: boolean;
    flavors : string
}

export default async function HomePage() {
    const products: ProductProps[] = await db.product.findMany()
    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<ProductGridSkeleton count={products.length} />}>
                <ProductsPage products = {products || []}/>
            </Suspense>
        </div>
    )
}