import { JourneyTimeline } from '@/components/pages/about-us/2-Journey/JourneyTimeline'

export default function Journey() {
  return (
    <section className="w-full">
      <div className="py-16 max-lg:pt-3.5 max-lg:pb-6">
        <h1 className="text-xl-medium text-primary-900 mb-6 max-lg:text-xl max-lg:leading-6.5 max-lg:font-bold">
          Perjalanan Kami
        </h1>
        <p className="text-l-regular text-primary-900">
          Muslim101 merupakan digital platform, marketplace, e-commerce, dan
          ekosistem muamalah muslim yang berbasis web dan mobile apps yang
          saling terintegrasi. Salah satu layanannya adalah marketplace Umroh,
          Haji, dan Halal Trip, yang menjembatani pilihan paket perjalanan dari
          berbagai mitra travel tepercaya dengan para calon jamaah yang tersebar
          di seluruh Indonesia.
        </p>

        <JourneyTimeline />
      </div>
    </section>
  )
}
