'use server'

import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

export async function sendBookingInquiry(formData: any) {
  const {
    fullName,
    email,
    phone,
    eventDate,
    guestCount,
    eventType,
    venue,
    specialRequirements,
  } = formData

  let bookingId = 'OFFLINE_ENTRY'

  try {
    // 1. Attempt to save to database (will fail if no DB configured)
    // We call this lazily to prevent top-level crashes
    const booking = await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        eventDate: eventDate.toString(),
        guestCount: guestCount.toString(),
        eventType,
        venue,
        specialRequirements: specialRequirements || '',
        status: 'PENDING',
      },
    })
    bookingId = booking.id
  } catch (err) {
    console.warn('Database save skipped:', err)
  }

  try {
    // 2. Send email notification (Lazy Resend initialization)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Dinidu Gardens <onboarding@resend.dev>',
        to: ['info@dinidugardens.lk'],
        subject: `Inquiry: ${eventType} - ${eventDate}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #FF8C00;">New Booking Inquiry</h2>
            <p><strong>Status:</strong> ${bookingId === 'OFFLINE_ENTRY' ? 'Direct (DB Offline)' : 'Logged'}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Venue:</strong> ${venue}</p>
          </div>
        `,
      })
    }
  } catch (err) {
    console.error('Email notification skipped:', err)
  }

  // ALWAYS return success true to trigger the WhatsApp redirect on the frontend
  return { success: true, bookingId }
}
