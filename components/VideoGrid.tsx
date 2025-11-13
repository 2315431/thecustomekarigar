'use client'

import { useState } from 'react'
import Image from 'next/image'
import VideoModal from './VideoModal'

interface Video {
  id: string
  title: string
  thumbnail: string | null
  video_url: string
  tags?: string[]
}

interface VideoGridProps {
  videos: Video[]
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Videos will be available soon.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-[#6A0F16] shadow-lg hover:shadow-xl transition-all"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Border Pattern Frame */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
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
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
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
                <div className="bg-[#6A0F16] text-[#F5E6D3] rounded-full p-4 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="font-playfair text-white text-lg font-semibold">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.video_url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}

