'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TalanganFormData } from '../TalanganFormPage'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PemilihanMitraStepProps {
  formData: TalanganFormData
  updateFormData: (data: Partial<TalanganFormData>) => void
  onPrev: () => void
}

export default function PemilihanMitraStep({
  formData,
  updateFormData,
  onPrev,
}: PemilihanMitraStepProps) {
  const router = useRouter()
  const [selectedPartner, setSelectedPartner] = useState(formData.selectedPartner || '')
  const [tenor, setTenor] = useState(formData.tenor || 24)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePartnerSelect = (partner: string) => {
    setSelectedPartner(partner)
    updateFormData({ selectedPartner: partner })
  }

  const handleTenorChange = (newTenor: string) => {
    const tenorValue = parseInt(newTenor)
    setTenor(tenorValue)
    updateFormData({ tenor: tenorValue })
  }

  const handleSubmit = async () => {
    if (isSubmitting) return // Prevent double submission
    
    setIsSubmitting(true)
    
    try {
      if (typeof window !== 'undefined') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate application ID
        const applicationId = `TLG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        
        // Create application data
        const application = {
          id: applicationId,
          status: 'submitted', // submitted, approved, rejected, in_review
          submittedAt: new Date().toISOString(),
          personalData: {
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            birthDate: formData.birthDate,
            gender: formData.gender,
            job: formData.job,
            address: formData.address,
            cityName: formData.cityName,
            provinceName: formData.provinceName,
          },
          packageData: formData.selectedPackage,
          financing: {
            partnerId: selectedPartner,
            partnerName: selectedPartner === 'permata' ? 'Permata Bank' : 'BFI Finance',
            requestedAmount: formData.selectedPackage?.price || 0,
            tenor: tenor,
            monthlyInstallment: Math.round((formData.selectedPackage?.price || 0) / tenor)
          }
        }
        
        // Get existing applications
        const existingApplications = JSON.parse(localStorage.getItem('talanganApplications') || '[]')
        
        // Add new application
        existingApplications.unshift(application)
        
        // Save to localStorage
        localStorage.setItem('talanganApplications', JSON.stringify(existingApplications))
        
        // Clear form data
        localStorage.removeItem('talanganFormData')
        localStorage.removeItem('talanganCurrentStep')
        // Also clear sessionStorage
        sessionStorage.removeItem('talanganFormData')
        sessionStorage.removeItem('talanganCurrentStep')
        sessionStorage.removeItem('talanganSelectedPackage')
        
        console.log('Application saved:', application)
        console.log('All applications in localStorage:', existingApplications)
        console.log('localStorage key set successfully')
        
        // Redirect to my banking page with a small delay to ensure localStorage is written
        setTimeout(() => {
          router.push('/my/banking')
        }, 100)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setIsSubmitting(false)
    }
  }

  // Mock calculation
  const totalPengajuan = 49000000
  const angsuranPerBulan = Math.round(totalPengajuan / tenor)

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-lg p-6 lg:p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Pilihan Mitra Tersedia
      </h3>

      <div className="space-y-6">
        {/* Permata Bank Option */}
        <div
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
            selectedPartner === 'permata'
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handlePartnerSelect('permata')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PB</span>
              </div>
              <h4 className="text-lg font-semibold">Permata Bank</h4>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 ${
                selectedPartner === 'permata'
                  ? 'border-yellow-500 bg-yellow-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedPartner === 'permata' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h5 className="font-medium mb-2">Ketentuan</h5>
            <p className="text-sm text-gray-700 mb-2">
              Untuk pengajuan talangan umroh melalui Permata Bank, mohon perhatikan ketentuan berikut:
            </p>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. Memiliki rekening Tabungan Permata Bank yang aktif minimal 3 bulan atau kartu kredit dari bank manapun.</li>
              <li>2. Jika jumlah talangan yang disetujui lebih kecil dari pengajuan, maka selisihnya akan menjadi DP (Down Payment) atau uang muka.</li>
            </ol>
          </div>

          {selectedPartner === 'permata' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenor *
                </label>
                <Select value={tenor.toString()} onValueChange={handleTenorChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Simulasi Talangan</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Pengajuan Talangan</span>
                    <span className="font-medium">Rp{totalPengajuan.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Angsuran Per Bulan</span>
                    <span className="font-medium">Rp{angsuranPerBulan.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Perhitungan ini hanya simulasi, data dapat berubah sesuai dengan ketentuan mitra terkait.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BFI Finance Option (Disabled) */}
        <div className="border-2 border-gray-200 rounded-lg p-6 opacity-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">BFI</span>
              </div>
              <h4 className="text-lg font-semibold">BFI Finance</h4>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-red-600 text-sm font-medium mb-2">
              Travel penyelenggara tidak terdaftar pada program Talangan BFI Finance.{' '}
              <span className="text-blue-600 cursor-pointer">Cari Paket Lain</span>
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Ketentuan</h5>
            <p className="text-sm text-gray-700 mb-2">
              Untuk pengajuan talangan umroh melalui BFI Finance, mohon perhatikan ketentuan berikut:
            </p>
            <ol className="text-sm text-gray-700 space-y-1">
              <li>1. Limit maksimal talangan adalah Rp40.000.000</li>
              <li>2. Pembiayaan hanya berlaku untuk Mitra Travel Umroh terpilih yang bekerjasama dengan BFI Finance.</li>
              <li>3. Pembiayaan ini berlaku untuk 1 (satu) orang jamaah per pengajuan.</li>
              <li>4. Jika jumlah talangan yang disetujui lebih kecil dari pengajuan, maka selisihnya akan menjadi DP (Down Payment) atau uang muka.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Dengan mengirim pengajuan ini, anda menyetujui{' '}
          <span className="text-blue-600 cursor-pointer font-medium">Syarat & Ketentuan</span>{' '}
          yang berlaku.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          className="px-8 py-2 rounded-full"
          onClick={onPrev}
        >
          Batal
        </Button>
        <Button
          type="button"
          className="px-8 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={handleSubmit}
          disabled={!selectedPartner || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Mengirim...</span>
            </div>
          ) : (
            'Kirim'
          )}
        </Button>
      </div>
    </div>
  )
}