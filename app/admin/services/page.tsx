import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ServiceManager from '@/components/ServiceManager'

async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data || []
}

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const services = await getServices()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-playfair text-4xl text-[#6A0F16] mb-8 font-bold">
        Service Management
      </h1>

      <ServiceManager initialServices={services} />
    </div>
  )
}

