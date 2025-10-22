'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WorkersSchema } from "@/lib/validations/workersSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from 'zod'
import { Employee } from "./adminEmployyesHome"
import { UpdateWorker } from "@/lib/actions"


interface CreateProductsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    worker: Employee
}

type FormData = z.infer<typeof WorkersSchema>



export function EditEmployesForm({ className, worker, ...props }: CreateProductsFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(WorkersSchema),
        defaultValues: {
            name: worker.name,
            description: worker.description,
            image: worker.image,
            email: worker.email,
            phone: worker.phone,
            position: worker.position
        }
    })
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const handleSubmit = async (data: FormData) => {
        try {
            setIsLoading(true)
            const result = await UpdateWorker(worker.id, data)
            if (result) {
                toast("Se creo el usuario correctamente", {
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
                        <DialogTitle>Editar trabajador {worker.name}</DialogTitle>
                        <DialogDescription>
                            {`Actualizar los atributos del trabajador ${worker.name}`}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del trabajador</FormLabel>
                                        <FormControl>
                                            <Input
                                                autoCapitalize="characters"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                placeholder="Ej: Mario Gonzalez"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo/Posición</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej: Barista Senior"
                                                {...field} />
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
                                            <Textarea placeholder="Describe la experiencia y especialidades..." disabled={isLoading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="email@bbcafe.com" disabled={isLoading} {...field} />
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
                                            <Input
                                                placeholder="+53 53402567"
                                                disabled={isLoading} {...field} />
                                        </FormControl>
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
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                    {isLoading ? "Actualizando..." : "Actualizar Empleado"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    )

}