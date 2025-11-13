'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PortfolioImageCardProps {
  imageUrl: string
  title: string
}

export default function PortfolioImageCard({ imageUrl, title }: PortfolioImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg border-3 border-[#6A0F16] shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-playfair text-white text-lg font-semibold">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-[#6A0F16] text-[#F5E6D3] rounded-full p-3 hover:bg-opacity-90 transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={imageUrl}
              alt={title}
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

