'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// ==================== CATEGORY ACTIONS ====================

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { items: true },
  })
}

export async function createCategory(name: string) {
  const category = await prisma.category.create({
    data: { name },
  })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
  return category
}

export async function updateCategory(id: string, data: { name?: string; order?: number }) {
  const category = await prisma.category.update({
    where: { id },
    data,
  })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
  return category
}

export async function deleteCategory(id: string) {
  // Check if category has items first
  const itemsCount = await prisma.menuItem.count({ where: { categoryId: id } })
  if (itemsCount > 0) {
    throw new Error('Cannot delete category with items')
  }

  await prisma.category.delete({ where: { id } })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
}

// ==================== MENU ITEM ACTIONS ====================

export async function createMenuItem(data: {
  name: string
  description?: string
  price: string
  tag?: string
  categoryId: string
}) {
  const item = await prisma.menuItem.create({
    data,
  })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
  return item
}

export async function updateMenuItem(id: string, data: any) {
  const item = await prisma.menuItem.update({
    where: { id },
    data,
  })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
  return item
}

export async function deleteMenuItem(id: string) {
  await prisma.menuItem.delete({ where: { id } })
  revalidatePath('/admin/menu')
  revalidatePath('/restaurant')
}
