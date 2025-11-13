import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import VideoThumbnail from '@/components/VideoThumbnail'
import BorderDivider from '@/components/BorderDivider'

async function getLatestVideos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data || []
}

export default async function VideoGalleryPreview() {
  const videos = await getLatestVideos()

  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Video Gallery
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our collection of custom wedding invitation videos
          </p>
        </div>

        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {videos.map((video) => (
                <VideoThumbnail key={video.id} video={video} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/videos"
                className="inline-block bg-[#6A0F16] text-[#F5E6D3] rounded-full px-10 py-4 text-lg font-semibold shadow-xl hover:bg-opacity-90 transition-all transform hover:scale-105"
              >
                View All Videos
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Videos coming soon...</p>
          </div>
        )}
      </div>

      <BorderDivider />
    </section>
  )
}

