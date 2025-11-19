interface TableComparasionProps {
  pengajuanJumlah: string
  diterimaJumlah: string
  pengajuanTenor: string
  diterimaTenor: string
  pengajuanAngsuran: string
  diterimaAngsuran: string
}

export default function TableComparasion({
  pengajuanJumlah,
  diterimaJumlah,
  pengajuanTenor,
  diterimaTenor,
  pengajuanAngsuran,
  diterimaAngsuran,
}: TableComparasionProps) {
  return (
    <div className="overflow-hidden rounded-md border border-neutral-200">
      <table className="w-full rounded-md bg-white">
        {/* Bagian Header Tabel */}
        <thead className="bg-[#F7F7F7]">
          <tr>
            <th className="text-s-semibold border-r border-b border-neutral-200  px-3 py-2.5 text-left first:rounded-tl-md">
              Perbandingan
            </th>
            <th className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center">
              Pengajuan Kamu
            </th>
            <th className="text-s-semibold border-b border-neutral-200 px-3 py-2.5 text-center last:rounded-tr-md">
              Pengajuan Diterima
            </th>
          </tr>
        </thead>
        {/* Bagian Isi Tabel */}
        <tbody>
          {/* Baris Jumlah Pembiayaan */}
          <tr className="border-b border-neutral-200">
            <td className="text-s-regular border-r border-b border-neutral-200 px-3 py-2.5 font-medium text-neutral-900">
              Jumlah Pembiayaan
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {pengajuanJumlah}
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {diterimaJumlah ? diterimaJumlah : 'Sesuai Pengajuan'}
            </td>
          </tr>
          {/* Baris Tenor */}
          <tr className="border-b border-neutral-200">
            <td className="text-s-regular border-r border-b border-neutral-200 px-3 py-2.5 font-medium text-neutral-900">
              Tenor
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {pengajuanTenor}
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {diterimaTenor ? diterimaTenor : 'Sesuai Pengajuan'}
            </td>
          </tr>
          {/* Baris Angsuran */}
          <tr>
            <td className="text-s-regular border-r border-b border-neutral-200 px-3 py-2.5 font-medium text-neutral-900">
              Angsuran Per Bulan
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {pengajuanAngsuran}
            </td>
            <td className="text-s-semibold border-r border-b border-neutral-200 px-3 py-2.5 text-center text-neutral-900">
              {diterimaAngsuran ? diterimaAngsuran : 'Sesuai Pengajuan'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
