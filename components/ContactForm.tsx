'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    event_date: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          phone: '',
          event_date: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-[#6A0F16] font-semibold mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-[#6A0F16] font-semibold mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="event_date" className="block text-[#6A0F16] font-semibold mb-2">
          Event Date
        </label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[#6A0F16] font-semibold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16] focus:outline-none focus:ring-2 focus:ring-[#6A0F16] bg-white text-gray-900 resize-none"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-100 border-2 border-green-500 text-green-800 rounded-lg p-4">
          Thank you! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border-2 border-red-500 text-red-800 rounded-lg p-4">
          Something went wrong. Please try again later.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#6A0F16] text-[#F5E6D3] rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? 'Submitting...' : 'Send Message'}
      </button>
    </form>
  )
}
