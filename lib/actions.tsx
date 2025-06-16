'use server'
import { db } from "./db";



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