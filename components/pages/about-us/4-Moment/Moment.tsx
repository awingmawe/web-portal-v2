'use client'

import { ArrowCircleDown } from '@/components/icons/arrow-circle-down'
import { ArrowCircleUp } from '@/components/icons/arrow-circle-up'
import CardMoment from '@/components/pages/about-us/4-Moment/CardMoment'
import { Button } from '@/components/ui/button'
import { Fragment, useState } from 'react'

export default function Moment() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section className="py-8 md:py-10 lg:py-15">
      <div className="text-center">
        <h1 className="lg:text-xl-regular text-2xl font-normal sm:text-3xl md:text-4xl">
          Momen Bermakna Bersama Muslim101
        </h1>
        <p className="text-primary-900 lg:text-l-regular mx-auto mt-3 text-sm sm:text-base md:mt-4 lg:mt-5">
          Setiap perjalanan dan acara yang kami ikuti adalah bagian dari
          komitmen kami dalam membangun pengalaman yang lebih baik. Lihat
          berbagai momen berharga yang telah kami lalui bersama komunitas
          Muslim101.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 lg:mt-8 lg:grid-cols-4 lg:gap-6">
        {/* Card 1 */}
        <CardMoment
          title="International Islamic Expo (IIE)"
          image="https://storage.googleapis.com/m101-prods/about-us/1d71989927a049dfb0345f87a1ff8c70.png"
          date="01 Juni 2025"
          content="Muslim101, sebelumnya Umroh101, berpartisipasi dalam
                International Islamic Expo (IIE) bertempatan Umrah-Hajj &
                Islamic Tourism ke-14 yang diselenggarakan pada 26-28 Juli 2024
                di Jakarta Convention Center (JCC) untuk mempromosikan brand dan
                menjajin kemitraan selama pameran."
        />

        <CardMoment
          title="Mini Travel Fair: Jelajahi Negeri Impian at PermataBank Syariah"
          image="https://storage.googleapis.com/m101-prods/about-us/ffd540a12ee15164d8d9981892fdd747.png"
          date="01 Juni 2025"
          content={`Bersama PermataBank Syariah, Muslim101 berhasil menyelenggarakan acara Mini Travel Fair yang bertema "Jelajahi Negeri Impian" selama dua pekan, mulai dari tanggal 3-7 hingga 10-14 Februari 2025. Diikuti para mitra travel Muslim101, yaitu Aqabah, Sahid Tour, Goldy, Antara, Tazkia, Syawal, Al-Azhar, dan Mulia Tour.`}
        />

        <CardMoment
          title="Curhatin 1.0"
          image="https://storage.googleapis.com/m101-prods/about-us/b7a59a8cd226c95b36caa250c29dc995.png"
          date="01 Juni 2025"
          content={`Untuk pertama kalinya, Muslim101 mulai ikut mendukung acara eksternal, yaitu Curhatin pada tanggal 19 November 2023. Bersama Teh Litsari N Husna, S.Psi, kami mengikuti kajian rohani yang bertema "Wahai Muslimah, dirimu Berharga... Jangan biarkan luka menghambatmu berdaya"`}
        />

        <CardMoment
          title="Curhatin 2.0"
          image="https://storage.googleapis.com/m101-prods/about-us/4661c2f950e4bf4efab9d37db6061b66.jpeg"
          date="01 Juni 2025"
          content={`Muslim101 kembali mendukung acara eksternal yang sama, yaitu Curhatin Day pada tanggal 2 Februari 202 di Masjid Al-Lathiif, Bandung. Bersama Teh Litsari N Husna, S.Psi, kami mengikuti kajian rohani serta emotional therapy dan muhasabah yang dibawakan olehnya.`}
        />

        {showMore && (
          <Fragment>
            <CardMoment
              title="Bestie Till Jannah: The Beauty of Faith"
              image="https://storage.googleapis.com/m101-prods/about-us/b7a59a8cd226c95b36caa250c29dc995.png"
              date="01 Juni 2025"
              content={`Dalam memaksimalkan misi brand awareness, Muslim101 hadir dalam acara Bestie Till Jannah: The Beauty of Faith para tanggal 12 Desember 2024 di Graha Pos Indonesia, Bandung. Acara ini terbagi menjadi lima sesi yang dimulai dari Workshop Digital Marketing & Onboarding bersama Shopee, Workshop Beauty Class bersama Sariayu Martha Tilaar, kajian bersama Ustadz Ridho Febri dengan tema "Berdamai Dengan Takdir", sesi kedua kajian Teh Desi Ncim "Bertumbuh Bersama Ujian", hingga Flash Sale.`}
            />

            <CardMoment
              title="Tazakka"
              image="https://storage.googleapis.com/m101-prods/about-us/918578648e003d5b2f812002743396e3.jpg"
              date="27 Januari 2025"
              content={`Pada tanggal 27 Januari 2025, Muslim101 mensponsori acara kajian Tazakka yang bertemakan Mindful Living "Sadar Penuh, Bahagia Utuh" yang dibawakan oleh Teh Desi Ncim. Pada acara ini, Tazakka membahas tuntas bagaimana meraih ketenangan batin khususnya untuk para Akhwat.`}
            />

            <CardMoment
              title="Kumpul Keluarga 2025"
              image="https://storage.googleapis.com/m101-prods/about-us/6ecbe7a76c3bf7ed9c241015dfb587b0.png"
              date="01 Juni 2025"
              content={`Salah satu acara Tabligh Akbar terbesar di Bandung diselenggarakan oleh Kumpul Keluarga. Pada tanggal 22 Februari 2025, Muslim101 mengikuti kemeriahan acara yang bertemakan "Munggahan Sasarengan" diikuti oleh talkshow yang bermanfaat, festival kuliner Nusantara, hingga kegiatan seru lainnya bersama para public figure inspiratif`}
            />
          </Fragment>
        )}
      </div>
      <div className="mt-4 text-center md:mt-5">
        <Button
          className="px-6 py-2 text-sm sm:px-8 md:px-10 lg:px-[40px]"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak'}{' '}
          {showMore ? (
            <ArrowCircleUp size={12} className="ml-2" />
          ) : (
            <ArrowCircleDown size={12} className="ml-2" />
          )}
        </Button>
      </div>
    </section>
  )
}
