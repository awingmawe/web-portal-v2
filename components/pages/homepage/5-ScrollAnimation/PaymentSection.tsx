/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
const PaymentSection = () => {
  return (
    <div className="relative z-3 bg-[#0000001A] py-2 backdrop-blur-[50px]">
      <div className="relative container m-auto flex">
        <div className="flex-auto pt-32 text-white">
          <div style={{ marginBottom: 32 }}>
            <p className="spacing-[2%] text-[72px] leading-[72px] font-semibold text-white">
              Pembayaran Mudah
              <br />
              dan Aman
            </p>
          </div>
          <div
            className="[&>*] font-light [&>*]:text-[16px] [&>*]:leading-[120%] [&>*]:text-white"
            style={{
              maxWidth: 658,
              marginBottom: 40,
            }}
          >
            <p>
              Muslim101 percaya bahwa kenyamanan dan transparansi dalam
              bertransaksi adalah hal yang utama, sehingga kami menghadirkan
              proses pembayaran yang mudah, aman, dan tepercaya dengan beragam
              pilihan bank sesuai syariat Islam.
            </p>
            <p className="mt-4 font-semibold">Kemudahan</p>
            <p>Bayar sekarang atau nanti, pilih sesuka hati!</p>

            <p className="mt-4 font-semibold">Keamanan</p>
            <p>
              Setiap transaksi selalu kami awasi dengan cermat, memastikan
              perjalananmu pasti terpenuhi.
            </p>

            <p className="mt-4 font-semibold">Kenyamanan</p>
            <p>
              Pesan di mana saja, kapan saja, notifikasi up-to-date selalu
              menyapa.
            </p>
          </div>
          <button
            className="bg-primary flex items-center px-8 text-[12px]"
            style={{
              height: 48,
              borderRadius: 48,
              whiteSpace: 'nowrap',
              marginBottom: 32,
            }}
          >
            Cari Paket Umroh Sekarang
            <Image
              src="/images/arrow-circle-right.svg"
              width={14}
              height={14}
              alt="arrow"
              className="ml-2"
            />
          </button>
          <div
            className="relative z-2 flex flex-wrap items-center gap-4"
            style={{
              maxWidth: 720,
            }}
          >
            {[
              {
                img: '/images/bank-mandiri.svg',
                label: 'mandiri',
              },
              {
                img: '/images/bank-bni.svg',
                label: 'bni',
              },
              {
                img: '/images/bank-bri.svg',
                label: 'bri',
              },
              {
                img: '/images/bank-permata.svg',
                label: 'permata',
              },
              {
                img: '/images/bank-bsi.svg',
                label: 'bsi',
              },
              {
                img: '/images/bank-cimb.svg',
                label: 'cimb',
              },
              {
                img: '/images/bank-bca.svg',
                label: 'bca',
              },
              {
                label: 'other',
              },
            ].map((each, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-[20px] bg-white"
                style={{
                  height: 68,
                  width: 138,
                }}
              >
                {each.img ? (
                  <Image
                    src={each.img}
                    alt={each.label}
                    width={104}
                    height={32}
                  />
                ) : (
                  <p className="text-[14px]">+ Bank Lainnya</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <img src="/images/easy-payment.png" alt="easy-payment" />
      </div>
      <img
        src="/images/pattern-1.svg"
        alt="pattern"
        className="absolute bottom-0 left-0"
      />
    </div>
  )
}

export default PaymentSection
