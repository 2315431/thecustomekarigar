'use client'

import { useState, useEffect } from 'react'
import BorderDivider from '@/components/BorderDivider'

const testimonials = [
  {
    name: 'Priya & Raj',
    quote: 'The Custom कारिगर created the most beautiful invitations for our wedding. Every detail was perfect, and our guests were amazed!',
    rating: 5,
  },
  {
    name: 'Anjali & Vikram',
    quote: 'Working with them was a dream. They understood our vision and brought it to life beyond our expectations.',
    rating: 5,
  },
  {
    name: 'Meera & Arjun',
    quote: 'The attention to detail and quality is unmatched. Our wedding invitations were absolutely stunning!',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative bg-[#F5E6D3] border-3 border-[#6A0F16] rounded-2xl p-12 shadow-2xl min-h-[300px]">
          <div className="text-center">
            <div className="mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <span key={i} className="text-3xl text-yellow-500">⭐</span>
              ))}
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="font-playfair text-xl text-[#6A0F16] font-semibold">
              — {testimonials[currentIndex].name}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#6A0F16] w-8'
                    : 'bg-[#6A0F16] bg-opacity-30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <BorderDivider />
    </section>
  )
}

