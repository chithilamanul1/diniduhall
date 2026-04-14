'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react'
import { getLockedDates } from '@/app/actions/admin'

interface BookingCalendarProps {
  onSelectDate: (date: string) => void
  selectedDate?: string
  venueId?: string
}

export function BookingCalendar({ onSelectDate, selectedDate, venueId }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [lockedDates, setLockedDates] = useState<{ date: Date; reason: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDates() {
      if (!venueId) return // Don't fetch if no venue selected
      
      try {
        setLoading(true)
        const dates = await getLockedDates(venueId)
        setLockedDates(dates.map(d => ({ ...d, date: new Date(d.date) })))
      } catch (error) {
        console.error('Failed to fetch locked dates:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDates()
  }, [venueId])

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const d = new Date(selectedDate)
    return (
      d.getDate() === day &&
      d.getMonth() === currentMonth.getMonth() &&
      d.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isLocked = (day: number) => {
    return lockedDates.some(ld => 
      ld.date.getDate() === day &&
      ld.date.getMonth() === currentMonth.getMonth() &&
      ld.date.getFullYear() === currentMonth.getFullYear()
    )
  }

  const getLockReason = (day: number) => {
    const lock = lockedDates.find(ld => 
      ld.date.getDate() === day &&
      ld.date.getMonth() === currentMonth.getMonth() &&
      ld.date.getFullYear() === currentMonth.getFullYear()
    )
    return lock?.reason || 'Booked'
  }

  const renderDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const startDay = startDayOfMonth(currentMonth)

    // Fill initial empty slots
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 md:h-14" />)
    }

    // Fill days
    for (let day = 1; day <= totalDays; day++) {
      const locked = isLocked(day)
      const selected = isSelected(day)
      const today = isToday(day)
      const past = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < new Date(new Date().setHours(0,0,0,0))
      
      days.push(
        <motion.button
          key={day}
          whileHover={!locked && !past ? { scale: 1.1 } : {}}
          whileTap={!locked && !past ? { scale: 0.95 } : {}}
          disabled={locked || past}
          onClick={() => {
            const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            onSelectDate(d.toISOString().split('T')[0])
          }}
          className={`relative h-12 md:h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group ${
            selected 
              ? 'bg-gold text-white shadow-lg shadow-gold/30' 
              : locked || past
              ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed opacity-60'
              : 'hover:bg-gold/10 text-neutral-700'
          }`}
        >
          <span className={`text-sm md:text-base font-body font-medium ${selected ? 'text-white' : ''}`}>
            {day}
          </span>
          {today && !selected && (
            <div className="absolute bottom-2 w-1 h-1 bg-gold rounded-full" />
          )}
          {locked && (
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[10px] px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-10">
              {getLockReason(day)}
            </div>
          )}
          {locked && <div className="absolute inset-0 bg-red-400/5 rounded-2xl border-2 border-dashed border-red-200" />}
        </motion.button>
      )
    }

    return days
  }

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-gold/5 border border-neutral-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-heading text-xl text-neutral-900">
            {monthNames[currentMonth.getMonth()]} <span className="font-light italic text-neutral-500">{currentMonth.getFullYear()}</span>
          </h3>
          <p className="font-body text-xs text-neutral-400 uppercase tracking-widest mt-1">Select your preferred date</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-3 hover:bg-neutral-50 rounded-xl transition-colors border border-neutral-100"
          >
            <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-3 hover:bg-neutral-50 rounded-xl transition-colors border border-neutral-100"
          >
            <ChevronRightIcon className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-body text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="contents"
          >
            {renderDays()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-4 text-xs font-body tracking-wider uppercase text-neutral-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gold rounded-full mr-2" />
          Selected
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-neutral-100 border border-neutral-200 rounded-full mr-2" />
          Available
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-full mr-2" />
          Unavailable
        </div>
      </div>
    </div>
  )
}
