'use server'

import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ==================== BOOKING ACTIONS ====================

export async function getBookings(status?: string) {
  return prisma.booking.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({ where: { id } })
}

export async function updateBookingStatus(id: string, status: string) {
  const booking = await prisma.booking.update({
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
            <p><strong>Venue:</strong> ${booking.venue}</p>
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

  return booking
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({ where: { id } })
}

// ==================== EVENT ACTIONS ====================

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { date: 'asc' },
  })
}

export async function createEvent(data: {
  title: string
  date: string
  description?: string
}) {
  return prisma.event.create({
    data: {
      title: data.title,
      date: new Date(data.date),
      description: data.description || '',
    },
  })
}

export async function updateEvent(
  id: string,
  data: { title?: string; date?: string; description?: string; isLocked?: boolean }
) {
  return prisma.event.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.date && { date: new Date(data.date) }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.isLocked !== undefined && { isLocked: data.isLocked }),
    },
  })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } })
}

export async function lockEventDate(id: string) {
  return prisma.event.update({
    where: { id },
    data: { isLocked: true },
  })
}

export async function getLockedDates() {
  const [lockedEvents, confirmedBookings] = await Promise.all([
    prisma.event.findMany({
      where: { isLocked: true },
      select: { date: true, title: true },
    }),
    prisma.booking.findMany({
      where: {
        status: { in: ['APPROVED', 'LOCKED'] },
      },
      select: { eventDate: true, eventType: true },
    }),
  ])

  // Normalize all to a format the calendar can consume
  const lockedDates = [
    ...lockedEvents.map((e) => ({
      date: e.date,
      reason: e.title,
    })),
    ...confirmedBookings.map((b) => ({
      date: new Date(b.eventDate),
      reason: b.eventType,
    })),
  ]

  return lockedDates
}

// ==================== SUBSCRIBER ACTIONS ====================

export async function getSubscribers() {
  return prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function addSubscriber(email: string) {
  try {
    return await prisma.subscriber.create({
      data: { email },
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { error: 'Email already subscribed' }
    }
    throw e
  }
}

export async function removeSubscriber(id: string) {
  return prisma.subscriber.delete({ where: { id } })
}

// ==================== MARKETING ACTIONS ====================

export async function sendBroadcast(subject: string, htmlContent: string) {
  const subscribers = await prisma.subscriber.findMany()

  if (subscribers.length === 0) {
    return { success: false, error: 'No subscribers found' }
  }

  const emails = subscribers.map((s) => s.email)

  try {
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
    return { success: false, error: e.message }
  }
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  const [totalBookings, pendingBookings, approvedBookings, totalSubscribers, upcomingEvents] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'APPROVED' } }),
      prisma.subscriber.count(),
      prisma.event.count({ where: { date: { gte: new Date() } } }),
    ])

  return {
    totalBookings,
    pendingBookings,
    approvedBookings,
    totalSubscribers,
    upcomingEvents,
  }
}
