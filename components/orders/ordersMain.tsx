"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Gift, Users, CheckCircle2Icon, AlertCircleIcon, Package, Camera, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { OrderSchema } from "@/lib/validations/orderSchema"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { CreateOrders } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ImageUpload } from "../image-upload"
import { Spinner } from "../ui/spinner"
import { CustomOrder } from "@prisma/client"
import { OrdersList } from "./orders-list"

interface CreateProductsFormProps extends React.HTMLAttributes<HTMLDivElement> {
  orders: CustomOrder[]
}

type CustomOrderFormValues = z.infer<typeof OrderSchema>

export default function CustomOrdersMain({ className, orders, ...props }: CreateProductsFormProps) {
  const form = useForm<CustomOrderFormValues>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      flavors: [],
      decorations: [],
      adress: '',
      themeType: '',
      type: '',
      quantity: 1,
      theme: '',
      request: '',
      referenceImage: '',
      deliveryDate: undefined,
      specialRequests: ''

    }
  })
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [decoration, setDecoration] = useState<string[]>([])
  const [openDate, setOpenDate] = useState(false)

  const router = useRouter()
  const watchedType = form.watch("type")

  console.log(estimatedPrice)
  // Configurar el formulario

  const productTypes = [
    { value: "cookies", label: "Galletas Decoradas", icon: "🍪" },
    { value: "macarons", label: "Macarons", icon: "🌈" },
  ]
  const decorationMultipliers = useMemo(() => ({
    Fondant: 1.5,
    Buttercream: 1.2,
    "Glaseado Real": 1.3,
    Chocolate: 1.1,
    Sprinkles: 1.05,
    "Flores de Azúcar": 1.8,
    "Letras/Números": 1.4,
    "Temática Personalizada": 2.0,
  }), [])
  const decorationOptions = [
    "Fondant",
    "Buttercream",
    "Glaseado Real",
    "Chocolate",
    "Sprinkles",
    "Flores de Azúcar",
    "Letras/Números",
    "Temática Personalizada",
  ]
  const themes = [{
    value: 'halloween', label: "Halloween 🎃"
  },
  { value: 'anime', label: "Anime 🌸" },
  { value: 'disney', label: "Disney ✨" },
  { value: 'superheroes', label: "Superhéroes 🦸" },
  { value: 'unicorns', label: "Unicornios 🦄" },
  { value: 'sports', label: "Deportes ⚽" },
  { value: 'flowers', label: "Flores 🌺" },
  { value: 'baby', label: "Baby Shower 👶" },
  { value: 'wedding', label: "Bodas 💒" },
  { value: 'birthday', label: "Cumpleaños 🎉" },
  { value: 'christmas', label: "Navidad 🎄" },
  { value: 'custom', label: "Personalizado 🎨" }]

  const flavorOptions = [
    "Vainilla",
    "Chocolate",
    "Fresa",
    "Limón",
    "Red Velvet",
    "Caramelo",
    "Coco",
    "Almendra",
    "Café",
    "Nutella",
    "Oreo",
    "Dulce de Leche",
  ]
  const basePrices = useMemo(() => ({
    cookies: 2.5, // por galleta
    macarons: 3.0, // por macaron
  }), [])


  useEffect(() => {

    const productType = watchedType

    if (productType && basePrices[productType as keyof typeof basePrices]) {
      const basePrice = basePrices[productType as keyof typeof basePrices]

      // Aplicar multiplicadores de decoración
      let decorationMultiplier = 1
      decoration.forEach((deco) => {
        if (decorationMultipliers[deco as keyof typeof decorationMultipliers]) {
          decorationMultiplier *= decorationMultipliers[deco as keyof typeof decorationMultipliers]
        }
      })

      // Calcular precio final
      const finalPrice = basePrice * quantity * decorationMultiplier
      setEstimatedPrice(finalPrice)
    } else {
      setEstimatedPrice(0)
    }
  }, [basePrices, decorationMultipliers, watchedType, decoration, quantity])


  const handleSubmit = async (data: CustomOrderFormValues) => {
    try {
      setIsSubmitting(true)
      const orders = await CreateOrders(data)
      if (orders) {
        form.reset()
        setDecoration([])
        setQuantity(1)
        setEstimatedPrice(0)
        setIsSubmitting(false)
        router.replace('/order')
        return (
          <Alert variant={'default'} className="bg-green-400">
            <CheckCircle2Icon />
            <AlertTitle>Su orden ha sido agregada satisfactoriamente</AlertTitle>
          </Alert>

        )
      }
    } catch (error) {
      return (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Succedió un error en la orden</AlertTitle>
          <AlertDescription>
            <p>Por favor verificar el formulario o ponerse en contacto con los desarrolladores.</p>
            <p>{`Error: ${error}`}</p>
          </AlertDescription>
        </Alert>
      )
    }
  }

  const handleFlavorToggle = (flavor: string, checked: boolean) => {
    const currentFlavors = form.getValues("flavors") || []
    const newFlavors = checked ? [...currentFlavors, flavor] : currentFlavors.filter((f) => f !== flavor)
    form.setValue("flavors", newFlavors)
  }

  const handleDecorationToggle = (decoration: string, checked: boolean) => {
    const currentDecorations = form.getValues("decorations") || []
    const newDecorations = checked
      ? [...currentDecorations, decoration]
      : currentDecorations.filter((d) => d !== decoration)
    setDecoration(newDecorations)
    form.setValue("decorations", newDecorations)
  }


  const watchedFlavors = form.watch("flavors") || []
  const watchedDecorations = form.watch("decorations") || []

  return (
    <div className={(className)} {...props}>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Encargos Personalizados</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haz realidad tus ideas más dulces. Creamos galletas únicas para tus ocasiones
            especiales.
          </p>
        </div>

        <Tabs defaultValue="track-orders" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-order" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Nuevo Encargo
            </TabsTrigger>
            <TabsTrigger value="track-orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Seguimiento
            </TabsTrigger>
          </TabsList>

          {/* Nuevo Encargo */}
          <TabsContent value="new-order">
            {/* Productos Destacados */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
              {productTypes.map((product) => (
                <Card key={product.value} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-2">{product.icon}</div>
                    <h3 className="font-semibold text-sm">{product.label}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Desde ${basePrices[product.value as keyof typeof basePrices]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-amber-600" />
                      Detalles de tu Encargo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        {/* Información de Contacto */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Información de Contacto</h3>

                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre Completo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Tu nombre completo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="tu@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Teléfono</FormLabel>
                                  <FormControl>
                                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Detalles del Producto */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Detalles del Producto</h3>

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tipo de Producto</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el producto" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {productTypes.map((product) => (
                                        <SelectItem key={product.value} value={product.value}>
                                          {product.icon} {product.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="quantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cantidad</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      max="1000"
                                      placeholder="1"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(Number.parseInt(e.target.value) || 1)
                                        setQuantity(Number.parseInt(e.target.value) || 1)
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Temática</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona una temática" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {themes.map((theme) => (
                                      <SelectItem key={theme.value} value={theme.value}>
                                        {theme.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Imagen de Referencia */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Camera className="h-5 w-5 text-purple-600" />
                            Imagen de Referencia
                          </h3>
                          <FormField
                            control={form.control}
                            name="referenceImage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sube una imagen de referencia (Opcional)</FormLabel>
                                <FormControl>
                                  <ImageUpload
                                    label=""
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    placeholder="Sube una imagen de referencia para tu encargo"
                                    maxSize={5}
                                  />
                                </FormControl>
                                <FormDescription>
                                  💡 Una imagen nos ayuda a entender mejor tu visión y crear exactamente lo que imaginas
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Sabores */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Sabores Preferidos</h3>
                          <FormField
                            control={form.control}
                            name="flavors"
                            render={() => (
                              <FormItem>
                                <FormLabel>Selecciona los sabores que te gustaría incluir</FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
                                    {flavorOptions.map((flavor) => (
                                      <div key={flavor} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`flavor-${flavor}`}
                                          checked={watchedFlavors.includes(flavor)}
                                          onCheckedChange={(checked) => handleFlavorToggle(flavor, checked as boolean)}
                                        />
                                        <label
                                          htmlFor={`flavor-${flavor}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {flavor}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </FormControl>
                                {watchedFlavors.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {watchedFlavors.map((flavor) => (
                                      <Badge key={flavor} variant="secondary">
                                        {flavor}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Decoraciones */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Decoraciones</h3>
                          <FormField
                            control={form.control}
                            name="decorations"
                            render={() => (
                              <FormItem>
                                <FormLabel>Tipos de decoración que te interesan</FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
                                    {decorationOptions.map((decoration) => (
                                      <div key={decoration} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`decoration-${decoration}`}
                                          checked={watchedDecorations.includes(decoration)}
                                          onCheckedChange={(checked) =>
                                            handleDecorationToggle(decoration, checked as boolean)
                                          }
                                        />
                                        <label
                                          htmlFor={`decoration-${decoration}`}
                                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                          {decoration}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </FormControl>
                                {watchedDecorations.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {watchedDecorations.map((decoration) => (
                                      <Badge key={decoration} variant="secondary">
                                        {decoration}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Fecha y Entrega */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Entrega</h3>

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="deliveryDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Fecha de Entrega</FormLabel>
                                  <Popover open={openDate} onOpenChange={setOpenDate}>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground",
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP", { locale: es })
                                          ) : (
                                            <span>Selecciona una fecha</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                          setOpenDate(false)
                                          field.onChange(date)
                                          form.setValue('deliveryDate', date || new Date())
                                        }}
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="adress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Dirección de Entrega (Opcional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Dirección completa (opcional si es pickup)" {...field} />
                                  </FormControl>
                                  <FormDescription>Déjalo vacío si prefieres recoger en tienda</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Solicitudes Especiales */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Solicitudes Especiales</h3>
                          <FormField
                            control={form.control}
                            name="specialRequests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Detalles Adicionales (Opcional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe cualquier detalle específico, colores, temas, alergias, o ideas especiales que tengas en mente..."
                                    className="resize-none"
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-amber-600 hover:bg-amber-700"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              Enviando...
                              <Spinner />
                            </>
                          ) : (
                            "Enviar Solicitud de Encargo"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              {/* Calculadora de Precio */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Precio Estimado
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">${estimatedPrice.toFixed(2)}</div>
                      <p className="text-sm text-gray-600 mb-4">*Precio estimado basado en tu selección</p>

                      {estimatedPrice > 0 && (
                        <div className="space-y-2 text-sm text-left">
                          <div className="flex justify-between">
                            <span>Precio base:</span>
                            <span>
                              ${(estimatedPrice || 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cantidad:</span>
                            <span>{quantity || 1}</span>
                          </div>
                          {watchedDecorations.length > 0 && (
                            <div className="flex justify-between">
                              <span>Decoraciones:</span>
                              <span>
                                +
                                {(
                                  (estimatedPrice /
                                    ((basePrices[form.watch("type") as keyof typeof basePrices] || 0) *
                                      (quantity || 1)) -
                                    1) *
                                  100
                                ).toFixed(0)}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Información del Proceso */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-amber-600" />
                      ¿Cómo Funciona?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Envía tu Solicitud</h4>
                        <p className="text-xs text-gray-600">Completa el formulario con todos los detalles</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Te Contactamos</h4>
                        <p className="text-xs text-gray-600">En 24 horas máximo para confirmar detalles y precio</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Creamos tu Pedido</h4>
                        <p className="text-xs text-gray-600">Preparamos tu encargo con amor y dedicación</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Entrega</h4>
                        <p className="text-xs text-gray-600">Recibe tu pedido en la fecha acordada</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Seguimiento de Encargos */}
          <TabsContent value="track-orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Seguimiento de Encargos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersList orders={orders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
