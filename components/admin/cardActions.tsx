import { BarChart3, Plus, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";


export default function CardActions() {

    return (
        <>
            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-dashed border-green-200 hover:border-green-400">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-700">Agregar Producto</CardTitle>
              <CardDescription>Añade nuevos productos al catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/admin/products">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Producto
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-700">Gestionar Empleados</CardTitle>
              <CardDescription>Administra el equipo de trabajo</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/employees">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Empleados
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-700">Reportes</CardTitle>
              <CardDescription>Análisis de ventas y estadísticas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/reports">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver Reportes
                </Link>
              </Button>
            </CardContent>
          </Card>
        </>
    )
}