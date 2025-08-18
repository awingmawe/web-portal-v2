'use client'

import { Button } from '@/components/ui/button'
import { TalanganFormData } from '../TalanganFormPage'
import Link from 'next/link'
import { BuildingIcon } from '@/components/icons/building'
import { CalendarIcon } from '@/components/icons/date'
import { Airplane } from '@/components/icons/airplane'
import { BedIcon } from '@/components/icons/bed'

interface FormPengajuanStepProps {
  formData: TalanganFormData
  updateFormData: (data: Partial<TalanganFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function FormPengajuanStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: FormPengajuanStepProps) {
  // Helper function to safely parse price
  const safeParsePrice = (price: any, defaultValue: number = 0): number => {
    if (!price) return defaultValue
    const parsed = typeof price === 'string' ? parseInt(price.replace(/\D/g, '')) : parseInt(price.toString())
    return isNaN(parsed) ? defaultValue : parsed
  }

  return (
    <div className="mx-auto max-w-6xl bg-white rounded-lg p-6 lg:p-8 shadow-sm">
      {formData.selectedPackage ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Paket Pilihan</h3>
            
            {/* Package Info Row */}
            <div className="flex items-start gap-4 mb-6">
              {/* Package Image */}
              <div className="w-32 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                {formData.selectedPackage.src ? (
                  <img 
                    src={formData.selectedPackage.src} 
                    alt={formData.selectedPackage.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
              </div>

              {/* Package Details */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-3 text-base uppercase">
                  {formData.selectedPackage.title}
                </h4>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <BuildingIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{formData.selectedPackage.organizationName}</span>
                  <span className="text-gray-500 ml-2">{formData.selectedPackage.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{formData.selectedPackage.departureDate} → {formData.selectedPackage.arrivalDate}</span>
                </div>
              </div>

              {/* Ganti Paket Button */}
              <Link href="/banking/credit/form/pilih-paket">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg">
                  Ganti Paket
                </Button>
              </Link>
            </div>

            {/* Grid Layout for Flight/Hotel Details and Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Side - Flight & Hotel Details */}
              <div className="space-y-4">
                {/* Keberangkatan */}
                <div className="flex items-center gap-3">
                  <Airplane className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Keberangkatan</div>
                    <div className="text-sm text-gray-600">JED → CGK • Emirates</div>
                  </div>
                </div>

                {/* Kepulangan */}
                <div className="flex items-center gap-3">
                  <Airplane className="w-5 h-5 text-gray-600 rotate-180" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Kepulangan</div>
                    <div className="text-sm text-gray-600">CGK → JED • Emirates</div>
                  </div>
                </div>

                {/* Hotel Makkah */}
                <div className="flex items-center gap-3">
                  <BedIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Hotel Makkah</div>
                    <div className="text-sm text-gray-600">Dar Al Ghufran</div>
                  </div>
                </div>

                {/* Hotel Madinah */}
                <div className="flex items-center gap-3">
                  <BedIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Hotel Madinah</div>
                    <div className="text-sm text-gray-600">Sofitel Shad</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Pricing Details */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-4">Rincian Harga Paket</h5>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-gray-900">Total Harga Paket Triple</div>
                      <div className="text-gray-500 text-xs">(4 Jamaah)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-xs">Rp30.000.000 x 4</div>
                      <div className="font-semibold text-gray-900">Rp120.000.000</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-gray-900">Total Harga Paket Quad</div>
                      <div className="text-gray-500 text-xs">(2 Jamaah)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-xs">Rp25.000.000 x 2</div>
                      <div className="font-semibold text-gray-900">Rp50.000.000</div>
                    </div>
                  </div>

                  {safeParsePrice(formData.selectedPackage.discount) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-900">Diskon</span>
                      <span className="font-semibold text-red-600">- Rp{safeParsePrice(formData.selectedPackage.discount).toLocaleString('id-ID')}</span>
                    </div>
                  )}

                  <hr className="my-3" />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Pengajuan</span>
                    <span className="text-xl font-bold text-gray-900">
                      Rp{safeParsePrice(formData.selectedPackage.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Pilih paket terlebih dahulu
          </h3>
          <Link href="/banking/credit/form/pilih-paket">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2 rounded-full">
              Pilih Paket
            </Button>
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 mt-8">
        <Button
          type="button"
          variant="outline"
          className="px-8 py-2 rounded-full border-gray-300 text-gray-700"
          onClick={onPrev}
        >
          Batal
        </Button>
        {formData.selectedPackage && (
          <Button
            type="button"
            className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            onClick={onNext}
          >
            Lanjut
          </Button>
        )}
      </div>
    </div>
  )
}