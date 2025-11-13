import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, video_url, thumbnail, tags, is_public } = body

    if (!title || !video_url) {
      return NextResponse.json(
        { error: 'Title and video URL are required' },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    
    const { data, error } = await adminSupabase
      .from('videos')
      .insert([
        {
          title,
          video_url,
          thumbnail: thumbnail || null,
          tags: tags || [],
          is_public: is_public !== false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating video:', error)
      return NextResponse.json(
        { error: 'Failed to create video' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in videos API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

