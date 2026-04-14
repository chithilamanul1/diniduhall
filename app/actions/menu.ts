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
    // Fallback data for production stability when DB is unreachable
    return [
      {
        id: 'fallback-1',
        name: 'Signature Feasts',
        order: 0,
        items: [
          {
            id: 'f-item-1',
            name: 'Royal Chicken Buriyani',
            description: 'Long-grain basmati, aromatic spice blend, tender chicken, serving with Malay pickle.',
            price: 'LKR 2,400',
            tag: 'Signature',
            isAvailable: true,
          },
          {
            id: 'f-item-2',
            name: 'Grand Cashew Curry',
            description: 'Creamy tropical cashew curry with rich coconut milk and traditional Sri Lankan spices.',
            price: 'LKR 1,800',
            tag: 'Popular',
            isAvailable: true,
          }
        ]
      },
      {
        id: 'fallback-2',
        name: 'Gourmet Platters',
        order: 1,
        items: [
          {
            id: 'f-item-3',
            name: 'Mixed Grill Platter',
            description: 'A selection of premium devilled meats, grilled to perfection with signature BBQ glaze.',
            price: 'LKR 3,800',
            tag: 'Premium',
            isAvailable: true,
          }
        ]
      }
    ]
  }
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
