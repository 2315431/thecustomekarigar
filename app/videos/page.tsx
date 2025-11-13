import { createClient } from '@/lib/supabase/server'
import VideoThumbnail from '@/components/VideoThumbnail'

async function getVideos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data || []
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Video Gallery
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of custom wedding invitation videos. Each video is uniquely 
            designed to tell your love story with elegance and style.
          </p>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoThumbnail key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🎬</div>
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-4 font-bold">
                Videos Coming Soon
              </h2>
              <p className="text-gray-700 text-lg">
                We're working on creating beautiful video invitations for you. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
