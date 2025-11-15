'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing Supabase env vars for browser client. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return document.cookie.split(';').map(cookie => {
            const [name, ...rest] = cookie.trim().split('=')
            return { 
              name, 
              value: rest.length > 0 ? decodeURIComponent(rest.join('=')) : '' 
            }
          }).filter(cookie => cookie.name && cookie.value)
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOptions: string[] = []
            
            // Always set path to root
            cookieOptions.push(`path=${options?.path || '/'}`)
            
            if (options?.maxAge) {
              cookieOptions.push(`max-age=${options.maxAge}`)
            } else if (options?.expires) {
              cookieOptions.push(`expires=${options.expires}`)
            }
            
            if (options?.domain) {
              cookieOptions.push(`domain=${options.domain}`)
            }
            
            // SameSite is critical for cross-site requests
            if (options?.sameSite) {
              cookieOptions.push(`samesite=${options.sameSite}`)
            } else {
              cookieOptions.push('samesite=lax')
            }
            
            if (options?.secure) {
              cookieOptions.push('secure')
            }
            
            const cookieString = `${name}=${encodeURIComponent(value)}; ${cookieOptions.join('; ')}`
            document.cookie = cookieString
            
            // Debug log for auth cookies
            if (name.includes('auth') || name.startsWith('sb-')) {
              console.log('Setting auth cookie:', name, 'with options:', cookieOptions)
            }
          })
        },
      },
    }
  )
}

