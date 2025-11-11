'use client'

import { ArrowCircleDown } from '@/components/icons/arrow-circle-down'
import { ArrowCircleUp } from '@/components/icons/arrow-circle-up'
import CardMoment from '@/components/pages/about-us/4-Moment/CardMoment'
import { Button } from '@/components/ui/button'
import { Fragment, useState } from 'react'

export default function Moment() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section className="py-8">
      <div className="container mx-auto max-lg:px-4">
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
          {/* Card 1 - with multiple images */}
          <CardMoment
            title="International Islamic Expo (IIE)"
            images={[
              'https://storage.googleapis.com/m101-prods/about-us/Folder%201%20-%20IIE/IIE%201.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%201%20-%20IIE/IIE%202.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%201%20-%20IIE/IIE%203.png',
            ]}
            date="26-28 Juli 2024"
            content="Muslim101, sebelumnya Umroh101, berpartisipasi dalam International Islamic Expo (IIE) bertemakan Umrah-Hajj & Islamic Tourism ke-14 yang diselengarakan pada 26–28 Juli 2024 di Jakarta Convention Center (JCC) untuk mempromosikan brand dan menjalin kemitraan selama pameran."
          />

          {/* Card 2 - with multiple images */}
          <CardMoment
            title="Mini Travel Fair: Jelajahi Negeri Impian at PermataBank Syariah"
            images={[
              'https://storage.googleapis.com/m101-prods/about-us/Folder%202%20-%20Mini%20Travel%20Fair/IIE%201.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%202%20-%20Mini%20Travel%20Fair/IIE%202.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%202%20-%20Mini%20Travel%20Fair/IIE%203.png',
            ]}
            date="3-14 Februari 2025"
            content={`Bersama PermataBank Syariah, Muslim101 berhasil menyelenggarakan acara Mini Travel Fair yang bertemakan "Jelajahi Negeri Impian" selama dua pekan, mulai dari tanggal 3–7 hingga 10–14 Februari 2025. Diikuti para mitra travel Muslim101, yaitu Aqobah, Sahid Tour, Goldy, Annisa, Tazkia, Syawal, Al-Azhar, dan Mulia Tour.`}
          />

          {/* The following cards use single images for backward compatibility */}
          <CardMoment
            title="Curhatin 1.0"
            images={[
              'https://storage.googleapis.com/m101-prods/about-us/Folder%203%20-%20Curhatin%201.0/IIE%201.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%203%20-%20Curhatin%201.0/IIE%202.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%203%20-%20Curhatin%201.0/IIE%203.png',
            ]}
            date="10 November 2024"
            content={`Untuk pertama kalinya, Muslim101 mulai ikut mendukung acara eksternal, yaitu Curhatin pada tanggal 10 November 2024. Bersama Litasari N. Husna, S.Psi, kami mengikuti kajian rohani yang bertemakan "Wahai Muslimah, dirimu Berharga... 'Jangan biarkan luka menghambatmu berdaya'"`}
          />

          <CardMoment
            title="Kumpul Keluarga"
            images={[
              'https://storage.googleapis.com/m101-prods/about-us/Folder%204%20-%20Curhatin%202.0/IIE%201.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%204%20-%20Curhatin%202.0/IIE%202.png',
              'https://storage.googleapis.com/m101-prods/about-us/Folder%204%20-%20Curhatin%202.0/IIE%203.png',
            ]}
            date="12 Desember 2024"
            content={`Muslim101 hadir di acara Kumpul Keluarga pada tanggal 23 Februari 2025, memberikan konsultasi, informasi, dan penawaran seputar ibadah menuju Tanah Suci.`}
          />

          {showMore && (
            <Fragment>
              <CardMoment
                title="Bestie Till Jannah: The Beauty of Faith"
                images={[
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%205%20-%20Bestie%20till%20jannah/Frame%201000007445.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%205%20-%20Bestie%20till%20jannah/Frame%201000007446.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%205%20-%20Bestie%20till%20jannah/Frame%201000007447.png',
                ]}
                date="12 Desember 2024"
                content={`Dalam memaksimalkan misi brand awareness, Muslim101 hadir dalam acara Bestie Till Jannah: The Beauty of Faith para tanggal 12 Desember 2024 di Graha Pos Indonesia, Bandung. Acara ini terbagi menjadi lima sesi yang dimulai dari Workshop Digital Marketing & Onboarding bersama Shopee, Workshop Beauty Class bersama Sariayu Martha Tilaar, kajian bersama Ustadz Ridho Febri dengan tema “Berdamai Dengan Takdir”, sesi kedua kajian Desi Ncim “Bertumbuh Bersama Ujian”, hingga Flash Sale.`}
              />

              <CardMoment
                title="Tazakka"
                images={[
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%206%20-%20Tazzaka/Frame%201000007445.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%206%20-%20Tazzaka/Frame%201000007446.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%206%20-%20Tazzaka/Frame%201000007447.png',
                ]}
                date="27 Januari 2025"
                content={`Pada tanggal 27 Januari 2025, Muslim101 mensponsori acara kajian Tazakka yang bertemakan Mindful Living "Sadar Penuh, Bahagia Utuh" yang dibawakan oleh Teh Desi Ncim. Pada acara ini, Tazakka membahas tuntas bagaimana meraih ketenangan batin khususnya untuk para Akhwat.`}
              />

              <CardMoment
                title="Kumpul Keluarga 2025"
                images={[
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%207%20-%20Kumpul%20Keluarga/Frame%201000007445.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%207%20-%20Kumpul%20Keluarga/Frame%201000007446.png',
                  'https://storage.googleapis.com/m101-prods/about-us/Folder%207%20-%20Kumpul%20Keluarga/Frame%201000007447.png',
                ]}
                date="22 Februari 2025"
                content={`Salah satu acara Tabligh Akbar terbesar di Bandung diselenggarakan oleh Kumpul Keluarga. Pada tanggal 22 Februari 2025, Muslim101 turut memeriahkan acara yang bertemakan "Munggahan Sasarengan" dengan kegiatan yang dimulai dari talkshow yang bermanfaat, festival kuliner Nusantara, hingga kegiatan seru lainnya bersama para public figure inspiratif.`}
              />
            </Fragment>
          )}
        </div>
        <div className="mt-8 text-center">
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
      </div>
    </section>
  )
}
