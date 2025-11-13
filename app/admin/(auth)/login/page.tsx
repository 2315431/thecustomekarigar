'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('Sign in error:', signInError)
        setError(signInError.message || 'Invalid email or password')
        setIsLoading(false)
        return
      }

      if (!data.user) {
        setError('Login failed. Please try again.')
        setIsLoading(false)
        return
      }

      // Wait a moment for cookies to be properly set by Supabase
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Verify session is established
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        setError('Failed to establish session. Please try again.')
        setIsLoading(false)
        return
      }

      if (session) {
        console.log('Session established:', {
          user: session.user?.email,
          expiresAt: session.expires_at,
        })
        
        // Verify cookies are set
        const hasAuthCookie = document.cookie.includes('sb-') || document.cookie.includes('supabase')
        console.log('Has auth cookie:', hasAuthCookie)
        
        // Wait for cookies to be fully persisted
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Verify session again after delay
        const { data: { session: verifySession } } = await supabase.auth.getSession()
        if (!verifySession) {
          console.error('Session lost after delay')
          setError('Session not persisted. Please try again.')
          setIsLoading(false)
          return
        }
        
        // Use router.push with refresh to ensure server sees the session
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        console.error('No session after login')
        setError('Session not established. Please check your browser cookies settings or try again.')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/assets/bg-texture.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="The Custom कारिगर"
            width={200}
            height={67}
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="font-playfair text-3xl text-[#6A0F16] font-bold">
            Admin Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 shadow-lg"
          style={{
            backgroundImage: "url('/assets/bg-texture.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        >
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-800 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#6A0F16] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#6A0F16] font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6A0F16] text-[#F5E6D3] rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

