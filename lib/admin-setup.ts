import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function createInitialAdmin() {
  const adminEmail = "admin@dinidugardens.lk"
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  const hashedPassword = await bcrypt.hash("Dinidu@2026", 10)

  if (existingUser) {
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "SUPER_ADMIN" }
    })
    return { message: "Admin already existed and has been promoted to SUPER_ADMIN" }
  }

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Main Admin",
      role: "SUPER_ADMIN"
    }
  })

  return { message: "Initial admin created successfully" }
}
