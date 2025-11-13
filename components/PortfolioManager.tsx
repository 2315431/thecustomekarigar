'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  images: string[]
  created_at: string
}

interface PortfolioManagerProps {
  initialItems: PortfolioItem[]
}

export default function PortfolioManager({ initialItems }: PortfolioManagerProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '',
  })
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const imagesArray = formData.images
      .split(',')
      .map(url => url.trim())
      .filter(Boolean)

    try {
      const url = editingItem ? `/api/admin/portfolio/${editingItem.id}` : '/api/admin/portfolio'
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          images: imagesArray,
        }),
      })

      if (response.ok) {
        const newItem = await response.json()
        if (editingItem) {
          setItems(items.map(i => i.id === editingItem.id ? newItem : i))
        } else {
          setItems([newItem, ...items])
        }
        setIsModalOpen(false)
        setEditingItem(null)
        setFormData({
          title: '',
          description: '',
          images: '',
        })
        setUploadedImages([])
      }
    } catch (error) {
      console.error('Error saving portfolio item:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return

    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setItems(items.filter(i => i.id !== id))
      }
    } catch (error) {
      console.error('Error deleting portfolio item:', error)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      images: item.images.join(', '),
    })
    setUploadedImages(item.images)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingItem(null)
            setFormData({
              title: '',
              description: '',
              images: '',
            })
            setUploadedImages([])
            setIsModalOpen(true)
          }}
          className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
        >
          Add New Portfolio Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg"
          >
            {item.images.length > 0 && (
              <div className="relative aspect-square mb-4 rounded overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-700 mb-4 text-sm line-clamp-2">{item.description}</p>
            )}
            <p className="text-sm text-gray-600 mb-4">{item.images.length} image(s)</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded px-4 py-2 text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
              {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Images *</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length === 0) return
                    setUploadingImages(true)
                    try {
                      const uploadPromises = files.map(async (file) => {
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('folder', 'portfolio')
                        const response = await fetch('/api/admin/upload', {
                          method: 'POST',
                          body: formData,
                        })
                        if (response.ok) {
                          const data = await response.json()
                          return data.url
                        }
                        return null
                      })
                      const urls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]
                      setUploadedImages([...uploadedImages, ...urls])
                      setFormData({ ...formData, images: [...uploadedImages, ...urls].join(', ') })
                    } catch (error) {
                      console.error('Upload error:', error)
                    } finally {
                      setUploadingImages(false)
                    }
                  }}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white mb-2"
                  disabled={uploadingImages}
                />
                {uploadingImages && <p className="text-sm text-gray-600 mt-2">Uploading images...</p>}
                <div className="text-sm text-gray-600 mb-2 mt-4">OR</div>
                <textarea
                  value={formData.images}
                  onChange={(e) => {
                    setFormData({ ...formData, images: e.target.value })
                    setUploadedImages(e.target.value.split(',').map(url => url.trim()).filter(Boolean))
                  }}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  rows={4}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
                <p className="text-sm text-gray-600 mt-1">Enter image URLs separated by commas, or upload files above</p>
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded overflow-hidden border-2 border-[#6A0F16]">
                        <Image src={url} alt={`Uploaded ${index + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = uploadedImages.filter((_, i) => i !== index)
                            setUploadedImages(newImages)
                            setFormData({ ...formData, images: newImages.join(', ') })
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingItem(null)
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

