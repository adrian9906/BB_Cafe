import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "./db";

export async function getCurrentUser() {
   const session = await getServerSession(authOptions);
  if (!session) return null;

  const user = await db.user.findUnique({
    where: { email: session.user?.email || '' },
    select: { id: true, name: true, username: true, email: true, image: true, rol: true },
  });

  return user;
}