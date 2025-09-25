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
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { talanganService, CreditProvider } from '@/services/talangan-service'

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
  const [partners, setPartners] = useState<CreditProvider[]>([])
  const [isLoadingPartners, setIsLoadingPartners] = useState(true)
  const [simulation, setSimulation] = useState<any>(null)

  // Load partners on component mount
  useEffect(() => {
    const loadPartners = async () => {
      try {
        setIsLoadingPartners(true)
        const response = await talanganService.getCreditProviders()
        
        if (response.success) {
          setPartners(response.data)
        } else {
          console.error('Failed to load partners:', response.error)
        }
      } catch (error) {
        console.error('Error loading partners:', error)
      } finally {
        setIsLoadingPartners(false)
      }
    }

    loadPartners()
  }, [])

  const handlePartnerSelect = async (partnerId: string) => {
    setSelectedPartner(partnerId)
    updateFormData({ selectedPartner: partnerId })
    
    // Calculate simulation locally for now
    if (formData.selectedPackage?.price && partnerId) {
      const partner = partners.find(p => p.id === partnerId)
      if (partner?.terms) {
        const amount = parseInt(formData.selectedPackage.price.replace(/\D/g, ''))
        const monthlyRate = partner.terms.interestRate / 100
        const totalInterest = amount * monthlyRate * tenor
        const totalAmount = amount + totalInterest + partner.terms.adminFee
        const monthlyInstallment = totalAmount / tenor
        
        setSimulation({
          totalAmount,
          monthlyInstallment,
          totalInterest,
          adminFee: partner.terms.adminFee
        })
      }
    }
  }

  const handleTenorChange = async (newTenor: string) => {
    const tenorValue = parseInt(newTenor)
    setTenor(tenorValue)
    updateFormData({ tenor: tenorValue })

    // Re-calculate simulation when tenor changes
    if (selectedPartner && formData.selectedPackage?.price) {
      const partner = partners.find(p => p.id === selectedPartner)
      if (partner?.terms) {
        const amount = parseInt(formData.selectedPackage.price.replace(/\D/g, ''))
        const monthlyRate = partner.terms.interestRate / 100
        const totalInterest = amount * monthlyRate * tenorValue
        const totalAmount = amount + totalInterest + partner.terms.adminFee
        const monthlyInstallment = totalAmount / tenorValue
        
        setSimulation({
          totalAmount,
          monthlyInstallment,
          totalInterest,
          adminFee: partner.terms.adminFee
        })
      }
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting || !selectedPartner) return
    
    setIsSubmitting(true)
    
    try {
      // Parse package price safely
      const packagePrice = formData.selectedPackage?.price ? 
        parseInt(formData.selectedPackage.price.toString().replace(/\D/g, '')) : 0
      
      // Create credit submission data for new API
      const submissionData = {
        providerId: selectedPartner,
        amount: packagePrice,
        tenor: tenor,
        purpose: `Talangan Umrah - ${formData.selectedPackage?.title || 'Package'}`,
        personalData: {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          ktp: formData.nik || '', // Assuming NIK is stored in formData
          birthDate: formData.birthDate,
          address: formData.address,
          occupation: formData.job,
          monthlyIncome: formData.monthlyIncome || 0
        },
        documents: {
          ktpUrl: formData.ktpFile ? 'uploaded-ktp-url' : undefined,
          npwpUrl: formData.npwpFile ? 'uploaded-npwp-url' : undefined,
        },
        metadata: {
          packageId: formData.selectedPackage?.id?.toString(),
          travelAgentId: formData.selectedPackage?.organizationName,
          departureDate: formData.selectedPackage?.departureDate
        }
      }
      
      console.log('Submitting credit application:', submissionData)
      
      const response = await talanganService.submitCreditApplication(submissionData)
      
      if (response.success) {
        console.log('Application submitted successfully:', response.data)
        
        // Clear form data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('talanganFormData')
          localStorage.removeItem('talanganCurrentStep')
          sessionStorage.removeItem('talanganFormData')
          sessionStorage.removeItem('talanganCurrentStep')
          sessionStorage.removeItem('talanganSelectedPackage')
        }
        
        // Redirect to banking page
        router.push('/my/banking')
      } else {
        console.error('Application submission failed:', response.error)
        alert('Gagal mengirim aplikasi: ' + (response.error?.message || 'Unknown error'))
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Terjadi kesalahan saat mengirim aplikasi')
      setIsSubmitting(false)
    }
  }

  const selectedPartnerData = partners.find(p => p.id === selectedPartner)

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-lg p-6 lg:p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Pilihan Mitra Tersedia
      </h3>

      {isLoadingPartners ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading partners...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedPartner === partner.id
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePartnerSelect(partner.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center bg-blue-500`}>
                    <span className="text-white text-xs font-bold">{partner.code || partner.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-lg font-semibold">{partner.name}</h4>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedPartner === partner.id
                      ? 'border-yellow-500 bg-yellow-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPartner === partner.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium mb-2">Ketentuan</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(partner.requirements || []).map((req, index) => (
                    <li key={index}>{index + 1}. {req}</li>
                  ))}
                </ul>
                {partner.description && (
                  <p className="text-sm text-gray-600 mt-2 italic">{partner.description}</p>
                )}
              </div>

              {partner.terms && (
                <>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Min. Rp {partner.terms.minAmount.toLocaleString('id-ID')}</span>
                    <span>Max. Rp {partner.terms.maxAmount.toLocaleString('id-ID')}</span>
                    <span>Bunga {partner.terms.interestRate}% / bulan</span>
                  </div>
                  
                  {partner.terms.adminFee > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Admin Fee: Rp {partner.terms.adminFee.toLocaleString('id-ID')}
                    </div>
                  )}
                </>
              )}

              {/* Tenor Selection & Simulation */}
              {selectedPartner === partner.id && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenor *
                    </label>
                    <Select value={tenor.toString()} onValueChange={handleTenorChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {partner.terms && Array.from(
                          { length: Math.floor((partner.terms.maxTenor - partner.terms.minTenor) / 6) + 1 },
                          (_, i) => partner.terms!.minTenor + i * 6
                        ).map((option) => (
                          <SelectItem key={option} value={option.toString()}>
                            {option} bulan
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {simulation && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Simulasi Talangan</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Pengajuan Talangan</span>
                          <span className="font-medium">Rp{simulation.totalAmount?.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Angsuran Per Bulan</span>
                          <span className="font-medium">Rp{simulation.monthlyInstallment?.toLocaleString('id-ID')}</span>
                        </div>
                        {simulation.totalInterest && (
                          <div className="flex justify-between">
                            <span>Total Bunga</span>
                            <span className="font-medium">Rp{simulation.totalInterest?.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        *Perhitungan ini hanya simulasi, data dapat berubah sesuai dengan ketentuan mitra terkait.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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