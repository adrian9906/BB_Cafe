import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { OrdersCustom } from "@/types"
import { format } from "date-fns"
import { Calendar, MapPin, Package, Palette, User } from "lucide-react"
import { getThemeLabel } from "./table/columns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


const getStatusColor = (state: OrdersCustom["state"]) => {
  switch (state) {
    case "pending":
      return "border-gray-200 bg-gradient-to-r from-yellow-400 to-pink-500 dark:border-gray-800"
    case "confirmed":
      return "border-gray-200 bg-gradient-to-r from-blue-300 to-amber-200 dark:border-gray-800"
    case "completed":
      return "border-gray-200 bg-gradient-to-r from-green-400 to-blue-500 dark:border-gray-800"
    case "delivered":
      return "border-gray-200 bg-gradient-to-r from-fuchsia-600 to-cyan-500 dark:border-gray-800"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

const getStatusLabel = (state: OrdersCustom["state"]) => {
  console.log(state)
  switch (state) {
    case "pending":
      return "Pendiente"
    case "confirmed":
      return "Confirmado"
    case "completed":
      return "Completado"
    case "delivered":
      return "Entregado"
    case "cancelled":
      return "Cancelado"
    default:
      return state
  }
}





export default function OrdersDetails({ order, isDetailOpen, setIsDetailOpen }: { order: OrdersCustom, isDetailOpen: boolean, setIsDetailOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[920px] h-[700px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600" />
              Detalles del Encargo #{order?.name}
            </DialogTitle>
            <DialogDescription>Información completa del encargo personalizado</DialogDescription>
          </DialogHeader>

          {order && (
            <div className="space-y-6">
              {/* Información del Cliente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Información del Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nombre</Label>
                    <p className="font-medium">{order.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{order.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
                    <p>{order.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                    <Badge className={getStatusColor(order.state)}>
                      {getStatusLabel(order.state)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Detalles del Producto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5" />
                    Detalles del Producto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tipo de Producto</Label>
                      <p className="font-medium">{order.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Cantidad</Label>
                      <p>{order.quantity}</p>
                    </div>
                    {/* <div>
                        <Label className="text-sm font-medium text-muted-foreground">Ocasión</Label>
                        <p>{.occasion || "No especificada"}</p>
                      </div> */}
                  </div>

                  {order.themeType && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Temática</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={"outline"} >
                          <Palette className="h-3 w-3 mr-1" />
                          {getThemeLabel(order.themeType || 'custom')}
                        </Badge>
                      </div>
                      {order.theme && (
                        <p className="text-sm text-muted-foreground mt-2 bg-muted p-2 rounded">
                          <strong>Descripción personalizada:</strong> {order.theme}
                        </p>
                      )}
                    </div>
                  )}

                  {order.flavors! == 'none' && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Sabores</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {order.flavors.split(',').map((flavor, index) => (
                          <Badge variant={'outline'} key={index}>
                            {flavor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {order.request && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Solicitudes Especiales</Label>
                      <p className="text-sm bg-muted p-3 rounded-lg mt-1">{order.request}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Imágenes de Referencia */}
              {/* {selectedOrder.images.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Camera className="h-5 w-5" />
                        Imágenes de Referencia ({selectedOrder.images.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedOrder.images.map((image, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Referencia ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )} */}

              {/* Información de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    Información de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Fecha de Entrega</Label>
                    <p className="font-medium">
                      {order.deliveryDate
                        ? format(new Date(order.deliveryDate), "PPP", { locale: es })
                        : "No especificada"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Fecha de Pedido</Label>
                    <p>{format(new Date(order.createdAt), "PPP", { locale: es })}</p>
                  </div>
                  {order.address && (
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Dirección de Entrega
                      </Label>
                      <p>{order.address}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}