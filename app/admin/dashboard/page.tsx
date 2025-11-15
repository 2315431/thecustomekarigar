import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

async function getStats() {
  const supabase = await createClient()
  
  const [videosResult, portfolioResult, servicesResult, leadsResult] = await Promise.all([
    supabase.from('videos').select('id', { count: 'exact' }),
    supabase.from('portfolio').select('id', { count: 'exact' }),
    supabase.from('services').select('id', { count: 'exact' }),
    supabase.from('leads').select('id', { count: 'exact' }),
  ])

  return {
    videos: videosResult.count || 0,
    portfolio: portfolioResult.count || 0,
    services: servicesResult.count || 0,
    leads: leadsResult.count || 0,
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Get user session to verify auth
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Debug: log auth state
  if (!user) {
    console.error('Dashboard: No user found. Auth error:', error?.message)
    redirect('/admin/login')
  }

  const stats = await getStats()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-4xl text-[#6A0F16] mb-8 font-bold">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/admin/videos">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2">Videos</h3>
            <p className="text-3xl font-bold text-[#6A0F16]">{stats.videos}</p>
          </div>
        </Link>

        <Link href="/admin/portfolio">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2">Portfolio Items</h3>
            <p className="text-3xl font-bold text-[#6A0F16]">{stats.portfolio}</p>
          </div>
        </Link>

        <Link href="/admin/services">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2">Services</h3>
            <p className="text-3xl font-bold text-[#6A0F16]">{stats.services}</p>
          </div>
        </Link>

        <Link href="/admin/leads">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2">Leads</h3>
            <p className="text-3xl font-bold text-[#6A0F16]">{stats.leads}</p>
          </div>
        </Link>
      </div>

      <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 shadow-lg">
        <h2 className="font-playfair text-2xl text-[#6A0F16] mb-4 font-bold">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/videos"
            className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 text-center font-semibold hover:bg-opacity-90 transition-colors"
          >
            Add New Video
          </Link>
          <Link
            href="/admin/services"
            className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 text-center font-semibold hover:bg-opacity-90 transition-colors"
          >
            Manage Services
          </Link>
        </div>
      </div>
    </div>
  )
}
