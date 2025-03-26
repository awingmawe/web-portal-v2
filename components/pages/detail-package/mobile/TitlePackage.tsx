type TitlePackageMobileProps = {
  title: string
}

const TitlePackageMobile = ({ title }: TitlePackageMobileProps) => {
  return (
    <div className="flex flex-col border-b border-neutral-200 pb-4 lg:hidden">
      <p className="text-l-semibold mb-2 text-neutral-900">{title}</p>
      <p className="text-xs-medium mb-1 text-neutral-500">Harga Mulai Dari</p>
      <p className="text-l-semibold text-neutral-900">200000</p>
    </div>
  )
}

export default TitlePackageMobile
