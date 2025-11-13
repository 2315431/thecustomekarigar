'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
}

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Portfolio items will be available soon.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-16">
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="mb-8">
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-3 font-bold">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-gray-700 text-lg">{item.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {item.images.map((imageUrl, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative aspect-square overflow-hidden rounded-lg border-2 border-[#6A0F16] cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <Image
                    src={imageUrl}
                    alt={`${item.title} - Image ${imgIndex + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Border Pattern Separator */}
            {index < items.length - 1 && (
              <div
                className="w-full h-12 my-8"
                style={{
                  backgroundImage: "url('/assets/border-pattern.png')",
                  backgroundSize: "auto 100%",
                  backgroundRepeat: "repeat-x",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-[#6A0F16] text-[#F5E6D3] rounded-full p-2 hover:bg-opacity-90 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Portfolio image"
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

