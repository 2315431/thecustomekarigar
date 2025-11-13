'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BorderWrapper from './BorderWrapper'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <BorderWrapper>
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16"
        style={{
          backgroundImage: "url('/assets/bg-texture.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/assets/logo.png"
            alt="The Custom कारिगर"
            width={300}
            height={100}
            className="h-20 w-auto"
            priority
          />
        </div>

        {/* Hero Video Placeholder */}
        <div className="relative w-full max-w-4xl mb-12 rounded-lg overflow-hidden shadow-2xl">
          {!isPlaying ? (
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: "url('/assets/bg-texture.jpg')",
                }}
              />
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 bg-[#6A0F16] text-[#F5E6D3] rounded-full p-6 hover:bg-opacity-90 transition-all transform hover:scale-110 shadow-lg"
                aria-label="Play video"
              >
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Wedding Invitation Preview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-4xl md:text-6xl text-[#6A0F16] text-center mb-4 font-bold">
          Custom-Made Wedding Invitations
        </h1>
        
        {/* Subtext */}
        <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 font-light">
          Designed with love, crafted with devotion.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/portfolio"
            className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            View Designs
          </Link>
          <Link
            href="/contact"
            className="bg-[#F5E6D3] text-[#6A0F16] border-2 border-[#6A0F16] rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </BorderWrapper>
  )
}

