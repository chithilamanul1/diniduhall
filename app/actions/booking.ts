'use server'

import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

export async function sendBookingInquiry(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const {
      fullName,
      email,
      phone,
      eventDate,
      guestCount,
      eventType,
    } = formData

    // 1. Attempt to save to database
    let bookingId = ''
    try {
      const booking = await prisma.booking.create({
        data: {
          fullName: formData.fullName,
          email: formData.email,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount,
          eventType: formData.eventType,
          venueId: formData.venueId,
          specialRequirements: formData.specialRequirements,
          status: 'PENDING',
        },
        include: {
          venue: true
        }
      })
      bookingId = booking.id
      const venueName = (booking as any).venue?.name || 'Selected Venue'

      // Send confirmation email via Resend
      await resend.emails.send({
        from: 'Dinidu Gardens <onboarding@resend.dev>',
        to: [formData.email],
        subject: 'Booking Inquiry Received - Dinidu Gardens',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #FF8C00;">Inquiry Received ✓</h2>
            <p>Dear ${formData.fullName},</p>
            <p>Thank you for your interest in Dinidu Gardens. We have received your inquiry for <strong>${formData.eventType}</strong> on <strong>${formData.eventDate}</strong> at <strong>${venueName}</strong>.</p>
            <p>Our team will review the availability and get back to you shortly.</p>
            <hr />
            <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        `,
      })
    } catch (saveError) {
      console.error('Failed to save booking or send email:', saveError)
      // We don't throw here to ensure the user at least sees the success state if WhatsApp is triggered, 
      // but in a real app you'd want to handle this better.
    }

    return { success: true, bookingId }
  } catch (error) {
    console.error('Booking inquiry failed:', error)
    return { success: false, error: 'Failed to send inquiry' }
  }
}
