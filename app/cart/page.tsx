import CartComponent from "@/components/cart/cartpage";
import { UserProps } from "../(landing)/page";
import { getCurrentUser } from "@/lib/session";
import Header from "@/components/header";


export default async function CartPage() {

    const user: UserProps | null = await getCurrentUser();
    const isAdmin = user?.rol === "ADMIN"
    const isLogged = user !== null
    return (
        <div className="min-h-screen bg-background">
            <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
            <CartComponent isLoggedIn={isLogged}/>
        </div>
    )
}