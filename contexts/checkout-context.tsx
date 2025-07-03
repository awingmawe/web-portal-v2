/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { toast } from '@/components/ui/sonner'
import { Package } from '@/constant/types/PackageProps'
import { PaymentMethod } from '@/constant/types/PaymentMethod'
import { useAuth } from '@/contexts/auth/context'
import { useEventTracker } from '@/contexts/event-tracker/context'
import { getHotelRating, getTripDuration } from '@/lib/utils'
import { cookieNames } from '@/services/common/cookie'
import { getLegalSyarat } from '@/services/general-service'
import { checkRefundPolicy } from '@/services/identity-service'
import {
  bookingCheckout,
  preBookingCreateCheckout,
} from '@/services/umrah-service'
import { checkReferralCode } from '@/services/wukala-service'
import cookie from 'cookie-cutter'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const CheckoutContext = createContext<any>(null)

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { profile } = useAuth() // Get user profile
  const { pushEvent } = useEventTracker()
  const [token, setToken] = useState<string | null>(null)
  const [preBooking, setPreBooking] = useState<any>()
  const [prebookingLoading, setPreBookingLoading] = useState<any>()
  const [paymentDetails, setPaymentDetails] = useState<any>([])
  const [referralCode, setReferralCode] = useState<any>('')
  const [wukalaSetting, setWukalaSetting] = useState<any>()
  const [useMyData, setUseMyData] = useState(false)
  const [jamaahList, setJamaahList] = useState<any>([
    { id: 1, name: '', phone: '' },
  ])
  const [detailVariant, setDetailVariant] = useState<any>(null)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)
  const [isReferralValid, setIsReferralValid] = useState(false)
  const [isReferralCodeChecked, setIsReferralCodeChecked] = useState(false)
  const [paymentToken, setPaymentToken] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState<any>()
  const [dataSK, setDataSk] = useState<any>()
  const [dataRefundPolicy, setDataRefundPolicy] = useState<any>()
  const [nama, setNama] = useState('')
  const [noTlpn, setNoTlpn] = useState('')
  const [selectedRoomType, setSelectedRoomType] = useState<{
    [key: string]: number
  } | null>(null)

  const [parsedContent, setParsedContent] = useState<any>(null)
  const [shouldCheckPreAfterClear, setShouldCheckPreAfterClear] =
    useState(false)
  const [shouldRunCheckPre, setShouldRunCheckPre] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  // Flag to prevent excessive API calls
  const checkPreCalled = useRef(false)
  const isInitialRender = useRef(true)

  useEffect(() => {
    const storedToken = cookie.get(cookieNames.USER_ACCESS_TOKEN)
    setToken(storedToken || null)

    const detailVariantString = localStorage.getItem('detailVariant')
    const selectedVariantString = localStorage.getItem('selectedVariant')

    if (detailVariantString) {
      setDetailVariant(JSON.parse(detailVariantString))
    }

    if (selectedVariantString) {
      const parsed = JSON.parse(selectedVariantString)
      setSelectedVariant(parsed)
      setPaymentAmount(parsed.netAmount)
      setTotalPrice(Number(parsed.price))
    }
  }, [])

  const totalQty = useMemo(() => {
    return (
      (selectedRoomType?.double || 0) +
      (selectedRoomType?.triple || 0) +
      (selectedRoomType?.quad || 0)
    )
  }, [selectedRoomType])

  // Fix: Separate the side effect from the dependency change
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (totalQty !== 0) {
      // Update slider value based on payment amount and jamaah count
      // without triggering additional state updates
      const newSliderValue = paymentAmount * totalQty
      if (newSliderValue !== sliderValue) {
        setSliderValue(newSliderValue)
      }

      // Mark that we should run checkPre, but don't run it directly here
      setShouldRunCheckPre(true)
    }
  }, [totalQty, paymentAmount])

  // Separate effect to handle checkPre calls
  useEffect(() => {
    if (shouldRunCheckPre && !checkPreCalled.current) {
      checkPreCalled.current = true
      checkPre().finally(() => {
        checkPreCalled.current = false
      })
      setShouldRunCheckPre(false)
    }
  }, [shouldRunCheckPre])

  useEffect(() => {
    setRawInputValue(String(paymentAmount * totalQty))
  }, [selectedRoomType])

  const handleAddJamaah = () => {
    const newId = totalQty + 1
    setJamaahList([...jamaahList, { id: newId, name: '', phone: '' }])
  }

  const handleJamaahNameChange = (id: any, value: any) => {
    const updatedList = jamaahList.map((jamaah: any) =>
      jamaah.id === id ? { ...jamaah, name: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handleJamaahPhoneChange = (id: any, value: any) => {
    const updatedList = jamaahList.map((jamaah: any) =>
      jamaah.id === id ? { ...jamaah, phone: value } : jamaah
    )
    setJamaahList(updatedList)
  }

  const handleRemoveJamaah = (id: number) => {
    if (totalQty === 1) {
      toast.error('Minimal 1 jamaah')
      return
    }
    setJamaahList((prev: any) =>
      prev
        .filter((j: any) => j.id !== id)
        .map((j: any, index: number) => ({
          ...j,
          id: index + 1, // assign ulang id berdasarkan urutan
        }))
    )
  }
  const router = useRouter()
  const checkPre = async () => {
    if (!selectedVariant || !token) return
    setPreBookingLoading(true)
    try {
      const response = await preBookingCreateCheckout({
        packageVariantId: selectedVariant?.variantId,
        referralCode,
        netAmount: paymentAmount * totalQty,
        double: selectedRoomType?.double || 0,
        triple: selectedRoomType?.triple || 0,
        quad: selectedRoomType?.quad || 0,
      })
      setRawInputValue(String(response.downPayment))
      setPreBookingLoading(false)
      setPaymentDetails(response.paymentDetails)
      setPreBooking(response)
    } catch (error) {
      setPreBookingLoading(false)
      console.error(error)
    }
  }

  const [termsAccepted, setTermsAccepted] = useState(false)

  // Validation function to check if all jamaah fields are filled
  const isJamaahDataValid = () => {
    if (totalQty === 0) return false

    return jamaahList.every(
      (jamaah: any) =>
        jamaah.name &&
        jamaah.name.trim() !== '' &&
        jamaah.phone &&
        jamaah.phone.trim() !== ''
    )
  }

  // Validation function to check if the room type is empty
  const isEmptyRoomType = useMemo(() => {
    return (
      (selectedRoomType?.double === 0 ||
        selectedRoomType?.double === undefined) &&
      (selectedRoomType?.triple === 0 ||
        selectedRoomType?.triple === undefined) &&
      (selectedRoomType?.quad === 0 || selectedRoomType?.quad === undefined)
    )
  }, [selectedRoomType])

  // Function to handle checkout button click
  const handleCheckout = async (paymentMethod?: PaymentMethod) => {
    const netAmount = Math.min(
      paymentAmount * totalQty,
      preBooking?.downPayment
    )
    const payload = {
      packageVariantId: selectedVariant?.variantId,
      referralCode,
      netAmount,
      double: selectedRoomType?.double || 0,
      triple: selectedRoomType?.triple || 0,
      quad: selectedRoomType?.quad || 0,
      paymentMethod,
    }
    console.log(payload)

    setLoading(true)
    try {
      const res = await bookingCheckout(payload)
      setBooking(res?.data)
      setPaymentToken(res?.data.order.paymentToken)
      setLoading(false)

      handlePushEvent('submit_booking')

      if (paymentMethod?.linkAja) {
        window.location.href = res?.data.order.paymentLink

        return
      }

      window.snap.pay(res?.data.order.paymentToken, {
        onSuccess: async () => {
          // console.log(result)
          router.push(`/my/transaction`)
        },
        onPending: async () => {
          // console.log('Payment pending', result)
          router.push(`/my/need-payment`)
          // Add expiration check logic
        },
        onError: (error: any) => {
          console.log('Payment error', error)
        },
        onClose: () => {
          router.push(`/my/need-payment`)
          // Additional logic on close
        },
      })

      localStorage.removeItem('referralCode')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckReferral = async () => {
    setIsReferralCodeChecked(false)
    setIsReferralValid(false)
    try {
      const res = await checkReferralCode(referralCode)

      setIsReferralCodeChecked(true)
      setIsReferralValid(true)
      setWukalaSetting(res)

      // Signal that we should run checkPre
      setShouldRunCheckPre(true)
    } catch (error: any) {
      console.log(error)
      setIsReferralCodeChecked(true)
      setIsReferralValid(false)
      setWukalaSetting(undefined)
    }
  }

  // Function to handle "use my data" checkbox
  const handleUseMyDataChange = (checked: any) => {
    setUseMyData(checked)

    if (totalQty > 0) {
      if (checked && profile) {
        const name = profile.name || ''
        const phone = profile.persona?.phoneNumber || ''

        // Update state directly
        setJamaahList((prevList: any) =>
          prevList.map((jamaah: any) =>
            jamaah.id === 1 ? { ...jamaah, name, phone } : jamaah
          )
        )
      } else if (!checked) {
        // Clear data directly
        setJamaahList((prevList: any) =>
          prevList.map((jamaah: any) =>
            jamaah.id === 1 ? { ...jamaah, name: '', phone: '' } : jamaah
          )
        )
      }
    }
  }
  const handleUseMyDataChangeMobile = () => {
    if (profile) {
      const name = profile.name || ''
      const phone = profile.persona?.phoneNumber || ''

      // Generate a unique ID for the new jamaah
      const newId = Date.now().toString()

      // Check if the list is empty first
      if (totalQty === 0) {
        // If list is empty, add the profile data as the first jamaah
        setJamaahList([{ id: newId, name, phone }])
      } else {
        // If the list already has entries, add a new one with the profile data
        setJamaahList([...jamaahList, { id: newId, name, phone }])
      }
    }
  }

  const handleSimpanMobile = () => {
    // Generate a unique ID for the new jamaah
    const newId = Date.now().toString()

    // Check if the list is empty first
    if (totalQty === 0) {
      // If list is empty, add the profile data as the first jamaah
      setJamaahList([{ id: newId, name: nama, phone: noTlpn }])
    } else {
      // If the list already has entries, add a new one with the profile data
      setJamaahList([...jamaahList, { id: newId, name: nama, phone: noTlpn }])
    }
  }

  const handleEditMobile = (data: any) => {
    if (!data || !data.id) return

    const updatedList = jamaahList.map((item: any) =>
      item.id === data.id ? { ...item, name: nama, phone: noTlpn } : item
    )

    setJamaahList(updatedList)
  }
  const handleRemoveReferralCode = () => {
    setReferralCode('')
    setIsReferralValid(false)
    setIsReferralCodeChecked(false)
    setWukalaSetting(undefined)
    setShouldCheckPreAfterClear(true)
  }

  const handlePushEvent = (eventName: string) => {
    pushEvent({
      name: eventName,
      topic: 'umrah',
      category: 'checkout',
      data: {
        packageId: detailVariant?.package.id,
        packageType: detailVariant?.package.packageType,
        title: detailVariant?.package.title,
        slug: detailVariant?.package.slug,
        hotelRating: getHotelRating(detailVariant?.package),
        tripDuration: getTripDuration({
          packageVariant: detailVariant,
        } as Package),
        travelName: detailVariant?.package.organizationInstance.name,
        travelCity: detailVariant?.package.organizationInstance.city.name,
        travelCityId: detailVariant?.package.organizationInstance.cityId,
        travelProvinceName:
          detailVariant?.package.organizationInstance.province.name,
        travelProvinceId:
          detailVariant?.package.organizationInstance.provinceId,
        lastCall: selectedVariant?.isLastCall,
        price: preBooking?.subtotalPrice,
        organizationId: detailVariant?.package.organizationId,
        organizationInstanceId: detailVariant?.package.organizationInstanceId,
        roomType: selectedVariant?.roomType,
        variantId: selectedVariant?.id,
        variantName: selectedVariant?.name,
        departureDate: selectedVariant?.departureDate,
        quantity: totalQty,
        referralCode,
        netAmount: sliderValue,
      },
    })
  }

  // Fix: Clearly separate the condition for running checkPre after referral code is cleared
  useEffect(() => {
    if (shouldCheckPreAfterClear && referralCode === '') {
      // Reset the flag first to prevent repeated calls
      setShouldCheckPreAfterClear(false)
      setShouldRunCheckPre(true)
    }
  }, [referralCode, shouldCheckPreAfterClear])

  const totalMinimumDownPayment = totalQty === 0 ? 0 : paymentAmount * totalQty
  const [rawInputValue, setRawInputValue] = useState('')

  // Fixed: Only update the raw input when the slider value changes significantly
  useEffect(() => {
    const formattedValue = sliderValue.toLocaleString('id-ID')
    const currentNumericValue = rawInputValue.replace(/\D/g, '')

    // Only update if values are actually different to prevent cycles
    if (parseInt(currentNumericValue || '0', 10) !== sliderValue) {
      setRawInputValue(formattedValue)
    }
  }, [sliderValue])

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '') // hapus semua selain angka
    if (!numericValue) return ''
    return parseInt(numericValue, 10).toLocaleString('id-ID')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const numeric = input.replace(/\D/g, '')
    setRawInputValue(numeric) // simpan angka mentah (tanpa titik)
  }

  // Fix: Completely rebuilt debounce implementation for slider changes
  const debounceTimerRef = useRef<any>(null)
  const pendingValueRef = useRef<number | null>(null)

  const handleSliderChange = (e: any) => {
    // Store the value in a ref instead of state to avoid render loops
    const value = parseInt(e.target.value)
    pendingValueRef.current = value

    // Update UI immediately for better responsiveness
    setSliderValue(value)

    // Clear any existing timer for API calls/expensive operations
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer only for expensive operations (API calls, etc)
    debounceTimerRef.current = setTimeout(() => {
      // Update payment amount if we have jamaah
      if (totalQty > 0) {
        const perJamaahAmount = Math.ceil(value / totalQty)
        if (perJamaahAmount !== paymentAmount) {
          setPaymentAmount(perJamaahAmount)
          setShouldRunCheckPre(true)
          // Trigger checkPre only after settling on a value
          // if (!checkPreCalled.current) {
          //   checkPreCalled.current = true
          //   checkPre().finally(() => {
          //     checkPreCalled.current = false
          //   })
          // }
        }
      }

      pendingValueRef.current = null
    }, 100) // Reduced to 100ms for better responsiveness
  }

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const getLegal = async () => {
    try {
      const res = await getLegalSyarat()
      setDataSk(res.results[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (detailVariant) {
      getRefundPolicy()
    }
  }, [detailVariant])

  useEffect(() => {
    getLegal()
  }, [])

  const getRefundPolicy = async () => {
    try {
      const response = await checkRefundPolicy(
        detailVariant.package?.organizationInstance?.id
      )
      setDataRefundPolicy(response)
      const parsedContent = response?.kondisi
        ? JSON.parse(response?.kondisi)
        : ''
      setParsedContent(parsedContent)
    } catch (error) {
      console.error(error)
    }
  }

  const value = {
    token,
    prebookingLoading,
    preBooking,
    setPreBooking,
    paymentDetails,
    setPaymentDetails,
    referralCode,
    setReferralCode,
    useMyData,
    setUseMyData,
    jamaahList,
    setJamaahList,
    detailVariant,
    selectedVariant,
    paymentAmount,
    setPaymentAmount,
    totalPrice,
    handleAddJamaah,
    handleJamaahNameChange,
    handleJamaahPhoneChange,
    handleRemoveJamaah,
    checkPre,
    totalMinimumDownPayment,
    sliderValue,
    setSliderValue,
    handleUseMyDataChange,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isJamaahDataValid,
    handleCheckReferral,
    isReferralValid,
    isReferralCodeChecked,
    wukalaSetting,
    handleRemoveReferralCode,
    paymentToken,
    booking,
    loading,
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    handleUseMyDataChangeMobile,
    setNoTlpn,
    setNama,
    nama,
    noTlpn,
    handleSimpanMobile,
    handleEditMobile,
    selectedRoomType,
    setSelectedRoomType,
    isEmptyRoomType,
    setShouldRunCheckPre,
    totalQty,
    selectedPayment,
    setSelectedPayment,
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => useContext(CheckoutContext)
