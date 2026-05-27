'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneIcon, MapPinIcon, MailIcon, SendIcon } from 'lucide-react'
import Image from 'next/image'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill out your Name and Phone number.')
      return
    }

    setIsSubmitting(true)

    // Construct WhatsApp message
    const msgText = `Hello Dinidu Gardens! I would like to get in touch:
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Message:* ${formData.message || 'N/A'}`

    const whatsappUrl = `https://wa.me/94777702044?text=${encodeURIComponent(msgText)}`

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank')
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: '',
    })
  }

  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (1).webp"
          alt="Contact Dinidu Gardens Banquet Hall Seeduwa"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-xs md:text-sm text-gold uppercase tracking-[0.4em] mb-4 block font-semibold">
              Get In Touch
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Contact <span className="italic font-light">Us</span>
            </h1>
            <div className="w-20 h-[2px] bg-gold mb-6" />
            <p className="font-body text-lg md:text-xl text-white/90 max-w-xl mx-auto font-light tracking-wide">
              Let us help you host an unforgettable experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Info Card Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-100 sticky top-32 space-y-8">
              <div>
                <span className="font-body text-xs text-gold uppercase tracking-[0.2em] mb-3 block font-semibold">
                  Details
                </span>
                <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-6">
                  Contact <span className="italic font-light">Information</span>
                </h2>
                <div className="w-12 h-[2px] bg-gold" />
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mr-5 border border-gold/10">
                    <MapPinIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                      Address
                    </h3>
                    <p className="font-body text-neutral-600 leading-relaxed font-light">
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
                    <h3 className="font-body text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                      Phone Hotline
                    </h3>
                    <p className="font-body text-neutral-600 font-light">
                      077 770 2044
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gold/5 rounded-full flex items-center justify-center flex-shrink-0 mr-5 border border-gold/10">
                    <MailIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <p className="font-body text-neutral-600 font-light">
                      info@dinidugardens.lk
                    </p>
                  </div>
                </div>
              </div>

              {/* Map/Image area */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-100 shadow-sm mt-8">
                <Image
                  src="/images/business/sssss.webp"
                  alt="Dinidu Gardens Seeduwa Location Map"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2rem] shadow-sm p-8 md:p-12 border border-neutral-100">
              <span className="font-body text-xs text-gold uppercase tracking-[0.2em] mb-3 block font-semibold">
                Inquiries
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Send A <span className="italic font-light">Message</span>
              </h2>
              <div className="w-16 h-[2px] bg-gold mb-8" />
              <p className="font-body text-neutral-600 mb-10 leading-relaxed font-light">
                Have any questions about venue bookings, services, or menus? Write to us and we'll immediately redirect you to WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-body text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-cream border border-neutral-200 rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-body text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="077 XXX XXXX"
                      className="w-full px-5 py-4 bg-cream border border-neutral-200 rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-light"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-5 py-4 bg-cream border border-neutral-200 rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-light"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-4 bg-cream border border-neutral-200 rounded-xl font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold text-white py-5 rounded-full font-body font-medium tracking-wider text-base hover:bg-gold/90 transition-all shadow-md flex items-center justify-center space-x-3"
                >
                  <SendIcon className="w-5 h-5" />
                  <span>SEND TO WHATSAPP</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}