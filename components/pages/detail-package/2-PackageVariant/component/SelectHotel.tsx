'use client'

import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RoomType, usePackageVariant } from '@/contexts/package-variant-context'
import { formatCurrency, isEmpty } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Fragment, useMemo } from 'react'

export interface SelectHotelProps {
  isMobile?: boolean
}

export default function SelectHotel({ isMobile = false }: SelectHotelProps) {
  const {
    selectedVariant,
    selectedRoomType,
    setSelectedRoomType,
    getPrice,
    getOriginalPrice,
    hasDiscount,
    handleBadgePromo,
    getVariantsPrice,
    getTotalQty,
  } = usePackageVariant()

  const availableRoomTypes = useMemo(() => {
    if (!selectedVariant) return { double: false, triple: false, quad: false }

    return {
      double:
        selectedVariant.priceDouble !== null && selectedVariant.priceDouble > 0,
      triple:
        selectedVariant.priceTriple !== null && selectedVariant.priceTriple > 0,
      quad: selectedVariant.priceQuad !== null && selectedVariant.priceQuad > 0,
    }
  }, [selectedVariant])

  const handleQuantityChange = (roomType: string, change: number) => {
    const prev = selectedRoomType || {}
    const newQuantity = (prev[roomType] || 0) + change

    let updatedRooms: RoomType
    if (newQuantity <= 0) {
      const rest = { ...prev }
      delete rest[roomType]
      updatedRooms = rest
    } else {
      updatedRooms = { ...prev, [roomType]: newQuantity }
    }

    setSelectedRoomType(updatedRooms)
  }

  const handleAddRoom = (roomType: string) => {
    const updatedRooms = {
      ...selectedRoomType,
      [roomType]: (selectedRoomType?.[roomType] || 0) + 1,
    }

    setSelectedRoomType(updatedRooms)
  }

  return (
    <div>
      <div className={`${!isMobile && 'max-lg:hidden'}`}>
        <div className="text-s-regular mb-2 text-neutral-800">
          Jumlah Jemaah Per Kamar
        </div>
        <div className="flex gap-2 max-xl:flex-col">
          <Card
            className={`w-full min-w-[52px] border-1 ${
              selectedRoomType?.double
                ? 'border-primary-400'
                : availableRoomTypes.double
                  ? 'border-neutral-200'
                  : 'border-neutral-200 opacity-50'
            } bg-white px-1 py-3 shadow-none`}
          >
            <CardContent className="flex h-full flex-col items-start justify-between px-2 max-lg:flex-row max-lg:items-end">
              <div className="flex flex-col space-y-3">
                <BedIcon3 className="mb-2 text-neutral-700" />
                <div className="space-y-1">
                  <p className="text-s-regular text-neutral-900">
                    Kamar Berdua
                  </p>
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
              <div className="mt-5 w-[130px]">
                {selectedRoomType?.double ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('double', -1)}
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-s-regular mx-8 font-medium text-neutral-900 max-xl:mx-2">
                      {selectedRoomType?.double}
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
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
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
              selectedRoomType?.triple
                ? 'border-primary-400'
                : availableRoomTypes.triple
                  ? 'border-neutral-200'
                  : 'border-neutral-200 opacity-50'
            } bg-white px-1 py-3 shadow-none`}
          >
            <CardContent className="flex h-full flex-col items-start justify-between px-2 max-lg:flex-row max-lg:items-end">
              <div className="flex flex-col space-y-3">
                <BedIcon2 className="mb-2 text-neutral-700" />
                <div className="space-y-1">
                  <p className="text-s-regular text-neutral-900">
                    Kamar Bertiga
                  </p>
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
              <div className="mt-5 w-[130px]">
                {selectedRoomType?.triple ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('triple', -1)}
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-s-regular mx-8 font-medium text-neutral-900 max-xl:mx-2">
                      {selectedRoomType?.triple}
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
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
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
              selectedRoomType?.quad
                ? 'border-primary-400'
                : availableRoomTypes.quad
                  ? 'border-neutral-200'
                  : 'border-neutral-200 opacity-50'
            } bg-white px-1 py-3 shadow-none`}
          >
            <CardContent className="flex h-full flex-col items-start justify-between px-2 max-lg:flex-row max-lg:items-end">
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
              <div className="mt-5 w-[130px]">
                {selectedRoomType?.quad ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('quad', -1)}
                      variant="ghost"
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-s-regular mx-8 font-medium text-neutral-900 max-xl:mx-2">
                      {selectedRoomType?.quad}
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
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
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
      {/* Total price */}
      <div className="mt-3 flex items-center justify-between max-lg:hidden">
        <div className="text-m-regular text-neutral-500">Total Harga</div>
        <div className="flex flex-col items-start">
          <span className="text-l-semibold text-neutral-900">
            {isEmpty(getPrice()) ? '-' : formatCurrency(getPrice())}
          </span>
          {hasDiscount() && getOriginalPrice() > 0 && (
            <div className="flex items-center">
              <span className="text-s-regular mr-1 text-neutral-500 line-through">
                {formatCurrency(getOriginalPrice())}
              </span>
              <span className="text-s-regular bg-error-500 rounded-md p-1 text-white">
                {handleBadgePromo(
                  String(selectedVariant?.discountType),
                  String(
                    Number(selectedVariant?.discountAmount || 0) * getTotalQty()
                  )
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
