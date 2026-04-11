'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Please try again.')
      } else {
        router.push('/admin')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="text-center">
          <Image
            src="/images/dinidu-gardens-logo.png"
            alt="Dinidu Gardens"
            width={120}
            height={120}
            className="mx-auto h-24 w-auto brightness-0 invert"
          />
          <h2 className="mt-8 text-3xl font-heading text-white tracking-widest uppercase">
            Admin <span className="italic font-light">Login</span>
          </h2>
          <p className="mt-2 text-sm font-body text-neutral-400">
            Secure access for Dinidu Gardens Management
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 text-white placeholder-neutral-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-5 py-4 border border-white/10 bg-white/5 text-white placeholder-neutral-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-body font-semibold rounded-full text-white bg-gold hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-all shadow-lg shadow-gold/20 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Authenticating...' : 'SIGN IN'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-900 text-neutral-500 font-body">Or continue with</span>
            </div>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/admin' })}
            className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-4 border border-white/10 rounded-full text-sm font-body font-medium text-white bg-white/5 hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.36-2.08 4.48-1.28 1.28-3.28 2.32-6.52 2.32-5.12 0-9.28-4.16-9.28-9.28s4.16-9.28 9.28-9.28c2.8 0 4.96.96 6.52 2.4l2.32-2.32C18.6 1.12 15.68 0 12.48 0 5.6 0 0 5.6 0 12.48s5.6 12.48 12.48 12.48c3.52 0 6.52-1.2 8.72-3.4 2.24-2.24 3.12-5.4 3.12-8.08 0-.56-.04-1.12-.12-1.64h-11.72z"
              />
            </svg>
            Google Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
