import { StarIconPrimaryGradient } from '@/components/icons/star'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { memo } from 'react'
interface CardTestimoniProps {
  id: number
  name: string
  image: string
  rating?: number
  quote: React.ReactNode
}

export const CardTestimoni = memo(function CardTestimoni({
  name,
  image,
  quote,
}: CardTestimoniProps) {
  return (
    <Card className="gap-2 overflow-hidden rounded-xl border border-neutral-200 py-0 shadow-sm">
      <div className="h-40 lg:h-70">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          width={400}
          height={400}
          className="aspect-video h-full w-full object-cover object-center"
        />
      </div>
      <CardContent className="h-[270px] lg:h-[220px]">
        <p className="text-l-semibold mb-2">{name}</p>
        <div className="mb-3 flex text-white">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <StarIconPrimaryGradient
              key={`start-${i}`}
              className="mr-1"
              size={20}
            />
          ))}
        </div>
        {quote}
      </CardContent>
    </Card>
  )
})
