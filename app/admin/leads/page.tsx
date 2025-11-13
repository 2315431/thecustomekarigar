import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LeadsTable from '@/components/LeadsTable'

async function getLeads() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data || []
}

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const leads = await getLeads()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-4xl text-[#6A0F16] mb-8 font-bold">
        Contact Leads
      </h1>

      <LeadsTable leads={leads} />
    </div>
  )
}

