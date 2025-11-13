'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-20">
      {/* Border Pattern Above */}
      <div 
        className="absolute top-0 left-0 w-full h-16"
        style={{
          backgroundImage: "url('/assets/border-pattern.png')",
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Centered Logo */}
      <div className="mb-12 mt-20">
        <Image
          src="/assets/logo.png"
          alt="The Custom कारिगर"
          width={400}
          height={133}
          className="h-24 md:h-32 w-auto mx-auto"
          priority
        />
      </div>

      {/* Hero Video Preview */}
      <div className="relative w-full max-w-5xl mb-12 rounded-lg overflow-hidden shadow-2xl border-4 border-[#6A0F16]">
        {!isPlaying ? (
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: "url('/assets/bg-texture.jpg')",
              }}
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 bg-[#6A0F16] text-[#F5E6D3] rounded-full p-8 hover:bg-opacity-90 transition-all transform hover:scale-110 shadow-2xl"
              aria-label="Play video"
            >
              <svg
                className="w-20 h-20"
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
      <h1 className="font-playfair text-5xl md:text-7xl text-[#6A0F16] text-center mb-6 font-bold tracking-royal">
        Custom-Made Wedding Invitations
      </h1>
      
      {/* Subtext */}
      <p className="text-xl md:text-2xl text-gray-700 text-center mb-12 font-light max-w-2xl mx-auto">
        Designed with love, crafted with devotion.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 mb-20">
        <Link
          href="/portfolio"
          className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          View Portfolio
        </Link>
        <Link
          href="/contact"
          className="bg-[#F5E6D3] text-[#6A0F16] border-3 border-[#6A0F16] rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Book Consultation
        </Link>
      </div>

      {/* Border Pattern Below */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16"
        style={{
          backgroundImage: "url('/assets/border-pattern.png')",
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
        }}
      />
    </section>
  )
}

