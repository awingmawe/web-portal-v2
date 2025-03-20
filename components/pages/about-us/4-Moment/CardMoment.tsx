import Image from 'next/image'
export interface CardProps {
  image: string
  date: string
  title: string
  content: string
}

export default function CardMoment({ image, date, title, content }: CardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="flex h-full flex-col p-3">
        <div className="mb-4 h-100 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-l-medium mb-2">{title}</h3>
        <p className="text-s-regular mb-6">{content}</p>
        <div className="text-s-regular mt-auto text-gray-500">{date}</div>
      </div>
    </div>
  )
}
