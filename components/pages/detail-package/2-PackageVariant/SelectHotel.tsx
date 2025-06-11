'use client'

import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { VariantPriceType } from '@/constant/types/PackageProps'
import { formatCurrency } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Fragment, useState } from 'react'

export interface SelectHotelProps {
  availableRoomTypes: {
    double: boolean
    triple: boolean
    quad: boolean
  }
  setSelectedRoomType: (roomType: { [key: string]: number } | null) => void
  getVariantsPrice: (
    type: 'double' | 'triple' | 'quad'
  ) => VariantPriceType | null
}

export default function SelectHotel({
  availableRoomTypes,
  getVariantsPrice,
  setSelectedRoomType,
}: SelectHotelProps) {
  const [selectedRooms, setSelectedRooms] = useState<{ [key: string]: number }>(
    {}
  )

  const handleQuantityChange = (roomType: string, change: number) => {
    setSelectedRooms((prev) => {
      const newQuantity = (prev[roomType] || 0) + change
      if (newQuantity <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [roomType]: _, ...rest } = prev
        setSelectedRoomType(rest)
        return rest
      }
      setSelectedRoomType({ ...prev, [roomType]: newQuantity })
      return { ...prev, [roomType]: newQuantity }
    })
  }

  const handleAddRoom = (roomType: string) => {
    setSelectedRooms((prev) => {
      setSelectedRoomType({
        ...prev,
        [roomType]: 1,
      })
      return {
        ...prev,
        [roomType]: 1,
      }
    })
  }

  return (
    <div className="max-lg:hidden">
      <div className="text-s-regular mb-2 text-neutral-800">
        Jumlah Jemaah Per Kamar
      </div>
      <div className="flex gap-2">
        {/* Kamar Berdua - Unavailable */}
        {/* <Card className="h-96 w-80 border-2 border-neutral-200 bg-white">
        <CardContent className="flex h-full flex-col items-center justify-between p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex h-16 w-16 items-center justify-center">
              <Bed className="h-12 w-12 text-neutral-400" strokeWidth={1.5} />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-medium text-neutral-400">
                Kamar Berdua
              </h3>
              <p className="text-lg text-neutral-400 italic">Tidak Tersedia</p>
            </div>
          </div>
        </CardContent>
      </Card> */}
        <Card
          className={`w-full min-w-[52px] border-1 ${
            selectedRooms.double
              ? 'border-primary-400'
              : availableRoomTypes.double
                ? 'border-neutral-200'
                : 'border-neutral-200 opacity-50'
          } bg-white px-1 py-3 shadow-none`}
        >
          <CardContent className="flex h-full flex-col items-start justify-between px-2">
            <div className="flex flex-col space-y-3">
              <BedIcon3 className="mb-2 text-neutral-700" />
              <div className="space-y-1">
                <p className="text-s-regular text-neutral-900">Kamar Berdua</p>
                {availableRoomTypes.double ? (
                  <div>
                    <p className="text-s-semibold text-neutral-900">
                      {formatCurrency(getVariantsPrice('double')?.price)}
                    </p>
                    {getVariantsPrice('double')?.hasDiscount && (
                      <p className="text-s-regular mt-1 text-neutral-500 line-through">
                        {formatCurrency(
                          getVariantsPrice('double')?.originalPrice
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-s-semibold text-neutral-900 italic">
                    Tidak Tersedia
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              {selectedRooms.double ? (
                <div className="flex h-10 w-32 items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                  <Button
                    onClick={() => handleQuantityChange('double', -1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-s-regular mx-8 font-medium text-neutral-900">
                    {selectedRooms.double}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange('double', 1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Fragment>
                  {availableRoomTypes.double && (
                    <Button
                      onClick={() => handleAddRoom('double')}
                      className="hover:bg-netural-50 h-10 w-32 rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
                      variant="outline"
                    >
                      <span className="text-s-regular">Tambah</span>
                    </Button>
                  )}
                </Fragment>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Kamar Bertiga */}
        <Card
          className={`w-full min-w-[52px] border-1 ${
            selectedRooms.triple
              ? 'border-primary-400'
              : availableRoomTypes.triple
                ? 'border-neutral-200'
                : 'border-neutral-200 opacity-50'
          } bg-white px-1 py-3 shadow-none`}
        >
          <CardContent className="flex h-full flex-col items-start justify-between px-2">
            <div className="flex flex-col space-y-3">
              <BedIcon2 className="mb-2 text-neutral-700" />
              <div className="space-y-1">
                <p className="text-s-regular text-neutral-900">Kamar Bertiga</p>
                {availableRoomTypes.triple ? (
                  <div>
                    <p className="text-s-semibold text-neutral-900">
                      {formatCurrency(getVariantsPrice('triple')?.price)}
                    </p>
                    {getVariantsPrice('triple')?.hasDiscount && (
                      <p className="text-s-regular mt-1 text-neutral-500 line-through">
                        {formatCurrency(
                          getVariantsPrice('triple')?.originalPrice
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-s-semibold text-neutral-900 italic">
                    Tidak Tersedia
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              {selectedRooms.triple ? (
                <div className="flex h-10 w-32 items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                  <Button
                    onClick={() => handleQuantityChange('triple', -1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-s-regular mx-8 font-medium text-neutral-900">
                    {selectedRooms.triple}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange('triple', 1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Fragment>
                  {availableRoomTypes.triple && (
                    <Button
                      onClick={() => handleAddRoom('triple')}
                      className="hover:bg-netural-50 h-10 w-32 rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
                      variant="outline"
                    >
                      <span className="text-s-regular">Tambah</span>
                    </Button>
                  )}
                </Fragment>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Kamar Berempat */}
        <Card
          className={`w-full min-w-[52px] border-1 ${
            selectedRooms.quad
              ? 'border-primary-400'
              : availableRoomTypes.quad
                ? 'border-neutral-200'
                : 'border-neutral-200 opacity-50'
          } bg-white px-1 py-3 shadow-none`}
        >
          <CardContent className="flex h-full flex-col items-start justify-between px-2">
            <div className="flex flex-col space-y-3">
              <BedIcon2 className="mb-2 text-neutral-700" />
              <div className="space-y-1">
                <p className="text-s-regular text-neutral-900">
                  Kamar Berempat
                </p>
                {availableRoomTypes.quad ? (
                  <div>
                    <p className="text-s-semibold text-neutral-900">
                      {formatCurrency(getVariantsPrice('quad')?.price)}
                    </p>
                    {getVariantsPrice('quad')?.hasDiscount && (
                      <p className="text-s-regular mt-1 text-neutral-500 line-through">
                        {formatCurrency(
                          getVariantsPrice('quad')?.originalPrice
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-s-semibold text-neutral-900 italic">
                    Tidak Tersedia
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              {selectedRooms.quad ? (
                <div className="flex h-10 w-32 items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                  <Button
                    onClick={() => handleQuantityChange('quad', -1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-s-regular mx-8 font-medium text-neutral-900">
                    {selectedRooms.quad}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange('quad', 1)}
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-neutral-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Fragment>
                  {availableRoomTypes.triple && (
                    <Button
                      onClick={() => handleAddRoom('quad')}
                      className="hover:bg-netural-50 h-10 w-32 rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
                      variant="outline"
                    >
                      <span className="text-s-regular">Tambah</span>
                    </Button>
                  )}
                </Fragment>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
