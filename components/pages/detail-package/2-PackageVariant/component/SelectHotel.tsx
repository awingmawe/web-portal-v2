'use client'

import { BedIcon2, BedIcon3 } from '@/components/icons/bed'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PackageVariant } from '@/constant/types/PackageProps'
import { RoomType, usePackageVariant } from '@/contexts/package-variant-context'
import { formatCurrency, isEmpty } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { Fragment, useEffect, useMemo } from 'react'

export interface SelectHotelProps {
  isMobile?: boolean
  defaultValue?: RoomType
  defaultPackageVariant?: PackageVariant | null
  defaultPackageVariantId?: number | null
  totalManifest?: number
  disabled?: boolean
  variant?: 'normal' | 'checkout'
  disabledAddOnly?: boolean
  totalQty?: number
  onChange?: (roomType: RoomType, price: number) => void
}

export default function SelectHotel({
  isMobile = false,
  defaultValue,
  defaultPackageVariant,
  defaultPackageVariantId,
  variant = 'normal',
  disabled = false,
  disabledAddOnly = false,
  totalManifest,
  totalQty,
  onChange,
}: SelectHotelProps) {
  const {
    selectedVariant,
    selectedVariantId,
    selectedRoomType,
    isEmptyRoomType,
    setSelectedRoomType,
    setSelectedVariant,
    setSelectedVariantId,
    getPrice,
    getOriginalPrice,
    hasDiscount,
    handleBadgePromo,
    getVariantsPrice,
    getTotalQty,
  } = usePackageVariant()

  useEffect(() => {
    if (!selectedRoomType && defaultValue) {
      setSelectedRoomType(defaultValue)
    }

    if (!selectedVariant && defaultPackageVariant) {
      setSelectedVariant(defaultPackageVariant)
    }

    if (!selectedVariantId && defaultPackageVariantId) {
      setSelectedVariantId(defaultPackageVariantId)
    }
  }, [
    defaultValue,
    selectedRoomType,
    selectedVariant,
    selectedVariantId,
    defaultPackageVariant,
    defaultPackageVariantId,
    setSelectedRoomType,
    setSelectedVariant,
    setSelectedVariantId,
  ])

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
    onChange?.(updatedRooms, getPrice())
  }

  const handleAddRoom = (roomType: string) => {
    const updatedRooms = {
      ...selectedRoomType,
      [roomType]: (selectedRoomType?.[roomType] || 0) + 1,
    }

    setSelectedRoomType(updatedRooms)
    onChange?.(updatedRooms, getPrice())
  }

  const isLimitReached = totalManifest ? totalQty === totalManifest : false

  return (
    <div>
      <div className={`${!isMobile && 'max-lg:hidden'}`}>
        {variant == 'normal' && (
          <div className="text-s-regular mb-2 text-neutral-800 max-lg:text-sm max-lg:font-semibold">
            Jumlah Jemaah Per Kamar
          </div>
        )}
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
              <div
                className={`flex  ${variant == 'checkout' ? 'w-full flex-row gap-2' : 'flex-col space-y-3 max-lg:flex-row max-lg:gap-2'}`}
              >
                <BedIcon3 className="mb-2 text-neutral-700" />
                <div
                  className={`space-y-1 ${variant == 'checkout' && 'flex w-full justify-between'}`}
                >
                  <p className="text-s-regular text-neutral-900">
                    Kamar {variant == 'checkout' && <br />} Berdua
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
              <div
                className={`${variant == 'checkout' ? 'mt-3' : 'mt-5'} w-full max-w-[120px]`}
              >
                {selectedRoomType?.double ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('double', -1)}
                      variant="ghost"
                      disabled={disabled}
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
                      disabled={disabled || disabledAddOnly || isLimitReached}
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    {availableRoomTypes.double && (
                      <Button
                        onClick={() => !disabled && handleAddRoom('double')}
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
                        variant="outline"
                        disabled={disabled || disabledAddOnly || isLimitReached}
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
              <div
                className={`flex  ${variant == 'checkout' ? 'w-full flex-row gap-2' : 'flex-col space-y-3 max-lg:flex-row max-lg:gap-2'}`}
              >
                <BedIcon2 className="mb-2 text-neutral-700" />
                <div
                  className={`space-y-1 ${variant == 'checkout' && 'flex w-full justify-between'}`}
                >
                  <p className="text-s-regular text-neutral-900">
                    Kamar {variant == 'checkout' && <br />} Bertiga
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
              <div
                className={`${variant == 'checkout' ? 'mt-3' : 'mt-5'} w-full max-w-[120px]`}
              >
                {selectedRoomType?.triple ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('triple', -1)}
                      variant="ghost"
                      disabled={disabled}
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
                      disabled={disabled || disabledAddOnly || isLimitReached}
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    {availableRoomTypes.triple && (
                      <Button
                        onClick={() => !disabled && handleAddRoom('triple')}
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100"
                        variant="outline"
                        disabled={disabled || disabledAddOnly || isLimitReached}
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
              <div
                className={`flex  ${variant == 'checkout' ? 'w-full flex-row gap-2' : 'flex-col space-y-3 max-lg:flex-row max-lg:gap-2'}`}
              >
                <BedIcon2 className="mb-2 text-neutral-700" />
                <div
                  className={`space-y-1 ${variant == 'checkout' && 'flex w-full justify-between'}`}
                >
                  <p className="text-s-regular text-neutral-900">
                    Kamar {variant == 'checkout' && <br />} Berempat
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
              <div
                className={`${variant == 'checkout' ? 'mt-3' : 'mt-5'} w-full max-w-[120px]`}
              >
                {selectedRoomType?.quad ? (
                  <div className="flex h-10 w-full items-center justify-center rounded-full border-1 border-neutral-300 bg-white">
                    <Button
                      onClick={() => handleQuantityChange('quad', -1)}
                      variant="ghost"
                      disabled={disabled}
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
                      disabled={disabled || disabledAddOnly || isLimitReached}
                      className="h-8 w-8 rounded-full hover:bg-neutral-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    {availableRoomTypes.quad && (
                      <Button
                        onClick={() => !disabled && handleAddRoom('quad')}
                        className="hover:bg-netural-50 h-10 w-full rounded-full border-1 border-neutral-300 bg-white text-lg font-medium text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed"
                        variant="outline"
                        disabled={disabled || disabledAddOnly || isLimitReached}
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
        {variant == 'checkout' && isEmptyRoomType && (
          <p className="text-m-regular text-error-500 my-3">
            Harap pilih minimal 1 jemaah
          </p>
        )}
      </div>
      {/* Total price */}
      {variant == 'normal' && (
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
                      Number(selectedVariant?.discountAmount || 0) *
                        getTotalQty()
                    )
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
