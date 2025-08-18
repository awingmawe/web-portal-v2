'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import StepIndicator from './components/StepIndicator'
import DataDiriStep from './steps/DataDiriStep'
import FormPengajuanStep from './steps/FormPengajuanStep'
import PemilihanMitraStep from './steps/PemilihanMitraStep'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { CardData } from '@/constant/types/PackageProps'

export interface TalanganFormData {
  // Step 1: Data Diri
  fullName: string
  email: string
  phoneNumber: string
  birthDate: string
  gender: 'pria' | 'wanita' | ''
  job: string
  cityId: string
  cityName: string
  provinceId: string
  provinceName: string
  address: string
  ktpFile: File | null
  npwpFile: File | null
  
  // Step 2: Package Selection
  selectedPackage: CardData | null
  
  // Step 3: Partner Selection
  selectedPartner: string
  tenor: number
}

const initialFormData: TalanganFormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  gender: '',
  job: '',
  cityId: '',
  cityName: '',
  provinceId: '',
  provinceName: '',
  address: '',
  ktpFile: null,
  npwpFile: null,
  selectedPackage: null,
  selectedPartner: '',
  tenor: 24,
}

export default function TalanganFormPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TalanganFormData>(initialFormData)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Load form data and selected package from session storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('TalanganFormPage: Loading from sessionStorage...')
      
      const savedFormData = sessionStorage.getItem('talanganFormData')
      const savedCurrentStep = sessionStorage.getItem('talanganCurrentStep')
      const selectedPackageData = sessionStorage.getItem('talanganSelectedPackage')
      const urlStep = searchParams.get('step')
      
      console.log('SessionStorage and URL values:', {
        savedFormData: !!savedFormData,
        savedCurrentStep,
        selectedPackageData: !!selectedPackageData,
        urlStep
      })
      
      // Load saved form data first
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData)
          setFormData(parsedData)
          console.log('Form data loaded:', parsedData)
        } catch (error) {
          console.error('Error parsing saved form data:', error)
        }
      }
      
      // Load package data if exists
      if (selectedPackageData) {
        try {
          const packageData = JSON.parse(selectedPackageData)
          console.log('Package data found:', packageData)
          setFormData(prev => ({
            ...prev,
            selectedPackage: packageData
          }))
          // Don't clear the package data here - let it persist until form is submitted
        } catch (error) {
          console.error('Error parsing selected package data:', error)
        }
      }
      
      // Determine which step to show - URL parameter has HIGHEST priority
      if (urlStep && parseInt(urlStep) >= 1 && parseInt(urlStep) <= 3) {
        const step = parseInt(urlStep)
        console.log('Using URL step parameter:', step)
        setCurrentStep(step)
      } else if (selectedPackageData) {
        console.log('Package data found - Going to step 2!')
        setCurrentStep(2)
      } else if (savedCurrentStep) {
        const step = parseInt(savedCurrentStep, 10)
        if (step >= 1 && step <= 3) {
          console.log('Using saved step:', step)
          setCurrentStep(step)
        } else {
          console.log('Invalid saved step, starting at step 1')
          setCurrentStep(1)
        }
      } else {
        console.log('First time visit - Starting at step 1')
        setCurrentStep(1)
      }
      
      // Mark initial load as complete
      setIsInitialLoad(false)
    }
  }, [searchParams])

  // Save form data and current step to session storage whenever they change (skip initial load)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialLoad) {
      console.log('Auto-saving form data and step:', currentStep)
      sessionStorage.setItem('talanganFormData', JSON.stringify(formData))
      sessionStorage.setItem('talanganCurrentStep', currentStep.toString())
    }
  }, [formData, currentStep, isInitialLoad])

  const updateFormData = (data: Partial<TalanganFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }))
  }

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Curved Background */}
      <div className="lg:hidden">
        <div className="relative bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-b-[2rem] px-4 py-6 pb-16">
          <div className="flex items-center mb-6">
            <Link href="/banking/credit">
              <ChevronLeft size={24} className="text-white mr-3" />
            </Link>
            <h1 className="text-xl font-semibold text-white">Talangan Umroh</h1>
          </div>
          
          {/* Step Indicator for Mobile */}
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-white text-yellow-500' : 'bg-yellow-300 text-yellow-600'
            } font-semibold text-sm`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 2 ? 'bg-white' : 'bg-yellow-300'
            } rounded`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-white text-yellow-500' : 'bg-yellow-300 text-yellow-600'
            } font-semibold text-sm`}>
              2
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 3 ? 'bg-white' : 'bg-yellow-300'
            } rounded`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-white text-yellow-500' : 'bg-yellow-300 text-yellow-600'
            } font-semibold text-sm`}>
              3
            </div>
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-between mt-2 px-2">
            <span className="text-white text-xs font-medium">Data Diri</span>
            <span className="text-white text-xs font-medium">Form Pengajuan</span>
            <span className="text-white text-xs font-medium">Pilih Mitra</span>
          </div>
        </div>
      </div>

      {/* Desktop Back Button */}
      <div className="hidden lg:block">
        <div className="bg-white p-6">
          <Link href="/banking/credit">
            <div className="flex cursor-pointer items-center text-gray-800 hover:text-gray-600">
              <ChevronLeft size={24} className="mr-2" />
              <span className="text-xl font-semibold">Kembali</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6 lg:py-8">
        {/* Desktop Step Indicator */}
        <div className="hidden lg:block">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Form Content */}
        <div className="mt-8 lg:mt-8">
          {currentStep === 1 && (
            <DataDiriStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <FormPengajuanStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}
          
          {currentStep === 3 && (
            <PemilihanMitraStep
              formData={formData}
              updateFormData={updateFormData}
              onPrev={goToPrevStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}