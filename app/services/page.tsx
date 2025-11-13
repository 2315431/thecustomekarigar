import { createClient } from '@/lib/supabase/server'
import BorderDivider from '@/components/BorderDivider'

async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })

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

const defaultServices = [
  {
    name: 'Custom Invitation Videos',
    description: 'Stunning animated video invitations that capture your love story. Perfect for sharing digitally with family and friends worldwide.',
    price_min: 5000,
    price_max: 50000,
    icon: '🎬',
  },
  {
    name: 'Printed Wedding Cards',
    description: 'Elegant printed invitations on premium paper with gold foil, embossing, and custom designs. Available in various sizes and finishes.',
    price_min: 50,
    price_max: 500,
    icon: '💌',
  },
  {
    name: 'E-Invites',
    description: 'Beautiful digital invitations that can be shared via WhatsApp, email, or social media. Interactive and eco-friendly.',
    price_min: 2000,
    price_max: 15000,
    icon: '📱',
  },
  {
    name: 'Save The Date',
    description: 'Charming save-the-date cards to announce your wedding date. Available in both digital and printed formats.',
    price_min: 30,
    price_max: 200,
    icon: '📅',
  },
  {
    name: 'Couple Monograms',
    description: 'Custom monogram designs featuring your initials, perfect for invitations, stationery, and wedding decor.',
    price_min: 1500,
    price_max: 10000,
    icon: '💑',
  },
  {
    name: 'Wedding Logos',
    description: 'Unique wedding logo designs that represent your special day. Use across all your wedding materials.',
    price_min: 3000,
    price_max: 20000,
    icon: '🎨',
  },
]

export default async function ServicesPage() {
  const services = await getServices()
  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Our Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Premium wedding invitation services tailored to your vision. From digital animations to 
            luxurious printed cards, we create timeless memories for your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayServices.map((service, index) => (
            <div
              key={service.id || index}
              className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="text-7xl mb-6 text-center">
                {serviceIcons[service.name] || service.icon || '✨'}
              </div>
              <h3 className="font-playfair text-3xl text-[#6A0F16] mb-4 font-bold text-center">
                {service.name}
              </h3>
              {service.description && (
                <p className="text-gray-700 mb-6 text-center leading-relaxed">
                  {service.description}
                </p>
              )}
              {(service.price_min || service.price_min === 0) && (service.price_max || service.price_max === 0) && (
                <div className="text-center">
                  <p className="text-[#6A0F16] font-bold text-2xl mb-2">
                    ₹{service.price_min.toLocaleString()} - ₹{service.price_max.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">per {service.name.includes('Cards') || service.name.includes('Date') ? 'card' : 'project'}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-12 shadow-2xl">
          <h2 className="font-playfair text-4xl text-[#6A0F16] mb-8 font-bold text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-playfair text-xl text-[#6A0F16] mb-3 font-semibold">
                Custom Designs
              </h3>
              <p className="text-gray-700">
                Every design is uniquely crafted to reflect your personal style and wedding theme.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="font-playfair text-xl text-[#6A0F16] mb-3 font-semibold">
                Fast Turnaround
              </h3>
              <p className="text-gray-700">
                Quick delivery without compromising on quality. We understand your timeline.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="font-playfair text-xl text-[#6A0F16] mb-3 font-semibold">
                Premium Quality
              </h3>
              <p className="text-gray-700">
                Only the finest materials and printing techniques for lasting beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
