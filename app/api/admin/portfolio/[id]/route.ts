import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const adminSupabase = createAdminClient()
    
    const { data, error } = await adminSupabase
      .from('portfolio')
      .update({
        title,
        description: description || null,
        images: images || [],
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating portfolio item:', error)
      return NextResponse.json(
        { error: 'Failed to update portfolio item' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in portfolio API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminSupabase = createAdminClient()
    
    const { error } = await adminSupabase
      .from('portfolio')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting portfolio item:', error)
      return NextResponse.json(
        { error: 'Failed to delete portfolio item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in portfolio API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

