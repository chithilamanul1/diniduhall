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

  try {
    // 1. Save to database first
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

    // 2. Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Dinidu Gardens <onboarding@resend.dev>', // Replace with your verified domain once ready
      to: ['info@dinidugardens.lk'],
      subject: `New Booking Inquiry: ${eventType} - ${eventDate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF8C00; text-align: center;">New Booking Inquiry</h2>
          <hr />
          <p><strong>Booking ID:</strong> ${booking.id}</p>
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
          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
            This inquiry was automatically logged and sent from the Dinidu Gardens Website.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      // We don't return an error here because the DB save was successful
    }

    return { success: true, bookingId: booking.id }
  } catch (err: any) {
    console.error('Unexpected error:', err)
    return { success: false, error: err.message }
  }
}
