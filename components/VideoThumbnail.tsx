'use client'

import { useState } from 'react'
import Image from 'next/image'
import VideoModal from '@/components/VideoModal'

interface Video {
  id: string
  title: string
  thumbnail: string | null
  video_url: string
  tags?: string[]
}

interface VideoThumbnailProps {
  video: Video
}

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg border-4 border-[#6A0F16] shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Border Pattern Frame */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            backgroundImage: "url('/assets/border-pattern.png')",
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top, bottom",
            maskImage: "linear-gradient(to bottom, transparent 5%, black 10%, black 90%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 5%, black 10%, black 90%, transparent 95%)",
          }}
        />
        
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-900">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center opacity-50"
              style={{
                backgroundImage: "url('/assets/bg-texture.jpg')",
              }}
            />
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
            <div className="bg-[#6A0F16] text-[#F5E6D3] rounded-full p-6 group-hover:scale-110 transition-transform shadow-2xl">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6">
          <h3 className="font-playfair text-white text-xl font-semibold">
            {video.title}
          </h3>
        </div>
      </div>

      {isModalOpen && (
        <VideoModal
          videoUrl={video.video_url}
          title={video.title}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

