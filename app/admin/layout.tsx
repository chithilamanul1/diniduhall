'use client'

import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboardIcon,
  CalendarIcon,
  UsersIcon,
  LogOutIcon,
  MegaphoneIcon,
  Building2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
  ShieldCheckIcon,
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Persist collapse state
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    if (saved) setIsCollapsed(saved === 'true')
  }, [])

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('admin-sidebar-collapsed', String(newState))
  }

  const userRole = (session?.user as any)?.role || 'ADMIN'
  const isSuperAdmin = userRole === 'SUPER_ADMIN'

  const navItems = [
    { label: 'Bookings', href: '/admin', icon: LayoutDashboardIcon },
    { label: 'Halls', href: '/admin/venues', icon: Building2Icon },
    { label: 'Calendar', href: '/admin/events', icon: CalendarIcon },
    { label: 'Subscribers', href: '/admin/subscribers', icon: UsersIcon },
    { label: 'Marketing', href: '/admin/marketing', icon: MegaphoneIcon },
    ...(isSuperAdmin ? [{ label: 'Staff', href: '/admin/staff', icon: ShieldCheckIcon }] : []),
  ]

  if (status === 'loading' || !mounted) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-neutral-900 p-4 flex items-center justify-between sticky top-0 z-50 border-b border-white/10 shadow-lg">
        <Link href="/admin">
          <img src="/images/dinidu-gardens-logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-white bg-white/5 rounded-xl border border-white/10"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-neutral-900 z-[70] flex flex-col lg:hidden border-r border-white/10"
            >
               <SidebarContent 
                  navItems={navItems} 
                  pathname={pathname} 
                  session={session} 
                  isCollapsed={false}
                  onClose={() => setIsMobileMenuOpen(false)}
               />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 88 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex bg-neutral-900 text-white flex-col fixed h-full z-20 border-r border-white/10 overflow-hidden"
      >
        <SidebarContent 
          navItems={navItems} 
          pathname={pathname} 
          session={session} 
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
      </motion.aside>

      {/* Main Content Padding/Margin */}
      <motion.main
        animate={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (isCollapsed ? 88 : 256) : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 overflow-x-hidden"
      >
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

function SidebarContent({ navItems, pathname, session, isCollapsed, toggleCollapse, onClose }: any) {
  return (
    <>
      {/* Sidebar Header */}
      <div className={`p-6 pt-8 mb-4 relative ${isCollapsed ? 'flex justify-center' : ''}`}>
        <Link href="/" className="block">
          {isCollapsed ? (
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center font-heading text-xl font-bold italic rotate-[-10deg]">D</div>
          ) : (
            <img
              src="/images/dinidu-gardens-logo.png"
              alt="Dinidu Gardens"
              className="w-full h-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          )}
        </Link>
        
        {toggleCollapse && (
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-10 bg-gold text-white p-1.5 rounded-full border-4 border-neutral-900 hover:scale-110 transition-transform shadow-xl"
          >
            {isCollapsed ? <ChevronRightIcon className="w-3.5 h-3.5" /> : <ChevronLeftIcon className="w-3.5 h-3.5" />}
          </button>
        )}

        {onClose && (
           <button 
            onClick={onClose}
            className="absolute right-4 top-8 p-2 text-neutral-400 hover:text-white"
           >
             <XIcon className="w-6 h-6" />
           </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navItems.map((item: any) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center group relative ${isCollapsed ? 'justify-center' : 'space-x-4 px-5'} py-4 rounded-2xl font-body font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gold/10 text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                {!isCollapsed && <span className="text-sm tracking-wide">{item.label}</span>}
                
                {/* Collapsed Tooltip */}
                {isCollapsed && !onClose && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-50 border border-white/5">
                    {item.label}
                  </div>
                )}

                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className={`absolute left-0 w-1 bg-gold rounded-full ${isCollapsed ? 'h-5' : 'h-6'}`}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer / Account */}
      <div className={`p-4 mt-auto border-t border-white/10 bg-neutral-900/50 backdrop-blur-md`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} p-2 mb-4`}>
          <div className="w-10 h-10 min-w-[2.5rem] rounded-2xl bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-gold/20">
            {session?.user?.name?.charAt(0) || 'A'}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-white truncate leading-none">
                {session?.user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-neutral-500 truncate mt-1.5 uppercase tracking-wider font-bold">
                {(session?.user as any)?.role || 'STAFF'}
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={`flex items-center group ${isCollapsed ? 'justify-center' : 'space-x-4 px-5'} w-full py-4 rounded-2xl text-red-500 hover:bg-red-500/10 font-body font-bold text-xs uppercase tracking-widest transition-all`}
        >
          <LogOutIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  )
}
