import Header from "@/components/header";
import { UserProps } from "../(landing)/page";
import { getCurrentUser } from "@/lib/session";
import CustomOrdersMain from "@/components/orders/ordersMain";


export default async function OrderPage() {
    const user: UserProps | null = await getCurrentUser();
    const isAdmin = user?.rol === "ADMIN"
    const isLogged = user !== null
    
    return (
        <div className="min-h-screen bg-background">
            <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
            <CustomOrdersMain/>
        </div>
    )
}