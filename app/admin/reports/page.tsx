import { UserProps } from "@/app/(landing)/page";
import AdminReportsMain from "@/components/admin/reports/report-main";
import Header from "@/components/header";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";


export default async function ReportPage() {
     const user: UserProps | null = await getCurrentUser();
     const isAdmin = user?.rol === "ADMIN"
     const isLogged = user !== null
     const usersActive: number = (await db.user.findMany()).length
    
    return(
    <div className="min-h-screen bg-background">
      <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
      <AdminReportsMain isAdmin={isAdmin} usersActive={usersActive}/>
     
    </div>
    )
    
}