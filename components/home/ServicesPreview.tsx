import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BorderDivider from '@/components/BorderDivider'

async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(6)

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data || []
}

const serviceIcons: Record<string, string> = {
  'Custom Invitation Videos': '🎬',
  'Printed Wedding Cards': '💌',
  'E-Invites': '📱',
  'Save The Date': '📅',
  'Couple Monograms': '💑',
  'Wedding Logos': '🎨',
}

export default async function ServicesPreview() {
  const services = await getServices()

  return (
    <section className="w-full py-20 px-4 bg-[#F5E6D3] bg-opacity-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Comprehensive wedding invitation solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#F5E6D3] border-3 border-[#6A0F16] rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="text-6xl mb-4 text-center">{serviceIcons[service.name] || '✨'}</div>
              <h3 className="font-playfair text-2xl text-[#6A0F16] mb-3 font-semibold text-center">
                {service.name}
              </h3>
              {service.description && (
                <p className="text-gray-700 mb-4 text-center leading-relaxed">
                  {service.description}
                </p>
              )}
              {service.price_min && service.price_max && (
                <p className="text-[#6A0F16] font-bold text-center text-lg">
                  ₹{service.price_min.toLocaleString()} - ₹{service.price_max.toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-block bg-[#6A0F16] text-[#F5E6D3] rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            View All Services
          </Link>
        </div>
      </div>

      <BorderDivider />
    </section>
  )
}

