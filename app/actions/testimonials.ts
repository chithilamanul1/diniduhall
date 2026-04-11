'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getTestimonials(onlyFeatured = false) {
  return prisma.testimonial.findMany({
    where: onlyFeatured ? { isFeatured: true } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function createTestimonial(data: {
  author: string
  role?: string
  content: string
  rating?: number
}) {
  const t = await prisma.testimonial.create({
    data,
  })
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return t
}

export async function updateTestimonial(id: string, data: any) {
  const t = await prisma.testimonial.update({
    where: { id },
    data,
  })
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return t
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

export async function toggleFeaturedTestimonial(id: string, isFeatured: boolean) {
  await prisma.testimonial.update({
    where: { id },
    data: { isFeatured },
  })
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}
