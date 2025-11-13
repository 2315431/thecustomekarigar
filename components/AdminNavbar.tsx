'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function AdminNavbar() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <nav className="bg-[#6A0F16] text-[#F5E6D3] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin/dashboard" className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="The Custom कारिगर"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
            <span className="ml-4 text-lg font-semibold">Admin Panel</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/videos" className="hover:text-white transition-colors">
              Videos
            </Link>
            <Link href="/admin/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/admin/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/admin/leads" className="hover:text-white transition-colors">
              Leads
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-[#F5E6D3] text-[#6A0F16] rounded-full px-4 py-2 text-sm font-semibold hover:bg-opacity-90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

