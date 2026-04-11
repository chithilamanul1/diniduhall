'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboardIcon,
  CalendarIcon,
  UsersIcon,
  LogOutIcon,
  MegaphoneIcon,
} from 'lucide-react'

const navItems = [
  { label: 'Bookings', href: '/admin', icon: LayoutDashboardIcon },
  { label: 'Calendar', href: '/admin/events', icon: CalendarIcon },
  { label: 'Subscribers', href: '/admin/subscribers', icon: UsersIcon },
  { label: 'Marketing', href: '/admin/marketing', icon: MegaphoneIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 pt-8">
          <Link href="/">
            <img
              src="/images/dinidu-gardens-logo.png"
              alt="Dinidu Gardens"
              className="w-full h-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 mt-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-body font-medium transition-all ${
                    isActive
                      ? 'bg-gold/10 text-gold'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-xs font-bold text-white uppercase">
              {session?.user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-body font-medium transition-all"
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 bg-neutral-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}
