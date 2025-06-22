'use server'
import { db } from "./db";

interface FormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  flavors? : string,
  stock: number
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
    delivery: Date;
    type: string;
    adress: string;
    quantity: number;
    flavors?: string | undefined;
    decorations?: boolean | undefined;
    theme?: string | undefined;
    request?: string | undefined;
    themeType:string
}


export async function DeleteProduct(id:string) {
  const productRecord = await db.product.findFirst({
    where:{
      id: id
    }
  })
  if (!productRecord) return null
  await db.product.delete({
    where:{
      id: id
    }
  })
}


export async function CreatePrduct(data:FormData) {
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
    data:{
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

export async function UpdateProduct(id: string, data:FormData) {
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
    where:{
      id
    },
    data:{
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

export async function EditFeatured(id:string) {
  const productRecord = await db.product.findFirst({
    where:{
      id: id
    }
  })
  if (!productRecord) return null
  await db.product.update({
    where:{
      id: id
    },
    data:{
      featured: !productRecord.featured
    }
  })
}

export async function editRating(product:string, startRating: number) {
  const productRecord = await db.product.findFirst({
    where: {
      name: product, // Asume que 'product' es el nombre del producto que buscas
    },
  });
  let newRating = 0.0
  if (productRecord) {
    if (productRecord.rating === 0){
        newRating = startRating
    }
    else {
        newRating = (startRating + productRecord.rating)/2
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

export async function CreateWorker(data:FormDataWorker) {
  const {
    name,
    description,      
    image,     
    position,     
    phone,     
    email
  } = data 
  const worker = await db.workers.create({
    data:{
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
export async function DeleteWorker(id:string) {
  const workerRecord = await db.workers.findFirst({
    where:{
      id: id
    }
  })
  if (!workerRecord) return null
  await db.workers.delete({
    where:{
      id: id
    }
  })
}

export async function UpdateWorker(id:string, data:FormDataWorker) {

  const {
    name,
    description,      
    phone,
    image,     
    email,     
    position
  } = data
  const product = await db.workers.update({
    where:{
      id
    },
    data:{
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

export async function CreateOrders(data:FormDataOrders) {
  const {
    adress, 
    delivery, 
    email,
    name, 
    phone, 
    quantity, 
    type, 
    decorations, 
    flavors, 
    request, 
    theme,
    themeType} = data
    console.log(themeType)
    let price = quantity * 50
    if (decorations){
      price = price + 100 + 100
    }

     const orders = await db.customOrder.create({
    data:{
      name,
      adress,
      decorations: decorations || false,
      delivery,
      email,
      phone,
      quantity,
      type,
      flavors,
      price,
      request,
      theme,
      themeType: themeType
    }
  })
  return orders

  
}

export async function UpdateOrders(id:string, newStatus: string) {
  await db.customOrder.update({
        where:{
          id: id
        },
        data:{
          state: newStatus
        }
      })
}