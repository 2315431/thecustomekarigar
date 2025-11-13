'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="bg-[#6A0F16] text-[#F5E6D3] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="The Custom कारिगर"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="hover:text-white transition-colors font-medium">
                Services
              </Link>
              <Link href="/videos" className="hover:text-white transition-colors font-medium">
                Videos
              </Link>
              <Link href="/portfolio" className="hover:text-white transition-colors font-medium">
                Portfolio
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors font-medium">
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#F5E6D3] focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/" className="block py-2 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="block py-2 hover:text-white transition-colors font-medium">
                Services
              </Link>
              <Link href="/videos" className="block py-2 hover:text-white transition-colors font-medium">
                Videos
              </Link>
              <Link href="/portfolio" className="block py-2 hover:text-white transition-colors font-medium">
                Portfolio
              </Link>
              <Link href="/contact" className="block py-2 hover:text-white transition-colors font-medium">
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* Border Pattern Below Navbar */}
      <div 
        className="w-full h-12 border-pattern-top"
        style={{
          backgroundImage: "url('/assets/border-pattern.png')",
          backgroundSize: "auto 100%",
          backgroundRepeat: "repeat-x",
        }}
      />
    </>
  )
}

