import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PortfolioImageCard from '@/components/PortfolioImageCard'

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

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolio()

  // Flatten all images from all portfolio items
  const allImages: Array<{ url: string; title: string; id: string; description?: string }> = []
  portfolioItems.forEach((item) => {
    item.images?.forEach((imageUrl: string) => {
      allImages.push({ 
        url: imageUrl, 
        title: item.title, 
        id: item.id,
        description: item.description 
      })
    })
  })

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Showcasing our finest custom wedding invitation designs. Each piece is a testament 
            to our commitment to creating timeless memories.
          </p>
        </div>

        {allImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {allImages.map((image, index) => (
                <PortfolioImageCard
                  key={`${image.id}-${index}`}
                  imageUrl={image.url}
                  title={image.title}
                />
              ))}
            </div>
            
            {/* Portfolio Items List */}
            <div className="mt-16">
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-8 font-bold text-center">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                  >
                    {item.images && item.images.length > 0 && (
                      <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-playfair text-2xl text-[#6A0F16] mb-3 font-bold">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    <span className="text-[#6A0F16] font-semibold hover:underline">
                      View Project →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🎨</div>
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-4 font-bold">
                Portfolio Coming Soon
              </h2>
              <p className="text-gray-700 text-lg">
                We're working on showcasing our beautiful designs. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
