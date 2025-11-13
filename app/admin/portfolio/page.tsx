import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PortfolioManager from '@/components/PortfolioManager'

async function getPortfolio() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching portfolio:', error)
    return []
  }

  return data || []
}

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const portfolioItems = await getPortfolio()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-4xl text-[#6A0F16] mb-8 font-bold">
        Portfolio Management
      </h1>

      <PortfolioManager initialItems={portfolioItems} />
    </div>
  )
}

