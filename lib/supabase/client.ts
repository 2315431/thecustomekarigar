'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

