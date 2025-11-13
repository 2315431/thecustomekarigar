import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The Custom कारिगर - Custom Wedding Invitations',
  description: 'Designed with love, crafted with devotion. Custom-made wedding invitations.',
  keywords: 'wedding invitations, custom invitations, Indian wedding, wedding cards, e-invites',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-texture">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

