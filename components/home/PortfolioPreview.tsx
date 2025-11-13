import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PortfolioImageCard from '@/components/PortfolioImageCard'
import BorderDivider from '@/components/BorderDivider'

async function getLatestPortfolio() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching portfolio:', error)
    return []
  }

  return data || []
}

export default async function PortfolioPreview() {
  const portfolioItems = await getLatestPortfolio()

  // Flatten all images from all portfolio items
  const allImages: Array<{ url: string; title: string; id: string }> = []
  portfolioItems.forEach((item) => {
    item.images?.forEach((imageUrl: string) => {
      allImages.push({ url: imageUrl, title: item.title, id: item.id })
    })
  })

  const displayImages = allImages.slice(0, 6)

  return (
    <section className="w-full py-20 px-4 bg-[#F5E6D3] bg-opacity-30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Showcasing our finest custom wedding invitation designs
          </p>
        </div>

        {displayImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayImages.map((image, index) => (
                <PortfolioImageCard
                  key={`${image.id}-${index}`}
                  imageUrl={image.url}
                  title={image.title}
                />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/portfolio"
                className="inline-block bg-[#6A0F16] text-[#F5E6D3] rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
              >
                View Full Portfolio
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Portfolio items coming soon...</p>
          </div>
        )}
      </div>

      <BorderDivider />
    </section>
  )
}

