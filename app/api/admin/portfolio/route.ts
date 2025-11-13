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
    const { title, description, images } = body

    if (!title || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'Title and at least one image URL are required' },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    
    const { data, error } = await adminSupabase
      .from('portfolio')
      .insert([
        {
          title,
          description: description || null,
          images,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating portfolio item:', error)
      return NextResponse.json(
        { error: 'Failed to create portfolio item' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in portfolio API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

