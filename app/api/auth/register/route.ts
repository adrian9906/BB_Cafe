import { NextRequest, NextResponse } from "next/server";
import {db} from '@/lib/db'
import { userRegisterSchema } from "@/lib/validations/auth";
import { z } from "zod";
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const data = userRegisterSchema.parse(json)

    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email }
        ]
      }
    });

    if(existingUser) {
      return NextResponse.json({
        message: "Ya existe un usuario con ese nombre o correo"
      }, {status: 400})
    }

    if(data.password !== data.confrimPassword) {
      return NextResponse.json({
        message: "No coinciden las contraseñas"
      }, {status: 400})
    }


    data.password = crypto.createHash('sha256').update(data.password).digest('hex')
    const newUser = await db.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password
      }
    })
    return NextResponse.json(newUser)
  }catch (error) {
    if(error instanceof z.ZodError) {
      return NextResponse.json(error.issues,{status:422})
    }
    return new Response(null,{status: 500})
  }
}