'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimonials(onlyFeatured = false) {
  try {
    return await prisma.testimonial.findMany({
      where: onlyFeatured ? { isFeatured: true } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error("Database error in getTestimonials:", error)
    return []
  }
}

export async function createTestimonial(data: {
  author: string
  role?: string
  content: string
  rating?: number
}) {
  try {
    const t = await (prisma.testimonial as any).create({
      data,
    })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, testimonial: t }
  } catch (error) {
    return { success: false, error: 'Failed to create testimonial' }
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    const t = await (prisma.testimonial as any).update({
      where: { id },
      data,
    })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, testimonial: t }
  } catch (error) {
    return { success: false, error: 'Failed to update testimonial' }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await (prisma.testimonial as any).delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete testimonial' }
  }
}

export async function toggleFeaturedTestimonial(id: string, isFeatured: boolean) {
  try {
    await (prisma.testimonial as any).update({
      where: { id },
      data: { isFeatured },
    })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to toggle featured status' }
  }
}
