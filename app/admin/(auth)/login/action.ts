"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase env vars for login action. Set SUPABASE_URL and SUPABASE_ANON_KEY or NEXT_PUBLIC equivalents.')
  }

  // Use SSR client for login so it handles cookies properly
  const cookieStore = await cookies();
  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Respect production flag for secure cookies
            const isProd = process.env.NODE_ENV === "production";
            cookieStore.set(name, value, {
              ...options,
              httpOnly: true,
              secure: isProd,
              sameSite: "lax",
            })
          })
        },
      },
    }
  );

  // Use Supabase's signInWithPassword which will automatically set cookies via the SSR client
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Debug: log successful login
  if (process.env.NODE_ENV === 'development') {
    console.log('[Login Action] Successful login for user:', email)
    console.log('[Login Action] Session set, user ID:', data.user?.id)
  }

  return { success: true };
}
