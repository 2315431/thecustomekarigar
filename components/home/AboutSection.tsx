import BorderDivider from '@/components/BorderDivider'

export default function AboutSection() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[#6A0F16] mb-6 font-bold tracking-royal">
            About The Custom कारिगर
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We are passionate artisans dedicated to creating bespoke wedding invitations that tell your unique love story. 
            Every design is handcrafted with meticulous attention to detail, blending traditional Indian aesthetics with 
            modern elegance to create timeless keepsakes for your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="font-playfair text-2xl text-[#6A0F16] mb-3 font-semibold">
              Custom Designs
            </h3>
            <p className="text-gray-700">
              Every invitation is uniquely designed to reflect your personal style and wedding theme.
            </p>
          </div>

          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-playfair text-2xl text-[#6A0F16] mb-3 font-semibold">
              Premium Quality
            </h3>
            <p className="text-gray-700">
              We use only the finest materials and printing techniques to ensure lasting beauty.
            </p>
          </div>

          <div className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="font-playfair text-2xl text-[#6A0F16] mb-3 font-semibold">
              Personal Touch
            </h3>
            <p className="text-gray-700">
              Your vision, our expertise. We work closely with you to bring your dreams to life.
            </p>
          </div>
        </div>
      </div>

      <BorderDivider />
    </section>
  )
}

