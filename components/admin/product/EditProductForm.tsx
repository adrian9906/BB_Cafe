'use client'
import { ProductProps } from "@/app/products/page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UpdateProduct } from "@/lib/actions"
import { ProductsSchema } from "@/lib/validations/products"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from 'zod'


interface CreateProductsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    product: ProductProps
}

type FormData = z.infer<typeof ProductsSchema>



export function EditProductForm({ className,product, ...props }: CreateProductsFormProps) {
    const form = useForm<FormData>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      featured: product.featured,
      name:product.name,
      category: product.category,
      description: product.description,
      flavors: product.flavors,
      image: product.image,
      price: product.price,
      stock: product.stock
    }
  })
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


     const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)

      const result = await UpdateProduct(product.id,data)
      if(result){
         toast("Se actualizó el usuario correctamente", {
        description: (
        <pre className="mt-2 w-[320px] rounded-md bg-green-600 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
      }
      form.reset()
      router.refresh()
      setIsDialogOpen(false)
    } catch (error) {
         toast("Ocurrio un error en la creacion del producto", {
            description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
    })
      console.error("Error al crear producto:", error)
    } finally {
      setIsLoading(false)
    }
  }
    return (
        <div className={(className)} {...props}>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Agrega un nuevo producto al catálogo
                </DialogDescription>
              </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del producto</FormLabel>
                            <FormControl>
                            <Input
                                autoCapitalize="characters"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                                placeholder="Ej: Cappuccino Especial"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Añade una pequeña descripción</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Describe el producto..." disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Añade el precio</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="0.00" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Añade el stock</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selecciona una categoría</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="coffee">Bebidas de Café</SelectItem>
                                <SelectItem value="sweets">Dulces</SelectItem>
                                <SelectItem value="drinks">Bebidas</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Añade el URL de la imagen (opcional)</FormLabel>
                            <FormControl>
                            <Input {...field} placeholder="https://ejemplo.com/imagen.jpg" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                            <FormLabel>Producto destacado</FormLabel>
                            </div>
                        </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                        Cancelar
                        </Button>
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                        {isLoading ? "Actualizando..." : "Actualizar"}
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
          </Dialog>
        </div>
    )
    
}