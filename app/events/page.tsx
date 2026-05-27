'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  CalendarIcon,
  LockIcon,
} from 'lucide-react'
import Image from 'next/image'
import { getEvents, getLockedDates } from '@/app/actions/admin'

type DBEvent = {
  id: string
  title: string
  date: Date
  description: string | null
  isLocked: boolean
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<DBEvent | null>(null)
  const [events, setEvents] = useState<DBEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const data = await getEvents()
    setEvents(data as DBEvent[])
    setLoading(false)
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsForDate = (day: number): DBEvent[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      )
    })
  }

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day)
    const hasEvents = dayEvents.length > 0
    const isLocked = dayEvents.some((e) => e.isLocked)

    calendarDays.push(
      <motion.div
        key={day}
        whileHover={hasEvents ? { scale: 1.05 } : {}}
        className={`aspect-square border border-neutral-100 p-2 flex flex-col rounded-xl transition-all ${
          isLocked
            ? 'cursor-pointer bg-blue-50 border-blue-200 hover:shadow-lg'
            : hasEvents
            ? 'cursor-pointer bg-white hover:shadow-lg'
            : 'bg-cream/50'
        }`}
        onClick={() => hasEvents && setSelectedEvent(dayEvents[0])}
      >
        <span className="font-body font-medium text-sm text-neutral-900 mb-1">
          {day}
        </span>
        {dayEvents.length > 0 && (
          <div className="flex flex-col gap-1">
            {dayEvents.map((event, idx) => (
              <div
                key={idx}
                className={`w-full h-1.5 rounded-full ${
                  event.isLocked ? 'bg-blue-500' : 'bg-gold'
                }`}
              />
            ))}
          </div>
        )}
        {isLocked && (
          <LockIcon className="w-3 h-3 text-blue-500 mt-auto self-end" />
        )}
      </motion.div>,
    )
  }

  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/business/unnamed (33).webp"
          alt="Events at Dinidu Gardens Seeduwa"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-sm md:text-base text-white/80 uppercase tracking-[0.3em] mb-6">
              Plan Ahead
            </span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6">
              Events <span className="italic font-light">Calendar</span>
            </h1>
            <div className="w-24 h-[2px] bg-gold mb-8" />
            <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Discover upcoming celebrations and special events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gold rounded-full mr-3" />
              <span className="font-body text-sm font-medium text-neutral-700 tracking-wide uppercase">
                Available Events
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
              <span className="font-body text-sm font-medium text-neutral-700 tracking-wide uppercase">
                Locked / Fully Booked
              </span>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 p-8 md:p-12 mb-16"
          >
            <div className="flex items-center justify-between mb-10">
              <button
                onClick={previousMonth}
                className="p-3 hover:bg-cream rounded-full transition-colors border border-transparent hover:border-neutral-200"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="w-6 h-6 text-neutral-700" />
              </button>
              <h2 className="font-heading text-4xl font-bold text-neutral-900">
                {monthNames[month]}{' '}
                <span className="italic font-light">{year}</span>
              </h2>
              <button
                onClick={nextMonth}
                className="p-3 hover:bg-cream rounded-full transition-colors border border-transparent hover:border-neutral-200"
                aria-label="Next month"
              >
                <ChevronRightIcon className="w-6 h-6 text-neutral-700" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center font-body font-medium text-xs uppercase tracking-widest text-neutral-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {calendarDays}
              </div>
            )}
          </motion.div>

          {/* Upcoming Events List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="font-body text-sm text-gold uppercase tracking-[0.2em] mb-4 block">
              Schedule
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-neutral-900 mb-6 leading-tight text-center">
              Upcoming <span className="italic font-light">Events</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-12" />

            <div className="space-y-6 w-full max-w-4xl">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => {
                  const eventDate = new Date(event.date)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all cursor-pointer group ${
                        event.isLocked
                          ? 'bg-blue-50/50 border-blue-200'
                          : 'bg-white border-neutral-100'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <CalendarIcon className="w-5 h-5 mr-3 text-gold" />
                            <span className="font-body text-sm font-medium text-neutral-500 tracking-wide uppercase">
                              {eventDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <h4 className="font-heading text-2xl font-bold text-neutral-900 mb-2 group-hover:text-gold transition-colors">
                            {event.title}
                          </h4>
                          {event.description && (
                            <p className="font-body text-neutral-600 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {event.isLocked && (
                            <span className="px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wide uppercase bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1">
                              <LockIcon className="w-3 h-3" />
                              Fully Booked
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="py-20 text-center text-neutral-400 font-body">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
                  <p>No upcoming events scheduled.</p>
                  <p className="text-sm mt-2">Check back soon for updates!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-2 hover:bg-cream rounded-full transition-colors"
                aria-label="Close modal"
              >
                <XIcon className="w-6 h-6 text-neutral-400" />
              </button>

              <div className="w-16 h-[2px] mb-8 bg-gold" />

              <h3 className="font-heading text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                {selectedEvent.title}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-4 text-gold" />
                  <span className="font-body text-neutral-700">
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {selectedEvent.isLocked && (
                  <div className="flex items-center">
                    <LockIcon className="w-5 h-5 mr-4 text-blue-600" />
                    <span className="font-body text-blue-700 font-medium">
                      This date is fully booked
                    </span>
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <p className="font-body text-lg text-neutral-600 mb-8 leading-relaxed">
                  {selectedEvent.description}
                </p>
              )}

              <div className="px-6 py-4 rounded-2xl border bg-gold/5 border-gold/20">
                <p className="font-body text-sm font-medium text-neutral-800 uppercase tracking-wide">
                  Venue: Dinidu Gardens
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
