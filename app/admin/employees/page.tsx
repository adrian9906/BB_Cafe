import { UserProps } from "@/app/(landing)/page";
import AdminEmployeesHome from "@/components/admin/employees/adminEmployyesHome";
import Header from "@/components/header";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export interface EmployeeProps {
    id:string;
    name:string
    position:string
    description:string
    image:string
    email:string
    phone:string
}


export default async function EmployeesPage() {
  const user: UserProps | null = await getCurrentUser();
  const isAdmin = user?.rol === "ADMIN"
  const isLogged = user !== null
  const employees: EmployeeProps[] = await db.workers.findMany()
  
  return (
    <div className="min-h-screen bg-background">
      <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>
      <AdminEmployeesHome employees={employees} isAdmin={isAdmin}/>
    </div>
  )
}