import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function createInitialAdmin() {
  const adminEmail = "admin@dinidugardens.lk"
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (existingUser) return { message: "Admin already exists" }

  const hashedPassword = await bcrypt.hash("Dinidu@2026", 10)

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Main Admin",
      role: "ADMIN"
    }
  })

  return { message: "Initial admin created successfully" }
}
