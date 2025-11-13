'use client'

import { useState } from 'react'

interface Service {
  id: string
  name: string
  description: string | null
  price_min: number | null
  price_max: number | null
  created_at: string
}

interface ServiceManagerProps {
  initialServices: Service[]
}

export default function ServiceManager({ initialServices }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_min: '',
    price_max: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services'
      const method = editingService ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          price_min: formData.price_min ? parseInt(formData.price_min) : null,
          price_max: formData.price_max ? parseInt(formData.price_max) : null,
        }),
      })

      if (response.ok) {
        const newService = await response.json()
        if (editingService) {
          setServices(services.map(s => s.id === editingService.id ? newService : s))
        } else {
          setServices([newService, ...services])
        }
        setIsModalOpen(false)
        setEditingService(null)
        setFormData({
          name: '',
          description: '',
          price_min: '',
          price_max: '',
        })
      }
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setServices(services.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || '',
      price_min: service.price_min?.toString() || '',
      price_max: service.price_max?.toString() || '',
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingService(null)
            setFormData({
              name: '',
              description: '',
              price_min: '',
              price_max: '',
            })
            setIsModalOpen(true)
          }}
          className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg"
          >
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
              {service.name}
            </h3>
            {service.description && (
              <p className="text-gray-700 mb-4">{service.description}</p>
            )}
            {service.price_min && service.price_max && (
              <p className="text-[#6A0F16] font-semibold mb-4">
                ₹{service.price_min.toLocaleString()} - ₹{service.price_max.toLocaleString()}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded px-4 py-2 text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="flex-1 bg-red-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-playfair text-2xl text-[#6A0F16] mb-6 font-bold">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                />
              </div>
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6A0F16] font-semibold mb-2">Min Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price_min}
                    onChange={(e) => setFormData({ ...formData, price_min: e.target.value })}
                    className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[#6A0F16] font-semibold mb-2">Max Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price_max}
                    onChange={(e) => setFormData({ ...formData, price_max: e.target.value })}
                    className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingService(null)
                  }}
                  className="flex-1 bg-gray-400 text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

