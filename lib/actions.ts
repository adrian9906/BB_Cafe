'use server'
import { db } from "./db";
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { CustomOrder } from "@prisma/client";
interface FormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  flavors?: string,
  stock: number
}

interface FormDataImageUpload {
  file: File;
}

interface FormDataWorker {
  name: string;
  description: string;
  image: string;
  position: string;
  phone: string;
  email: string
}

interface FormDataOrders {
  name: string;
  phone: string;
  email: string;
  type: string;
  adress: string;
  quantity: number;
  flavors?: string[] | undefined;
  decorations?: string[] | undefined;
  theme?: string | undefined;
  request?: string | undefined;
  referenceImage?: string | undefined;
  deliveryDate?: Date | undefined;
  specialRequests?: string | undefined;
  themeType: string
}


export async function DeleteProduct(id: string) {
  const productRecord = await db.product.findFirst({
    where: {
      id: id
    }
  })
  if (!productRecord) return null
  await db.product.delete({
    where: {
      id: id
    }
  })
}


export async function CreatePrduct(data: FormData) {
  const {
    name,
    description,
    price,
    image,
    category,
    stock,
    featured,
    flavors = 'none'
  } = data
  const product = await db.product.create({
    data: {
      name,
      description,
      price,
      image,
      category,
      stock,
      featured,
      flavors,
      rating: 0
    }
  })
  return product
}

export async function UpdateProduct(id: string, data: FormData) {
  const {
    name,
    description,
    price,
    image,
    category,
    stock,
    featured,
    flavors = 'none'
  } = data
  const product = await db.product.update({
    where: {
      id
    },
    data: {
      name,
      description,
      price,
      image,
      category,
      stock,
      featured,
      flavors,
    }
  })
  return product

}

export async function EditFeatured(id: string) {
  const productRecord = await db.product.findFirst({
    where: {
      id: id
    }
  })
  if (!productRecord) return null
  await db.product.update({
    where: {
      id: id
    },
    data: {
      featured: !productRecord.featured
    }
  })
}

export async function editRating(product: string, startRating: number) {
  const productRecord = await db.product.findFirst({
    where: {
      name: product, // Asume que 'product' es el nombre del producto que buscas
    },
  });
  let newRating = 0.0
  if (productRecord) {
    if (productRecord.rating === 0) {
      newRating = startRating
    }
    else {
      newRating = (startRating + productRecord.rating) / 2
    }
    // Si se encontró el evento, actualiza sus descriptors utilizando el ID obtenido
    await db.product.update({
      where: {
        id: productRecord.id, // Usa el ID obtenido para asegurar la unicidad
      },
      data: {
        rating: newRating,
      },
    });
    return
  } else {
    console.log('Producto no encontrado');
    return null
  }

}

export async function CreateWorker(data: FormDataWorker) {
  const {
    name,
    description,
    image,
    position,
    phone,
    email
  } = data
  const worker = await db.workers.create({
    data: {
      name,
      description,
      image,
      position,
      phone,
      email
    }
  })
  return worker
}
export async function DeleteWorker(id: string) {
  const workerRecord = await db.workers.findFirst({
    where: {
      id: id
    }
  })
  if (!workerRecord) return null
  await db.workers.delete({
    where: {
      id: id
    }
  })
}

export async function UpdateWorker(id: string, data: FormDataWorker) {

  const {
    name,
    description,
    phone,
    image,
    email,
    position
  } = data
  const product = await db.workers.update({
    where: {
      id
    },
    data: {
      name,
      description,
      image,
      email,
      phone,
      position,
    }
  })
  return product

}


export async function getOrders() {
  try {
    const result: CustomOrder[] = await db.customOrder.findMany()
    return result
  }
  catch {
    return []
  }
}
export async function CreateOrders(data: FormDataOrders) {
  const {
    adress,
    email,
    name,
    phone,
    quantity,
    type,
    decorations,
    flavors,
    request,
    theme,
    referenceImage,
    deliveryDate,
    specialRequests,
    themeType } = data
  console.log(themeType)
  let price = quantity * 50
  if (decorations) {
    price = price + 100 + 100
  }
  const decorations2 = decorations?.join(", ")
  const flavors2 = flavors?.join(", ")
  const orders = await db.customOrder.create({
    data: {
      name,
      address: adress || "none",
      decorations: decorations2 || 'none',
      email,
      phone,
      quantity,
      type,
      flavors: flavors2 || 'none',
      price,
      request,
      referenceImage: referenceImage || "none",
      deliveryDate: deliveryDate || new Date(),
      specialRequests: specialRequests || "none",
      theme,
      themeType: themeType
    }
  })
  return orders


}

export async function UpdateOrders(id: string, newStatus: string) {
  await db.customOrder.update({
    where: {
      id: id
    },
    data: {
      state: newStatus
    }
  })
}

export async function uploadImage(formData: FormDataImageUpload) {
  try {
    const file = formData.file

    if (!file) {
      return {
        success: false,
        error: 'No se recibió ningún archivo'
      }
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'El archivo debe ser una imagen'
      }
    }

    // Validar tamaño (5MB por defecto)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'La imagen es demasiado grande (máx 5MB)'
      }
    }

    // Convertir archivo a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${extension}`

    // Definir ruta donde se guardará (public/uploads)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    // Crear carpeta si no existe
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, fileName)

    // Guardar archivo
    await writeFile(filePath, buffer)

    // Retornar URL pública
    const fileUrl = `${process.env.NEXTAUTH_URL}/uploads/${fileName}`

    return {
      success: true,
      url: fileUrl,
      fileName: fileName
    }

  } catch (error) {
    console.error('Error al subir imagen:', error)
    return {
      success: false,
      error: 'Error al procesar la imagen'
    }
  }
}

export async function deleteOrder(where: { id: string }) {
  try {
    await db.customOrder.delete({
      where
    })
  } catch (error) {
    console.error('Error al eliminar la orden:', error)
    throw error
  }
  return { success: true }
}