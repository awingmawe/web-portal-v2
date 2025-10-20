import Image from 'next/image'

const StepByStepPembiayaan = () => {
  const dataStepByStep = [
    {
      title: 'Pilih paket umroh yang mendukung pembiayaan',
      image: 'gadget',
    },
    {
      title: 'Lengkapi identitas pemohon dan jemaah yang akan beribadah',
      image: 'notes',
    },
    {
      title: 'Permohonan pengajuan kamu akan segera diproses',
      image: 'process',
    },
    {
      title: 'Selamat! Pengajuanmu selesai dan siap berangkat.',
      image: 'passed',
    },
  ]
  return (
    <section className="scrollbar-hide mx-auto py-6 max-lg:py-4 max-md:overflow-x-auto max-md:ps-4 md:container lg:max-w-4xl xl:max-w-5xl">
      <div className="flex gap-4 overflow-visible whitespace-nowrap md:grid md:grid-cols-4">
        {dataStepByStep.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className="border-primary-500 flex flex-col items-center justify-center gap-2 rounded-lg border-1 px-2 py-4 shadow-[0px_0px_8px_1px_rgba(0,0,0,0.15)] max-md:min-w-[240px] max-md:last:mr-4 md:col-span-1"
          >
            <Image
              src={`/images/illustration-${item.image}-pembiayaan.svg`}
              alt={item.image}
              width={96}
              height={96}
            />
            <p className="text-m-medium text-center text-wrap">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StepByStepPembiayaan
