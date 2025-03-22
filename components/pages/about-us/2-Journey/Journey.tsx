import { JourneyTimeline } from '@/components/pages/about-us/2-Journey/JourneyTimeline'

export default function Journey() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-xl-medium text-primary-900 mb-6">
          Perjalanan Kami
        </h1>
        <p className="text-l-regular text-primary-900 mb-12">
          Muslim101 merupakan digital platform, marketplace, e-commerce, dan
          ekosistem muamalah muslim yang berbasis web dan mobile apps yang
          saling terintegrasi. Salah satu layanannya adalah marketplace Umroh,
          Haji, dan Halal Trip, yang menjembatani pilihan paket perjalanan dari
          berbagai mitra travel tepercaya dengan para calon jamaah yang tersebar
          di seluruh Indonesia.
        </p>

        <JourneyTimeline />
      </div>
    </div>
  )
}
