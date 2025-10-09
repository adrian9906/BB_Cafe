// seed.ts
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...')

    // Limpiar datos existentes (opcional - ten cuidado en producción)
    console.log('🧹 Limpiando datos existentes...')
    await prisma.customOrder.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.product.deleteMany()
    await prisma.workers.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()

    // Crear usuarios
    console.log('👥 Creando usuarios...')
    const users = await prisma.user.createMany({
        data: [
            {
                name: 'Admin User',
                username: 'admin',
                password: '$2b$10$EXAMPLEHASHEDPASSWORD', // En la práctica, usa bcrypt
                email: 'admin@pasteleria.com',
                image: '/images/admin.jpg',
                rol: UserRole.ADMIN,
            },
            {
                name: 'Juan Pérez',
                username: 'juanperez',
                password: '$2b$10$EXAMPLEHASHEDPASSWORD2',
                email: 'juan@email.com',
                image: '/images/juan.jpg',
                rol: UserRole.USER,
            },
            {
                name: 'María García',
                username: 'mariag',
                password: '$2b$10$EXAMPLEHASHEDPASSWORD3',
                email: 'maria@email.com',
                image: '/images/maria.jpg',
                rol: UserRole.USER,
            },
        ],
    })

    // Obtener IDs de usuarios creados
    const adminUser = await prisma.user.findUnique({
        where: { email: 'admin@pasteleria.com' }
    })

    const regularUser = await prisma.user.findUnique({
        where: { email: 'juan@email.com' }
    })

    // Crear productos
    console.log('🎂 Creando productos...')
    const products = await prisma.product.createMany({
        data: [
            {
                name: 'Pastel de Chocolate Clásico',
                description: 'Delicioso pastel de chocolate con crema batida y fresas',
                price: 299.99,
                image: '/images/chocolate-cake.jpg',
                rating: 4.8,
                category: 'pasteles',
                stock: 15,
                featured: true,
                flavors: 'chocolate, vainilla'
            },
            {
                name: 'Cheesecake de Fresa',
                description: 'Suave cheesecake con topping de fresas naturales',
                price: 349.50,
                image: '/images/cheesecake-fresa.jpg',
                rating: 4.9,
                category: 'cheesecakes',
                stock: 10,
                featured: true,
                flavors: 'queso, fresa'
            },
            {
                name: 'Cupcakes Variados',
                description: 'Set de 12 cupcakes con diferentes sabores y decoraciones',
                price: 189.99,
                image: '/images/cupcakes-variados.jpg',
                rating: 4.7,
                category: 'cupcakes',
                stock: 25,
                featured: false,
                flavors: 'vainilla, chocolate, fresa'
            },
            {
                name: 'Pastel de Red Velvet',
                description: 'Elegante pastel red velvet con cream cheese frosting',
                price: 399.00,
                image: '/images/red-velvet.jpg',
                rating: 4.9,
                category: 'pasteles',
                stock: 8,
                featured: true,
                flavors: 'red velvet'
            },
            {
                name: 'Galletas Decoradas',
                description: 'Paquete de 6 galletas decoradas a mano',
                price: 129.50,
                image: '/images/galletas-decoradas.jpg',
                rating: 4.6,
                category: 'galletas',
                stock: 30,
                featured: false,
                flavors: 'vainilla, chocolate'
            },
            {
                name: 'Tres Leches',
                description: 'Tradicional pastel tres leches con merengue',
                price: 279.99,
                image: '/images/tres-leches.jpg',
                rating: 4.8,
                category: 'pasteles',
                stock: 12,
                featured: false,
                flavors: 'tres leches, vainilla'
            }
        ],
    })

    // Obtener algunos productos para relaciones
    const product1 = await prisma.product.findFirst({
        where: { name: 'Pastel de Chocolate Clásico' }
    })

    const product2 = await prisma.product.findFirst({
        where: { name: 'Cheesecake de Fresa' }
    })

    // Crear trabajadores
    console.log('👨‍🍳 Creando trabajadores...')
    const workers = await prisma.workers.createMany({
        data: [
            {
                name: 'Ana Rodríguez',
                position: 'Pastelera Principal',
                description: 'Especialista en pasteles de boda y eventos especiales con 10 años de experiencia',
                image: '/images/ana-rodriguez.jpg',
                email: 'ana@pasteleria.com',
                phone: '+52 55 1234 5678'
            },
            {
                name: 'Carlos Mendoza',
                position: 'Chef Repostero',
                description: 'Experto en técnicas francesas y decoración avanzada',
                image: '/images/carlos-mendoza.jpg',
                email: 'carlos@pasteleria.com',
                phone: '+52 55 2345 6789'
            },
            {
                name: 'Laura Hernández',
                position: 'Decoradora',
                description: 'Artista especializada en decoración con fondant y chocolate',
                image: '/images/laura-hernandez.jpg',
                email: 'laura@pasteleria.com',
                phone: '+52 55 3456 7890'
            }
        ],
    })

    // Crear carritos de compra
    console.log('🛒 Creando carritos...')
    if (regularUser && product1 && product2) {
        const cart = await prisma.cart.create({
            data: {
                userId: regularUser.id,
                items: JSON.stringify([
                    { productId: product1.id, quantity: 1, price: product1.price },
                    { productId: product2.id, quantity: 2, price: product2.price }
                ]),
                total: product1.price + (product2.price * 2),
                productID: product1.id
            }
        })
    }

    // Crear pedidos personalizados
    console.log('📝 Creando pedidos personalizados...')
    const customOrders = await prisma.customOrder.createMany({
        data: [
            {
                name: 'Roberto Sánchez',
                phone: '+52 55 4567 8901',
                email: 'roberto@email.com',
                flavors: 'chocolate, avellana',
                decorations: true,
                delivery: new Date('2024-02-15T14:00:00Z'),
                adress: 'Av. Principal 123, Col. Centro, CDMX',
                price: 650.00,
                theme: 'Superhéroes',
                type: 'pastel',
                themeType: 'personalizado',
                quantity: 25,
                state: 'confirmed',
                request: 'Incluir logo de la empresa y mensaje de felicitación'
            },
            {
                name: 'Sofía Martínez',
                phone: '+52 55 5678 9012',
                email: 'sofia@email.com',
                flavors: 'vainilla, fresa',
                decorations: true,
                delivery: new Date('2024-02-20T16:30:00Z'),
                adress: 'Calle Secundaria 456, Col. Del Valle, CDMX',
                price: 450.00,
                theme: 'Princesas',
                type: 'cupcakes',
                quantity: 36,
                state: 'pending',
                request: 'Cupcakes con coronas de princesa en colores pastel'
            },
            {
                name: 'Miguel Torres',
                phone: '+52 55 6789 0123',
                email: 'miguel@email.com',
                flavors: 'limón, merengue',
                decorations: false,
                delivery: new Date('2024-02-18T12:00:00Z'),
                adress: 'Privada Jardines 789, Col. Nápoles, CDMX',
                price: 320.00,
                type: 'pastel',
                quantity: 15,
                state: 'in_progress',
                request: 'Pastel sin gluten, para persona diabética'
            }
        ],
    })

    console.log('✅ Seed completado exitosamente!')
    console.log('📊 Resumen:')
    console.log(`   - ${users.count} usuarios creados`)
    console.log(`   - ${products.count} productos creados`)
    console.log(`   - ${workers.count} trabajadores creados`)
    console.log(`   - ${customOrders.count} pedidos personalizados creados`)
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })