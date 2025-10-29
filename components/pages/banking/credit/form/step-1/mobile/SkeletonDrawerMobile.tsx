'use client'

import { DataDiriFieldsSkeleton } from '@/components/pages/banking/credit/form/step-1/DataDiri/SkeletonDataDiri'
import { DataManifestSkeleton } from '@/components/pages/banking/credit/form/step-1/DataManifest/SkeletonDataManifest'
import { Skeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

interface SubmissionStep1SkeletonProps {
  totalQty: number
}

export function SubmissionStep1Skeleton({
  totalQty,
}: SubmissionStep1SkeletonProps) {
  // Pastikan kita merender setidaknya 1 skeleton jemaah
  const skeletonSize = totalQty > 0 ? totalQty : 1

  return (
    <Fragment>
      <DataDiriFieldsSkeleton />
      <DataManifestSkeleton size={totalQty} />
      <div className="flex flex-col gap-6 lg:hidden">
        <div className="h-1.5 w-full self-stretch bg-neutral-100" />
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:hidden">
          {/* --- Skeleton Card Data Pemohon --- */}
          <div className="flex flex-col gap-4">
            {/* Header section */}
            <div className="flex items-start justify-between">
              {/* Left side (Title/Subtitle) */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32" /> {/* 'Data Pemohon' */}
                <Skeleton className="h-4 w-48" /> {/* 'Pemohon adalah...' */}
              </div>
              {/* Right side (Button) */}
              <Skeleton className="h-6 w-24" /> {/* 'Tambah Data' Button */}
            </div>

            {/* Summary content section */}
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>
        <div className="h-1.5 w-full self-stretch bg-neutral-100" />
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:hidden">
          {/* --- Skeleton Card Data Jemaah --- */}
          <div className="flex flex-col gap-4 ">
            {/* Header section */}
            <div className="flex items-start justify-between">
              {/* Left side (Title/Subtitle) */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-28" /> {/* 'Data Jemaah' */}
                <Skeleton className="h-4 w-40" />{' '}
                {/* 'x jemaah belum terisi' */}
              </div>
              {/* Right side (Button) */}
              <Skeleton className="h-6 w-24" /> {/* 'Tambah Jemaah' Button */}
            </div>

            {/* Skeleton for Jemaah summary list */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: skeletonSize }, (_, index) => (
                // Skeleton untuk setiap card summary jemaah
                <Skeleton key={index} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* --- Skeleton for Fixed Button --- */}
          <div className="fixed right-0 bottom-0 left-0 z-10 w-full bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
