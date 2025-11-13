import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Let's create something beautiful together for your special day. 
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 md:p-12 shadow-2xl">
            <h2 className="font-playfair text-3xl text-[#6A0F16] mb-8 font-bold">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 shadow-2xl">
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-6 font-bold">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
                    📧 Email
                  </h3>
                  <a href="mailto:info@thecustomkarigar.com" className="text-gray-700 hover:text-[#6A0F16] transition-colors">
                    info@thecustomkarigar.com
                  </a>
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
                    📱 Phone
                  </h3>
                  <a href="tel:+911234567890" className="text-gray-700 hover:text-[#6A0F16] transition-colors">
                    +91 123 456 7890
                  </a>
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-[#6A0F16] mb-2 font-semibold">
                    🕒 Business Hours
                  </h3>
                  <p className="text-gray-700">
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#F5E6D3] border-4 border-[#6A0F16] rounded-2xl p-8 shadow-2xl">
              <h2 className="font-playfair text-3xl text-[#6A0F16] mb-6 font-bold">
                Visit Us
              </h2>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center border-2 border-[#6A0F16]">
                <div className="text-center">
                  <div className="text-5xl mb-4">📍</div>
                  <p className="text-gray-600 font-semibold">Map Placeholder</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Add your business location here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
