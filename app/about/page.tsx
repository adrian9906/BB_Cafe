import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Heart, Users, Award, Clock, Leaf } from "lucide-react"
import Header from "@/components/header"
import { UserProps } from "../(landing)/page"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

export default async function AboutPage() {

  const user: UserProps | null = await getCurrentUser();
  const isAdmin = user?.rol === "ADMIN"
  const isLogged = user !== null

  const teamMembers = await db.workers.findMany()

  const values = [
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Calidad Premium",
      description: "Utilizamos solo los mejores ingredientes y técnicas artesanales para cada producto.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Pasión por el Servicio",
      description: "Cada bebida y dulce se prepara con amor y dedicación para nuestros clientes.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Comunidad",
      description: "Somos más que una cafetería, somos parte de la comunidad local.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excelencia",
      description: "Nos esforzamos por superar las expectativas en cada experiencia.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Frescura Garantizada",
      description: "Preparamos todo al momento para garantizar la máxima frescura.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sostenibilidad",
      description: "Comprometidos con prácticas responsables y sostenibles.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header isAdmin = {isAdmin} isLogged = {isLogged} user = {user || null}/>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-600">Sobre Nosotros</Badge>
              <h1 className="text-4xl font-bold mb-6">
                Nuestra Historia en <span className="text-amber-600">BB Café</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                En el vibrante mes de marzo de 2025, nació BB Café con un sueño sencillo
                pero ambicioso: reinventar la experiencia del café en nuestra región.
                Nos inspira la búsqueda incansable de la excelencia fusionando tradición e innovación
                para crear cafés excepcionales y dulces gourmet que despiertan los sentidos.
              </p>
              <p className="text-muted-foreground">
                En BB Café, no solo servimos bebidas; creamos conexiones, aromas y memorias. Esta es nuestra historia, y cada día
                escribimos un nuevo capítulo contigo.
              </p>
              <p className="text-amber-600 font-bold mt-1">
                Bienvenidos a nuestra mesa.
              </p>
            </div>
            <div className="relative flex mx-auto items-center justify-between">
              <div className="relative w-80 h-80">
                <Image
                  src="/images/bb-cafe-logo.jpg"
                  alt="BB Café Logo"
                  width={320}
                  height={320}
                  className="rounded-full shadow-2xl object-cover"
                  priority
                  /> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Nuestra Misión</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Crear momentos especiales a través de bebidas de café excepcionales y dulces gourmets, brindando
                  una experiencia única que conecte a las personas con sabores auténticos y un servicio cálido y
                  personalizado.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <Award className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Nuestra Visión</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ser la cafetería de referencia en la región, reconocida por la excelencia en nuestros productos, la
                  innovación en nuestros servicios y nuestro compromiso con la comunidad y el medio ambiente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en BB Café, desde la selección de ingredientes hasta la
              atención al cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-0">
                  <div className="text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Las personas apasionadas que hacen posible la experiencia BB Café cada día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900">
                  {/* Placeholder para foto del trabajador */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-amber-200 dark:bg-amber-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">Foto próximamente</p>
                    </div>
                  </div>
                  {/* Aquí puedes reemplazar con la imagen real */}
                  {/* <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  /> */}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-3 text-amber-600 border-amber-600">
                    {member.position}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Historia Timeline */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestra Trayectoria</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un viaje de crecimiento, aprendizaje y dedicación al arte del café y la repostería.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                 2025
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Fundación de BB Café</h3>
                  <p className="text-muted-foreground">
                    Abrimos en junio de 2025 nuestras puertas con el sueño de crear el café perfecto y ofrecer dulces gourmets únicos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  2025
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Servicio de Delivery</h3>
                  <p className="text-muted-foreground">
                    Lanzamos en julio de 2025 nuestro servicio de entrega a domicilio para llevar BB Café directamente a tu hogar.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  2025
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Encargos Personalizados</h3>
                  <p className="text-muted-foreground">
                   En agosto de 2025 comenzamos a ofrecer servicios de repostería personalizada para eventos especiales.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  2025
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Expansión Digital</h3>
                  <p className="text-muted-foreground">
                   En septiembre de 2025 se realiza lanzamiento de nuestra plataforma online mejorada para una experiencia de compra excepcional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/bb-cafe-logo.jpg"
                    alt="BB Café Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-400">BB Café</h3>
              </div>
              <p className="text-gray-300">Tu destino para las mejores bebidas de café y dulces artesanales.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/products?category=coffee" className="hover:text-amber-400 transition-colors">
                    Bebidas de Café
                  </a>
                </li>
                <li>
                  <a href="/products?category=sweets" className="hover:text-amber-400 transition-colors">
                    Dulces
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-amber-400 transition-colors">
                    Todos los Productos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicio</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#delivery" className="hover:text-amber-400 transition-colors">
                    Delivery
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-amber-400 transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-amber-400 transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 (555) 123-4567</p>
                <p>📧 info@bbcafe.com</p>
                <p>📍 Calle Principal 123</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BB Café. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
