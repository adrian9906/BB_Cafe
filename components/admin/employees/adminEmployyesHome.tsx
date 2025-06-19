"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Trash2, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AddEmployesForm } from "./addEmployees"
import { EmployeeProps } from "@/app/admin/employees/page"
import { toast } from "sonner"
import { DeleteWorker } from "@/lib/actions"
import { EditEmployesForm } from "./editemployees"

export interface Employee {
  id: string
  name: string
  position: string
  description: string
  image: string
  email: string
  phone: string
}

export default function AdminEmployeesHome({isAdmin, employees}:{isAdmin: boolean,employees:EmployeeProps[]}) {
  const router = useRouter()
  
  
  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
      return
     }
  }, [isAdmin, router])

  
  
  const handleDelete = async (employeeId: string) => {
    const result = await DeleteWorker(employeeId)
   if (result=== null){
    return toast('Algo ha salido mal.',{
            description: 'Tu solicitud de acceso ha fallado. Intentalo más tarde.'})
   }
   router.refresh()
  }
    

   if (!isAdmin) {
     return null
   }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Gestión de Empleados</h1>
              <p className="text-muted-foreground">Administra la información del equipo de BB Café</p>
            </div>
          </div>
          <AddEmployesForm message="Nuevo Empleado"/>
        </div>

        {/* Success Message
        {message && (
          <Alert className="mb-6">
            <Users className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )} */}

        {/* Employees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Foto próximamente</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{employee.name}</h3>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {employee.position}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">{employee.description}</p>

                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">📧 {employee.email}</p>
                    {employee.phone && <p className="text-muted-foreground">📞 {employee.phone}</p>}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <EditEmployesForm worker={employee} />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {employees.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay empleados registrados</h3>
            <p className="text-muted-foreground mb-4">Comienza agregando el primer miembro del equipo.</p>
              <AddEmployesForm message={"Agregar Primer Empleado"}/>
          </div>
        )}
      </div>

    </div>
  )
}
