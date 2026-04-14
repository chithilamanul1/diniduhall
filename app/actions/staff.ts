'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcrypt'

export async function getStaff() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })
  } catch (error) {
    console.error('Failed to fetch staff:', error)
    return []
  }
}

export async function createStaff(data: {
  name: string
  email: string
  password?: string
  role: string
}) {
  try {
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null
    
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as any,
      },
    })
    
    revalidatePath('/admin/staff')
    return { success: true, user }
  } catch (error: any) {
    console.error('Failed to create staff:', error)
    return { success: false, error: error.message || 'Failed to create staff' }
  }
}

export async function updateStaffRole(id: string, role: string) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role: role as any },
    })
    revalidatePath('/admin/staff')
    return { success: true }
  } catch (error) {
    console.error('Failed to update staff role:', error)
    return { success: false, error: 'Failed to update role' }
  }
}

export async function deleteStaff(id: string) {
  try {
    // Prevent self-deletion if needed? Usually handled in UI.
    await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/admin/staff')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete staff:', error)
    return { success: false, error: 'Failed to delete staff' }
  }
}
