'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ==================== BOOKING ACTIONS ====================

export async function getBookings(status?: string, venueId?: string) {
  try {
    return await (prisma.booking as any).findMany({
      where: {
        ...(status && { status }),
        ...(venueId && { venueId }),
      },
      include: {
        venue: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.warn('Failed to fetch bookings with venue:', error)
    // Fallback if Venue table/relation doesn't exist yet
    try {
      return await (prisma.booking as any).findMany({
        where: status ? { status } : undefined,
        orderBy: { createdAt: 'desc' },
      })
    } catch (innerError) {
      console.error('Critical failure in getBookings:', innerError)
      return []
    }
  }
}

export async function getBookingById(id: string) {
  try {
    return await (prisma.booking as any).findUnique({ where: { id } })
  } catch (error) {
    return null
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const booking = await (prisma.booking as any).update({
      where: { id },
      data: { status },
    })

    // Send status email to customer
    if (status === 'APPROVED') {
      try {
        await resend.emails.send({
          from: 'Dinidu Gardens <onboarding@resend.dev>',
          to: [booking.email],
          subject: `Booking Confirmed - ${booking.eventType} at Dinidu Gardens`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF8C00; text-align: center;">Booking Confirmed ✓</h2>
              <hr />
              <p>Dear <strong>${booking.fullName}</strong>,</p>
              <p>We are delighted to confirm your booking at Dinidu Gardens.</p>
              <p><strong>Event Date:</strong> ${booking.eventDate}</p>
              <p><strong>Event Type:</strong> ${booking.eventType}</p>
              <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
              <p style="margin-top: 20px;">Our team will be in touch shortly with further details. Thank you for choosing Dinidu Gardens.</p>
              <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
                Dinidu Gardens, Seeduwa, Sri Lanka
              </p>
            </div>
          `,
        })
      } catch (e) {
        console.error('Failed to send confirmation email:', e)
      }
    }

    return { success: true, booking }
  } catch (error) {
    console.error('Failed to update booking status:', error)
    return { success: false, error: 'Failed to update status' }
  }
}

export async function deleteBooking(id: string) {
  try {
    await (prisma.booking as any).delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete' }
  }
}

// ==================== EVENT ACTIONS ====================

export async function getEvents() {
  try {
    return await (prisma.event as any).findMany({
      include: {
        venue: true,
      },
      orderBy: { date: 'asc' },
    })
  } catch (error) {
    console.warn('Failed to fetch events with venue association:', error)
    try {
      return await (prisma.event as any).findMany({
        orderBy: { date: 'asc' },
      })
    } catch (innerError) {
      return []
    }
  }
}

export async function createEvent(data: {
  title: string
  date: string
  description?: string
  venueId?: string
}) {
  try {
    return await (prisma.event as any).create({
      data: {
        title: data.title,
        date: new Date(data.date),
        description: data.description || '',
        venueId: data.venueId || null,
        isLocked: true, // Default to locked when manually created in calendar
      },
    })
  } catch (error) {
    console.error('Failed to create event:', error)
    // Fallback if venueId is the cause of failure
    try {
       return await (prisma.event as any).create({
        data: {
          title: data.title,
          date: new Date(data.date),
          description: data.description || '',
          isLocked: true,
        },
      })
    } catch (innerError) {
      throw innerError
    }
  }
}

export async function updateEvent(
  id: string,
  data: { title?: string; date?: string; description?: string; isLocked?: boolean }
) {
  try {
    return await (prisma.event as any).update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isLocked !== undefined && { isLocked: data.isLocked }),
      },
    })
  } catch (error) {
    console.error('Failed to update event:', error)
    return { success: false }
  }
}

export async function deleteEvent(id: string) {
  try {
    await (prisma.event as any).delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function lockEventDate(id: string) {
  try {
    return await (prisma.event as any).update({
      where: { id },
      data: { isLocked: true },
    })
  } catch (error) {
    return { success: false }
  }
}

export async function getLockedDates(venueId?: string) {
  try {
    const [lockedEvents, confirmedBookings] = await Promise.all([
      (prisma.event as any).findMany({
        where: { 
          isLocked: true,
          ...(venueId && { venueId }),
        },
        select: { date: true, title: true, venueId: true },
      }),
      (prisma.booking as any).findMany({
        where: {
          status: { in: ['APPROVED', 'LOCKED'] },
          ...(venueId && { venueId }),
        },
        select: { eventDate: true, eventType: true, venueId: true },
      }),
    ])

    // Normalize all to a format the calendar can consume
    const lockedDates = [
      ...lockedEvents.map((e: any) => ({
        date: e.date,
        reason: e.title,
      })),
      ...confirmedBookings.map((b: any) => ({
        date: new Date(b.eventDate),
        reason: b.eventType,
      })),
    ]

    return lockedDates
  } catch (error) {
    console.warn('Failed to fetch locked dates with full criteria:', error)
    try {
      // Simplest fallback
      const lockedEvents = await (prisma.event as any).findMany({
        where: { isLocked: true },
        select: { date: true, title: true }
      })
      return lockedEvents.map((e: any) => ({ date: e.date, reason: e.title }))
    } catch (innerError) {
      return []
    }
  }
}

// ==================== SUBSCRIBER ACTIONS ====================

export async function getSubscribers() {
  try {
    return await (prisma.subscriber as any).findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    return []
  }
}

export async function addSubscriber(email: string) {
  try {
    return await (prisma.subscriber as any).create({
      data: { email },
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { error: 'Email already subscribed' }
    }
    return { error: 'Failed' }
  }
}

export async function removeSubscriber(id: string) {
  try {
    await (prisma.subscriber as any).delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

// ==================== MARKETING ACTIONS ====================

export async function sendBroadcast(subject: string, htmlContent: string) {
  try {
    const subscribers = await (prisma.subscriber as any).findMany()

    if (subscribers.length === 0) {
      return { success: false, error: 'No subscribers found' }
    }

    const emails = subscribers.map((s: any) => s.email)

    const { data, error } = await resend.emails.send({
      from: 'Dinidu Gardens <onboarding@resend.dev>',
      to: emails,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
          ${htmlContent}
          <hr style="margin-top: 40px;" />
          <p style="font-size: 11px; color: #999; text-align: center;">
            You received this email because you subscribed to Dinidu Gardens updates.
          </p>
        </div>
      `,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, sentTo: emails.length }
  } catch (e: any) {
    console.error('Broadcast failed:', e)
    return { success: false, error: e.message }
  }
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  try {
    const [totalBookings, pendingBookings, approvedBookings, totalSubscribers, upcomingEvents] =
      await Promise.all([
        (prisma.booking as any).count(),
        (prisma.booking as any).count({ where: { status: 'PENDING' } }),
        (prisma.booking as any).count({ where: { status: 'APPROVED' } }),
        (prisma.subscriber as any).count(),
        (prisma.event as any).count({ where: { date: { gte: new Date() } } }),
      ])

    return {
      totalBookings,
      pendingBookings,
      approvedBookings,
      totalSubscribers,
      upcomingEvents,
    }
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return {
      totalBookings: 0,
      pendingBookings: 0,
      approvedBookings: 0,
      totalSubscribers: 0,
      upcomingEvents: 0,
    }
  }
}
