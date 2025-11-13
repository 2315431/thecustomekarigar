import { createClient } from '@/lib/supabase/server'
import AdminNavbar from '@/components/AdminNavbar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen">
      {user && <AdminNavbar />}
      <div
        className="min-h-screen"
        style={{
          backgroundImage: "url('/assets/bg-texture.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        {children}
      </div>
    </div>
  )
}

