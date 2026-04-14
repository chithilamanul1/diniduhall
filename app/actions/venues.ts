'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getVenues() {
  try {
    return await prisma.venue.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.error('Failed to fetch venues:', error)
    return []
  }
}

export async function getAllVenues() {
  try {
    return await prisma.venue.findMany({
      orderBy: { name: 'asc' },
    })
  } catch (error) {
    console.error('Failed to fetch all venues:', error)
    return []
  }
}

export async function createVenue(data: {
  name: string
  description?: string
  capacity: number
  location?: string
  images?: string[]
  amenities?: string[]
}) {
  try {
    const venue = await prisma.venue.create({
      data: {
        ...data,
        images: data.images || [],
        amenities: data.amenities || [],
      },
    })
    revalidatePath('/admin/venues')
    revalidatePath('/booking')
    return { success: true, venue }
  } catch (error) {
    console.error('Failed to create venue:', error)
    return { success: false, error: 'Failed to create venue' }
  }
}

export async function updateVenue(
  id: string,
  data: {
    name?: string
    description?: string
    capacity?: number
    location?: string
    images?: string[]
    amenities?: string[]
    isActive?: boolean
  }
) {
  try {
    const venue = await prisma.venue.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/venues')
    revalidatePath('/booking')
    return { success: true, venue }
  } catch (error) {
    console.error('Failed to update venue:', error)
    return { success: false, error: 'Failed to update venue' }
  }
}

export async function deleteVenue(id: string) {
  try {
    await prisma.venue.delete({
      where: { id },
    })
    revalidatePath('/admin/venues')
    revalidatePath('/booking')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete venue:', error)
    return { success: false, error: 'Failed to delete venue' }
  }
}
