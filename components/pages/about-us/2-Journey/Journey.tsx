import { JourneyTimeline } from '@/components/pages/about-us/2-Journey/JourneyTimeline'

export default function Journey() {
  return (
    <section className="w-full">
      <div className="container mx-auto max-lg:px-4">
        <div className="py-16 max-lg:pt-3.5 max-lg:pb-6">
          <h1 className="text-primary-900 mb-[12px] text-[60px] max-lg:text-xl max-lg:leading-6.5 max-lg:font-medium">
            Perjalanan Kami
          </h1>
          <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
            Muslim101 merupakan digital platform, marketplace, e-commerce, dan
            ekosistem muamalah Muslim yang berbasis web dan mobile apps yang
            saling terintegrasi. Salah satu layanan Muslim101 adalah fitur
            Umroh, Haji, dan Muslim Trip, yang menjembatani pilihan paket
            perjalanan dari berbagai mitra travel tepercaya dengan para calon
            jemaah yang tersebar di seluruh Indonesia.
          </p>
          <br></br>

          <p className="text-primary-900 lg:text-l-regular text-sm sm:text-base">
            Layaknya rumah bertumbuh, bukan hanya terbatas pada ekosistem bisnis
            Umroh dan Haji, melainkan juga akan memfasilitasi kebutuhan
            transaksi keuangan syariah, market yang halal, serta aktivitas
            Muslim lainnya yang jauh lebih luas.
          </p>
          <JourneyTimeline />
        </div>
      </div>
    </section>
  )
}
