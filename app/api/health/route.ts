import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const testimonialCount = await prisma.testimonial.count()
    return NextResponse.json({ 
      status: 'healthy', 
      database: 'connected', 
      testimonials: testimonialCount,
      environment: process.env.NODE_ENV
    })
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'degraded', 
      error: error.message,
      environment: process.env.NODE_ENV
    }, { status: 500 })
  }
}
