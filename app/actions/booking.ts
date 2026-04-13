'use server'

import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    console.warn('Database save skipped (Production DB likely not configured):', err)
    // We continue so the WhatsApp/Email flow still works
  }

  try {
    // 2. Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Dinidu Gardens <onboarding@resend.dev>',
      to: ['info@dinidugardens.lk'],
      subject: `New Booking Inquiry: ${eventType} - ${eventDate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF8C00; text-align: center;">New Booking Inquiry</h2>
          <hr />
          <p><strong>Status:</strong> ${bookingId === 'OFFLINE_ENTRY' ? 'Direct Submission (DB Offline)' : 'Logged in Database'}</p>
          <p><strong>Customer Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event Date:</strong> ${eventDate}</p>
          <p><strong>Guest Count:</strong> ${guestCount}</p>
          <p><strong>Event Type:</strong> ${eventType}</p>
          <p><strong>Venue Requested:</strong> ${venue}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Special Requirements:</strong></p>
            <p>${specialRequirements || 'None provided'}</p>
          </div>
        </div>
      `,
    })

    if (error) console.error('Error sending email:', error)

    return { success: true, bookingId }
  } catch (err: any) {
    console.error('Final action error:', err)
    // Even if email fails, we return success so the frontend redirects to WhatsApp
    return { success: true, bookingId: 'WA_ONLY' }
  }
}
