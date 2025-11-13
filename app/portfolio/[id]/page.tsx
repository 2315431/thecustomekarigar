import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import PortfolioImageCard from '@/components/PortfolioImageCard'

async function getPortfolioItem(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function PortfolioItemPage({ params }: { params: { id: string } }) {
  const item = await getPortfolioItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#6A0F16] mb-6 font-bold tracking-royal text-center">
            {item.title}
          </h1>
          {item.description && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {item.images && item.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.images.map((imageUrl: string, index: number) => (
              <PortfolioImageCard
                key={index}
                imageUrl={imageUrl}
                title={item.title}
              />
            ))}
          </div>
        )}

        {(!item.images || item.images.length === 0) && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No images available for this project.</p>
          </div>
        )}
      </div>
    </div>
  )
}

