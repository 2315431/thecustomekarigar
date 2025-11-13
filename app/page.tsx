import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import VideoGalleryPreview from '@/components/home/VideoGalleryPreview'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactSection from '@/components/home/ContactSection'

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <VideoGalleryPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}
