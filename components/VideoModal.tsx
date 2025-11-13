'use client'

import { useEffect } from 'react'

interface VideoModalProps {
  videoUrl: string
  title: string
  onClose: () => void
}

export default function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')
  let embedUrl = videoUrl

  if (isYouTube) {
    // Convert YouTube URL to embed format
    const youtubeId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    if (youtubeId) {
      embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#6A0F16] text-[#F5E6D3] rounded-full p-2 hover:bg-opacity-90 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="aspect-video">
          {isYouTube || videoUrl.includes('embed') ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="p-4 bg-[#F5E6D3]">
          <h3 className="font-playfair text-xl text-[#6A0F16]">{title}</h3>
        </div>
      </div>
    </div>
  )
}

