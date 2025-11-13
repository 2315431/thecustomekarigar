import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Let's create something beautiful together for your special day
          </p>
        </div>

        <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 md:p-12 shadow-2xl">
          <ContactForm />
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-[#F5E6D3] border-3 border-[#6A0F16] rounded-xl p-8 shadow-xl">
          <h3 className="font-playfair text-2xl text-[#6A0F16] mb-4 font-semibold text-center">
            Visit Us
          </h3>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Map placeholder - Add your location</p>
          </div>
        </div>
      </div>
    </section>
  )
}

