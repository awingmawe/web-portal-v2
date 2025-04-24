'use client'

import { DocumentTextIcon } from '@/components/icons/document'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ChevronRightCircle, User } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

interface JemaahDocument {
  id: string
  type: string
  src: string
}

interface JemaahMember {
  id: string
  name: string
  phoneNumber: string
  nik: string
  gender: string
  placeBorn: string
  born: string
  hometown: string
  address: string
  passportNumber: string
  passportExpiredAt: string
  healthHistory: string
  attachment: JemaahDocument[]
}

interface TransactionDetailManifestProps {
  members: JemaahMember[]
}

function NotUploaded() {
  return (
    <div className="mt-1 flex items-center rounded-lg border border-neutral-100 p-2">
      <div className="relative h-16 w-16 overflow-hidden rounded">
        <Image
          src={'/images/no-image.png'}
          alt="no-image"
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <p className="text-l-regular">Data belum diunggah</p>
      </div>
    </div>
  )
}

export default function TransactionDetailManifest({
  members,
}: TransactionDetailManifestProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {members?.map((member) => (
        <Accordion type="single" collapsible key={member.id}>
          <AccordionItem value={member.id} className="bg-white" noBorder>
            <AccordionTrigger
              className="relative z-50 rounded-3xl border border-neutral-100 bg-white px-6 py-4 hover:no-underline"
              noSeparator
            >
              <div className="flex items-center gap-3 text-left">
                <User className="h-6 w-6 text-emerald-500" />
                <span className="text-m-semibold">
                  Data Jemaah {member.name}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className="px-0 pt-0 pb-0"
              style={{
                marginTop: '-40px',
                paddingTop: '110px',
                borderRadius: '1.5rem',
                border: '1px solid #E8E8E8',
              }}
            >
              <div className="relative z-20 -mt-20 space-y-2 bg-neutral-50 p-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Nama Jemaah
                    </p>
                    <p className="text-l-regular">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Nomor Telepon
                    </p>
                    <p className="text-l-regular">
                      {member.phoneNumber || '-'}
                    </p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">NIK</p>
                    <p className="text-l-regular">{member.nik || '-'}</p>
                  </div>
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Jenis Kelamin
                    </p>
                    <p className="text-l-regular">
                      {member.gender === null
                        ? '-'
                        : member.gender === 'male'
                          ? 'Laki-laki'
                          : 'Perempuan'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Tempat Lahir
                    </p>
                    <p className="text-l-regular">{member.placeBorn || '-'}</p>
                  </div>
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Tanggal Lahir
                    </p>
                    <p className="text-l-regular">{member.born || '-'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Kota Asal
                    </p>
                    <p className="text-l-regular">{member.hometown || '-'}</p>
                  </div>
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Alamat
                    </p>
                    <p className="text-l-regular">{member.address || '-'}</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Passport Information */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Nomor Paspor
                    </p>
                    <p className="text-l-regular">
                      {member.passportNumber || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Masa Berlaku Paspor
                    </p>
                    <p className="text-l-regular">
                      {member.passportExpiredAt || '-'}
                    </p>
                  </div>
                </div>

                {member.attachment.find((doc) => doc.type === 'passport') ? (
                  <Fragment>
                    <div className="mt-5">
                      <p className="text-s-regular mb-1 text-neutral-500">
                        Foto Paspor
                      </p>
                      <div className="mt-1 flex items-center rounded-lg border border-neutral-100 p-2">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          {member.attachment
                            .find((doc) => doc.type === 'passport')
                            ?.src.endsWith('.pdf') ? (
                            <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                              <DocumentTextIcon className="text-neutral-500" />
                            </div>
                          ) : (
                            <Image
                              src={
                                member.attachment.find(
                                  (doc) => doc.type === 'passport'
                                )?.src || '/images/no-image.png'
                              }
                              alt="Passport"
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-l-regular">Paspor {member.name}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <span>Lihat File</span>
                          <ChevronRightCircle size={16} />
                        </Button>
                      </div>
                    </div>
                    <hr className="border-gray-200" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="mt-5">
                      <p className="text-s-regular mb-1 text-neutral-500">
                        Foto Paspor
                      </p>
                      <NotUploaded />
                    </div>
                    <hr className="border-gray-200" />
                  </Fragment>
                )}

                {/* Additional Documents */}
                {member.attachment.find((doc) => doc.type === 'user-photo') ? (
                  <div className="mt-3">
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Pas Foto (Latar Belakang Putih)
                    </p>
                    <div className="mt-1 flex items-center rounded-lg border border-neutral-100 p-2">
                      <div className="relative h-16 w-16 overflow-hidden rounded border border-gray-200">
                        {member.attachment
                          .find((doc) => doc.type === 'user-photo')
                          ?.src.endsWith('.pdf') ? (
                          <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                            <DocumentTextIcon className="text-neutral-500" />
                          </div>
                        ) : (
                          <Image
                            src={
                              member.attachment.find(
                                (doc) => doc.type === 'user-photo'
                              )?.src || '/images/no-image.png'
                            }
                            alt="Photo"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium">Pas Foto {member.name}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Lihat File</span>
                        <ChevronRightCircle size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="mt-5">
                      <p className="text-s-regular mb-1 text-neutral-500">
                        Pas Foto (Latar Belakang Putih)
                      </p>
                      <NotUploaded />
                    </div>
                  </Fragment>
                )}

                {member.attachment.find((doc) => doc.type === 'user-photo') ? (
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Foto KTP
                    </p>
                    <div className="mt-1 flex items-center rounded-lg border border-neutral-100 p-2">
                      <div className="relative h-16 w-16 overflow-hidden rounded border border-gray-200">
                        {member.attachment
                          .find((doc) => doc.type === 'ktp')
                          ?.src.endsWith('.pdf') ? (
                          <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                            <DocumentTextIcon className="text-neutral-500" />
                          </div>
                        ) : (
                          <Image
                            src={
                              member.attachment.find(
                                (doc) => doc.type === 'ktp'
                              )?.src || '/images/no-image.png'
                            }
                            alt="ID Card"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium">Foto KTP {member.name}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Lihat File</span>
                        <ChevronRightCircle size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="mt-5">
                      <p className="text-s-regular mb-1 text-neutral-500">
                        Foto KTP
                      </p>
                      <NotUploaded />
                    </div>
                  </Fragment>
                )}

                {member.attachment.find((doc) => doc.type === 'kk') ? (
                  <div>
                    <p className="text-s-regular mb-1 text-neutral-500">
                      Foto KK
                    </p>
                    <div className="mt-1 flex items-center rounded-lg border border-neutral-100 p-2">
                      <div className="relative h-16 w-16 overflow-hidden rounded border border-gray-200">
                        {member.attachment
                          .find((doc) => doc.type === 'kk')
                          ?.src.endsWith('.pdf') ? (
                          <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
                            <DocumentTextIcon className="text-neutral-500" />
                          </div>
                        ) : (
                          <Image
                            src={
                              member.attachment.find((doc) => doc.type === 'kk')
                                ?.src || '/images/no-image.png'
                            }
                            alt="Family Card"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium">Foto KK {member.name}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <span>Lihat File</span>
                        <ChevronRightCircle size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="mt-5">
                      <p className="text-s-regular mb-1 text-neutral-500">
                        Foto KK
                      </p>
                      <NotUploaded />
                    </div>
                  </Fragment>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
