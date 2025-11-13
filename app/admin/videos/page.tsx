import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import VideoManager from '@/components/VideoManager'

async function getVideos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data || []
}

export default async function AdminVideosPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const videos = await getVideos()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-4xl text-[#6A0F16] font-bold">
          Video Management
        </h1>
      </div>

      <VideoManager initialVideos={videos} />
    </div>
  )
}

