"use client"

import { useState } from "react"
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
import { CalendarIcon, Heart, Gift, Users, Cake, CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { OrderSchema } from "@/lib/validations/orderSchema"
import Link from "next/link"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { CreateOrders } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface CreateProductsFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type CustomOrderFormValues = z.infer<typeof OrderSchema>

export default function CustomOrdersMain({ className, ...props }: CreateProductsFormProps) {
  const form = useForm<CustomOrderFormValues>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      adress: '',
      email: '',
      name: '',
      phone: '',
      themeType: '',
      type: '',
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecked, setChecked] = useState(false)
  const router = useRouter()
  const [openDate, setOpenDate] = useState(false)
  // Configurar el formulario

  const productTypes = [
    { value: "cookies", label: "Galletas Decoradas", icon: "🍪" },
    { value: "macarons", label: "Macarons", icon: "🌈" },
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


  const handleSubmit = async (data: CustomOrderFormValues) => {
    try {
      setIsSubmitting(true)
      const orders = await CreateOrders(data)
      if (orders) {
        form.reset()
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
    const currentFlavors = form.getValues("flavors")
    const flavorsArray: string[] = []
    if (currentFlavors) {
      const newFlavors = checked ? [...flavorsArray, flavor] : flavorsArray.filter((f) => f !== flavor)
      console.log(newFlavors.join(","))
      form.setValue("flavors", newFlavors.join(","))
    }
    else {
      flavorsArray.push(flavor)
      form.setValue("flavors", flavor)
    }
  }


  const watchedFlavors = form.watch("flavors") || ''
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

        {/* Productos Destacados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mb-12">
          {productTypes.map((product) => (
            <Card key={product.value} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-4xl mb-2">{product.icon}</div>
                <h3 className="font-semibold text-sm">{product.label}</h3>
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
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                              <Input placeholder="Tu nombre completo" autoComplete={"off"} disabled={isSubmitting} {...field} />
                            </FormControl>
                            <FormDescription>Como aparecerá en la orden del encargo</FormDescription>
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
                                <Input type="email" autoComplete={"off"} disabled={isSubmitting} placeholder="tu@email.com" {...field} />
                              </FormControl>
                              <FormDescription>Para enviarte confirmaciones</FormDescription>
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
                                <Input type="tel" autoComplete={"off"} placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormDescription>Para coordinar detalles</FormDescription>
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
                              <Select onValueChange={field.onChange} disabled={isSubmitting} defaultValue={field.value}>
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
                              <FormDescription>¿Qué tipo de dulce quieres encargar?</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cantidad Aproximada</FormLabel>
                              <FormControl>
                                <Input type="number" autoComplete={"off"} disabled={isSubmitting} placeholder="Ej: 24 galletas" {...field} />
                              </FormControl>
                              <FormDescription>Especifica cuánto necesitas</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
                                      disabled={isSubmitting}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>


                    {/* Temática */}
                    <FormField
                      control={form.control}
                      name="themeType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eliga la temática que desee</FormLabel>
                          <Select onValueChange={field.onChange} disabled={isSubmitting} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona la temática" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {themes.map((product) => (
                                <SelectItem key={product.value} value={product.value}>
                                  {product.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>¿Qué temática deseea?</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Decoraciones */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Decoraciones</h3>
                      <FormField
                        control={form.control}
                        name="decorations"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox disabled={isSubmitting} checked={field.value} onCheckedChange={() => (
                                field.onChange,
                                setChecked(!isChecked)
                              )} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Temática perzonalizada</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    {isChecked && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Describa cual sería la temática deseada</h3>
                        <FormField
                          control={form.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temáticas</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describa la temática que tengas en mente..."
                                  className="resize-none"
                                  disabled={isSubmitting}
                                  rows={4}
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Comparte todos los detalles que consideres importantes para tu encargo perfecto
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                    )}

                    {/* Fecha y Entrega */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Entrega</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="delivery"
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
                                    onSelect={date => {
                                      if (date) {
                                        field.onChange(date)
                                        setOpenDate(false)
                                      }
                                    }}
                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>¿Cuándo necesitas tu encargo?</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="adress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dirección de Entrega (Opcional)</FormLabel>
                            <FormControl>
                              <Input disabled={isSubmitting} placeholder="Dirección completa" {...field} />
                            </FormControl>
                            <FormDescription>Déjalo vacío si prefieres recoger en tienda</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Solicitudes Especiales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Solicitudes Especiales</h3>
                      <FormField
                        control={form.control}
                        name="request"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detalles Adicionales (Opcional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe cualquier detalle específico, colores, temas, alergias, o ideas especiales que tengas en mente..."
                                className="resize-none"
                                disabled={isSubmitting}
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Comparte todos los detalles que consideres importantes para tu encargo perfecto
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      size="lg"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Solicitud de Encargo"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Información Lateral */}
          <div className="space-y-6">
            {/* Proceso */}
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

            {/* Información Importante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="font-semibold text-amber-800">⏰ Tiempo Mínimo</p>
                  <p className="text-amber-700">
                    Necesitamos mínimo 48 horas de anticipación para encargos personalizados.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-800">💰 Anticipo</p>
                  <p className="text-blue-700">Se requiere un anticipo del 50% para confirmar el encargo.</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-800">📞 Contacto Directo</p>
                  <p className="text-green-700">WhatsApp: (555) 123-4567 para consultas urgentes.</p>
                </div>
              </CardContent>
            </Card>

            {/* Galería de Ejemplos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cake className="h-5 w-5 text-pink-500" />
                  Trabajos Anteriores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center  overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Image src="/work_done/AnimeCookies.png" alt="Galletas Decoradas" width={300} height={300} className="object-cover rounded-lg" />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center  overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Image src="/work_done/cupCakes.png" alt="Pastel de Chocolate" width={300} height={300} className="object-cover rounded-lg" />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center  overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Image src="/work_done/WeddingCake.png" alt="Pastel de Cumpleaños" width={300} height={300} className="object-cover rounded-lg" />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center  overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <Image src="/work_done/batmanCake.png" alt="Pastel de Batman" width={300} height={300} className="object-cover rounded-lg" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Síguenos en Instagram <Link href={"https://www.instagram.com/bb_cafe_cuba?igsh=MTcxaHJ5emNkcHlidQ=="} className="font-bold">@bbcafe</Link>  para ver más ejemplos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
