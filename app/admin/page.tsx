'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  TrashIcon,
  UsersIcon,
  TrendingUpIcon,
  CalendarIcon,
  MailIcon,
} from 'lucide-react'
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
} from '@/app/actions/admin'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [filter])

  async function loadData() {
    setLoading(true)
    const [bookingData, statsData] = await Promise.all([
      getBookings(filter === 'ALL' ? undefined : filter),
      getDashboardStats(),
    ])
    setBookings(bookingData)
    setStats(statsData)
    setLoading(false)
  }

  async function handleStatusChange(id: string, status: string) {
    setActionLoading(id)
    await updateBookingStatus(id, status)
    await loadData()
    setActionLoading(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return
    setActionLoading(id)
    await deleteBooking(id)
    await loadData()
    setActionLoading(null)
  }

  const statCards = stats
    ? [
        {
          label: 'Pending',
          value: stats.pendingBookings,
          icon: ClockIcon,
          color: 'text-orange-500',
          bg: 'bg-orange-50',
        },
        {
          label: 'Confirmed',
          value: stats.approvedBookings,
          icon: CheckCircle2Icon,
          color: 'text-green-500',
          bg: 'bg-green-50',
        },
        {
          label: 'Total Bookings',
          value: stats.totalBookings,
          icon: CalendarDaysIcon,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
        },
        {
          label: 'Subscribers',
          value: stats.totalSubscribers,
          icon: MailIcon,
          color: 'text-purple-500',
          bg: 'bg-purple-50',
        },
      ]
    : []

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
          Booking <span className="italic font-light">Management</span>
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Manage your banquet hall inquiries and venue availability.
        </p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center space-x-4"
            >
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-body text-neutral-500 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-heading font-bold text-neutral-900">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'LOCKED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${
              filter === f
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-100 font-body text-xs text-neutral-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Event Date</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Guests</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 font-body">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">
                        {booking.fullName}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {booking.email}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {booking.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {booking.eventDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {booking.eventType}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {booking.guestCount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                        {booking.venue}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'PENDING'
                            ? 'bg-orange-100 text-orange-700'
                            : booking.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'LOCKED'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {booking.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, 'APPROVED')
                              }
                              disabled={actionLoading === booking.id}
                              className="p-2 hover:bg-green-50 rounded-full text-green-600 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2Icon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, 'REJECTED')
                              }
                              disabled={actionLoading === booking.id}
                              className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                              title="Reject"
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {booking.status === 'APPROVED' && (
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, 'LOCKED')
                            }
                            disabled={actionLoading === booking.id}
                            className="p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors"
                            title="Lock Date"
                          >
                            <CalendarIcon className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          disabled={actionLoading === booking.id}
                          className="p-2 hover:bg-red-50 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-20 text-center text-neutral-400"
                  >
                    <ClockIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p>No inquiries found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special Requirements Preview */}
      {bookings.filter((b) => b.specialRequirements).length > 0 && (
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">
          <h3 className="text-lg font-heading text-neutral-900 mb-4">
            Special Requirements
          </h3>
          <div className="space-y-3">
            {bookings
              .filter((b) => b.specialRequirements)
              .slice(0, 5)
              .map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100"
                >
                  <p className="text-sm font-medium text-neutral-700">
                    {b.fullName}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {b.specialRequirements}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
