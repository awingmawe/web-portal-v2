import { Legal } from '@/constant/types/LegalProps'
import Link from 'next/link'
export default async function SidebarLegal({
  listLegal,
  activeSlug,
}: {
  activeSlug: string
  listLegal: Legal[]
}) {
  return (
    <div className="shrink-0 max-lg:hidden md:w-64 lg:w-80">
      <div className="border-l border-neutral-100 pl-6">
        <nav className="flex flex-col space-y-4">
          {listLegal.map((item) => (
            <Link
              href={`/legal/${item.slug}`}
              className={`text-m-medium ${activeSlug === item.slug ? 'text-primary-500' : 'text-neutral-500'} underline`}
              key={item.id}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
