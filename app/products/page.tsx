import ProductsPage from "@/components/products/products";
import { db } from "@/lib/db"

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
            <ProductsPage products = {products || []}/>
        </div>
    )
}