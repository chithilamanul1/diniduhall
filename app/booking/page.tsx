'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, MailIcon, CheckCircleIcon, SendIcon } from 'lucide-react'
import Image from 'next/image'
import { sendBookingInquiry } from '../actions/booking'
import { BookingCalendar } from '@/components/BookingCalendar'

type FormData = {
  fullName: string
  email: string
  phone: string
  eventDate: string
  guestCount: string
  eventType: string
  venue: string
  specialRequirements: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export default function BookingInquiry() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    venue: '',
    specialRequirements: '',
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required'
    if (!formData.guestCount) newErrors.guestCount = 'Guest count is required'
    if (!formData.eventType) newErrors.eventType = 'Event type is required'
    if (!formData.venue) newErrors.venue = 'Venue selection is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Send Email Notification
        const result = await sendBookingInquiry(formData)
        
        if (result.success) {
          setIsSubmitted(true)
          
          // Construct WhatsApp Message
          const message = `Hello Dinidu Gardens! I would like to inquire about a booking:
*Name:* ${formData.fullName}
*Event Date:* ${formData.eventDate}
*Guests:* ${formData.guestCount}
*Event Type:* ${formData.eventType}
*Venue:* ${formData.venue}
*Special Requirements:* ${formData.specialRequirements || 'N/A'}`

          const whatsappUrl = `https://wa.me/94777328155?text=${encodeURIComponent(message)}`
          
          // Open WhatsApp after a short delay so the user sees the success state
          setTimeout(() => {
            window.open(whatsappUrl, '_blank')
          }, 2000)
        } else {
          alert('There was an error sending your inquiry. Please try again.')
        }
      } catch (err) {
        console.error('Submission error:', err)
        alert('An unexpected error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }
  
  if (isSubmitted) {
    return (
      <div className="w-full bg-cream min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="max-w-lg w-full text-center bg-white p-12 rounded-[3rem] shadow-sm border border-neutral-100"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="w-12 h-12 text-gold" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Thank <span className="italic font-light">You</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-8" />
          <p className="font-body text-lg text-neutral-600 mb-10 leading-relaxed">
            Your inquiry has been received. Our team will contact you within 24
            hours to discuss your event details.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                eventDate: '',
                guestCount: '',
                eventType: '',
                venue: '',
                specialRequirements: '',
              })
            }}
            className="bg-gold text-white px-10 py-4 rounded-full font-body font-medium tracking-wide hover:bg-gold/90 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="w-full bg-cream">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (1).webp"
          alt="Book Your Event at Dinidu Gardens"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-sm md:text-base text-white/80 uppercase tracking-[0.3em] mb-6">
              Reservations
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Book Your <span className="italic font-light">Event</span>
            </h1>
            <div className="w-24 h-[2px] bg-gold mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Let's make your celebration unforgettable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Information Sidebar */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-neutral-100 sticky top-32">
                <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
                  Get In Touch
                </span>
                <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-6">
                  Contact <span className="italic font-light">Details</span>
                </h2>
                <div className="w-12 h-[2px] bg-gold mb-10" />

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mr-5 border border-gold/10">
                      <MapPinIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-2">
                        Address
                      </h3>
                      <p className="font-body text-neutral-600 leading-relaxed">
                        24 Kotugoda Rd,
                        <br />
                        Seeduwa 11410, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mr-5 border border-gold/10">
                      <PhoneIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-2">
                        Phone
                      </h3>
                      <p className="font-body text-neutral-600">
                        077 732 8155
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mr-5 border border-gold/10">
                      <MailIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-2">
                        Email
                      </h3>
                      <p className="font-body text-neutral-600">
                        info@dinidugardens.lk
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 aspect-video relative rounded-xl overflow-hidden border border-neutral-200">
                  <Image
                    src="/images/business/sssss.webp"
                    alt="Dinidu Gardens Seeduwa Location"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 border border-neutral-100">
                <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
                  Availability
                </span>
                <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-4">
                  Check <span className="italic font-light">Dates</span>
                </h2>
                <div className="w-16 h-[2px] bg-gold mb-8" />
                <p className="font-body text-neutral-600 mb-10 leading-relaxed">
                  Fill out the form below and our event coordinators will get
                  back to you shortly to discuss your requirements.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all ${errors.fullName ? 'border-red-400' : 'border-neutral-200'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm font-body text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all ${errors.email ? 'border-red-400' : 'border-neutral-200'}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm font-body text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all ${errors.phone ? 'border-red-400' : 'border-neutral-200'}`}
                        placeholder="077 XXX XXXX"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm font-body text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Date & Guest Count */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-full">
                      <label
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-4"
                      >
                        Select Event Date *
                      </label>
                      <BookingCalendar 
                        selectedDate={formData.eventDate}
                        onSelectDate={(date) => {
                          setFormData(prev => ({ ...prev, eventDate: date }))
                          if (errors.eventDate) {
                            setErrors(prev => ({ ...prev, eventDate: undefined }))
                          }
                        }}
                      />
                      {errors.eventDate && (
                        <p className="mt-2 text-sm font-body text-red-500 font-medium">
                          {errors.eventDate}
                        </p>
                      )}
                    </div>

                    <div className="col-span-full md:col-span-1">
                      <label
                        htmlFor="guestCount"
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                      >
                        Guest Count *
                      </label>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all ${errors.guestCount ? 'border-red-400' : 'border-neutral-200'}`}
                        placeholder="Number of guests"
                        min="1"
                      />
                      {errors.guestCount && (
                        <p className="mt-2 text-sm font-body text-red-500">
                          {errors.guestCount}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Type & Venue */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="eventType"
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                      >
                        Event Type *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-neutral-700 ${errors.eventType ? 'border-red-400' : 'border-neutral-200'}`}
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="restaurant">
                          Restaurant Reservation
                        </option>
                        <option value="other">Other</option>
                      </select>
                      {errors.eventType && (
                        <p className="mt-2 text-sm font-body text-red-500">
                          {errors.eventType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="venue"
                        className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                      >
                        Venue *
                      </label>
                      <select
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-cream border rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-neutral-700 ${errors.venue ? 'border-red-400' : 'border-neutral-200'}`}
                      >
                        <option value="">Select venue</option>
                        <option value="banquet">Banquet Hall</option>
                        <option value="restaurant">
                          Road House Restaurant
                        </option>
                      </select>
                      {errors.venue && (
                        <p className="mt-2 text-sm font-body text-red-500">
                          {errors.venue}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label
                      htmlFor="specialRequirements"
                      className="block font-body text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3"
                    >
                      Special Requirements
                    </label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-4 bg-cream border border-neutral-200 rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gold text-white px-8 py-5 rounded-full font-body font-medium tracking-wide text-lg transition-all shadow-md flex items-center justify-center space-x-3 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gold/90'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5" />
                        <span>SUBMIT INQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
