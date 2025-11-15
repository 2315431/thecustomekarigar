'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  thumbnail: string | null
  video_url: string
  storage_path: string | null
  tags: string[]
  is_public: boolean
  created_at: string
}

interface VideoManagerProps {
  initialVideos: Video[]
}

export default function VideoManager({ initialVideos }: VideoManagerProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    thumbnail: '',
    tags: '',
    is_public: true,
    storage_path: '',
  })
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)

    try {
      const url = editingVideo ? `/api/admin/videos/${editingVideo.id}` : '/api/admin/videos'
      const method = editingVideo ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      })

      if (response.ok) {
        const newVideo = await response.json()
        if (editingVideo) {
          setVideos(videos.map(v => v.id === editingVideo.id ? newVideo : v))
        } else {
          setVideos([newVideo, ...videos])
        }
        setIsModalOpen(false)
        setEditingVideo(null)
        setFormData({
          title: '',
          video_url: '',
          thumbnail: '',
          tags: '',
          is_public: true,
          storage_path: '',
        })
      }
    } catch (error) {
      console.error('Error saving video:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setVideos(videos.filter(v => v.id !== id))
      }
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      video_url: video.video_url,
      thumbnail: video.thumbnail || '',
      tags: video.tags.join(', '),
      is_public: video.is_public,
      storage_path: video.storage_path || '',
    })
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingVideo(null)
            setFormData({
              title: '',
              video_url: '',
              thumbnail: '',
              tags: '',
              is_public: true,
              storage_path: '',
            })
            setIsModalOpen(true)
          }}
          className="bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
        >
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-6 shadow-lg"
          >
            {video.thumbnail && (
              <div className="relative aspect-video mb-4 rounded overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{video.video_url}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs ${video.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {video.is_public ? 'Public' : 'Private'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(video)}
                className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded px-4 py-2 text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(video.id)}
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
              {editingVideo ? 'Edit Video' : 'Add New Video'}
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
                <label className="block text-[#6A0F16] font-semibold mb-2">Video Upload *</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploadingVideo(true)
                    try {
                      const uploadData = new FormData()
                      uploadData.append('file', file)
                      uploadData.append('folder', 'videos')
                      
                      const response = await fetch('/api/admin/upload', {
                        method: 'POST',
                        body: uploadData,
                      })
                      
                      if (response.ok) {
                        const data = await response.json()
                        setFormData((prev) => ({
                          ...prev,
                          video_url: data.url || "",
                          storage_path: data.path || ""
                        }))
                      }
                    } catch (error) {
                      console.error('Upload error:', error)
                    } finally {
                      setUploadingVideo(false)
                    }
                  }}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  disabled={uploadingVideo}
                  required={!editingVideo}
                />
                {uploadingVideo && <p className="text-sm text-gray-600 mt-2">Uploading video...</p>}
                {formData.video_url && <p className="text-sm text-green-600 mt-2">✓ Video uploaded</p>}
              </div>
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Thumbnail Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploadingThumbnail(true)
                    try {
                        const uploadData = new FormData()
                        uploadData.append('file', file)
                        uploadData.append('folder', 'portfolio')

                        const response = await fetch('/api/admin/upload', {
                          method: 'POST',
                          body: uploadData,
                        })

                        if (response.ok) {
                          const data = await response.json()
                          setFormData((prev) => ({
                            ...prev,
                            thumbnail: data.url || ""
                          }))
                        }

                    } catch (error) {
                      console.error('Upload error:', error)
                    } finally {
                      setUploadingThumbnail(false)
                    }
                  }}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  disabled={uploadingThumbnail}
                />
                {uploadingThumbnail && <p className="text-sm text-gray-600 mt-2">Uploading thumbnail...</p>}
                {formData.thumbnail && <p className="text-sm text-green-600 mt-2">✓ Thumbnail uploaded</p>}
              </div>
              <div>
                <label className="block text-[#6A0F16] font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-[#6A0F16] bg-white"
                  placeholder="wedding, invitation, custom"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_public}
                    onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-[#6A0F16] font-semibold">Public</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#6A0F16] text-[#F5E6D3] rounded-full px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
                >
                  {editingVideo ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingVideo(null)
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

