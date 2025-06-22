import { UserProps } from "@/app/(landing)/page";
import { OrdersList } from "@/components/admin/orders/orders-list";
import Header from "@/components/header";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";


export default async function OrdersAdminPage() {
    const user: UserProps | null = await getCurrentUser();
    const isAdmin = user?.rol === "ADMIN"
    const isLogged = user !== null
    const orders = await db.customOrder.findMany()
    
    return (
        <div className="min-h-screen bg-background">
          <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
          <OrdersList orders={orders}/>
        </div>
    )
}