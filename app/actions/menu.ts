'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// ==================== CATEGORY ACTIONS ====================

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: { items: true },
    })
  } catch (error) {
    console.error('Database connection failed, using fallback data:', error)
    // Fallback data for production stability when DB is unreachable is empty to prevent displaying unavailable dishes
    return []
  }
}

export async function createCategory(name: string) {
  try {
    const category = await (prisma.category as any).create({
      data: { name },
    })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true, category }
  } catch (error) {
    console.error('Failed to create category:', error)
    return { success: false, error: 'Failed to create category' }
  }
}

export async function updateCategory(id: string, data: { name?: string; order?: number }) {
  try {
    const category = await (prisma.category as any).update({
      where: { id },
      data,
    })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true, category }
  } catch (error) {
    return { success: false, error: 'Failed to update category' }
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if category has items first
    const itemsCount = await (prisma.menuItem as any).count({ where: { categoryId: id } })
    if (itemsCount > 0) {
      return { success: false, error: 'Cannot delete category with items' }
    }

    await (prisma.category as any).delete({ where: { id } })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete category' }
  }
}

// ==================== MENU ITEM ACTIONS ====================

export async function createMenuItem(data: {
  name: string
  description?: string
  price: string
  tag?: string
  categoryId: string
}) {
  try {
    const item = await (prisma.menuItem as any).create({
      data,
    })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true, item }
  } catch (error) {
    return { success: false, error: 'Failed to create item' }
  }
}

export async function updateMenuItem(id: string, data: any) {
  try {
    const item = await (prisma.menuItem as any).update({
      where: { id },
      data,
    })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true, item }
  } catch (error) {
    return { success: false, error: 'Failed to update item' }
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await (prisma.menuItem as any).delete({ where: { id } })
    revalidatePath('/admin/menu')
    revalidatePath('/restaurant')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete item' }
  }
}
