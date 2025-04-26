/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useAuth } from '@/contexts/auth/context'
import { cookieNames } from '@/services/common/cookie'
import { bookingCheckout, preBookingCheckout } from '@/services/umrah-service'
import { checkReferralCode } from '@/services/wukala-service'
import cookie from 'cookie-cutter'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

export const CheckoutContext = createContext<any>(null)

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { profile } = useAuth() // Get user profile
  const [token, setToken] = useState<string | null>(null)
  const [preBooking, setPreBooking] = useState<any>()
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
  const [shouldCheckPreAfterClear, setShouldCheckPreAfterClear] =
    useState(false)

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

  useEffect(() => {
    setSliderValue(paymentAmount * jamaahList.length)
  }, [jamaahList.length, paymentAmount])

  useEffect(() => {
    checkPre()
  }, [paymentAmount, jamaahList])

  const handleAddJamaah = () => {
    const newId = jamaahList.length + 1
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
    setJamaahList((prev: any) => prev.filter((j: any) => j.id !== id))
  }
  const router = useRouter()
  const checkPre = async () => {
    if (!selectedVariant || !token) return
    try {
      const perJamaahAmount = paymentAmount
      const response = await preBookingCheckout({
        roomType: selectedVariant?.roomType,
        packageVariantId: selectedVariant?.variantId,
        netAmount: perJamaahAmount * jamaahList.length,
        referralCode,
        quantity: jamaahList.length,
        manifest: jamaahList,
      })
      setPaymentDetails(response.paymentDetails)
      setPreBooking(response)
    } catch (error) {
      console.error(error)
    }
  }

  const [termsAccepted, setTermsAccepted] = useState(false)

  // Validation function to check if all jamaah fields are filled
  const isJamaahDataValid = () => {
    if (jamaahList.length === 0) return false

    return jamaahList.every(
      (jamaah: any) =>
        jamaah.name &&
        jamaah.name.trim() !== '' &&
        jamaah.phone &&
        jamaah.phone.trim() !== ''
    )
  }

  // Function to handle checkout button click
  const handleCheckout = async () => {
    const perJamaahAmount = paymentAmount

    const payload = {
      roomType: selectedVariant?.roomType,
      packageVariantId: selectedVariant?.variantId,
      netAmount: perJamaahAmount * jamaahList.length,
      referralCode,
      quantity: jamaahList.length,
      manifest: jamaahList.map((item: { name: string; phone: string }) => ({
        name: item.name,
        phoneNumber: item.phone,
      })),
    }
    try {
      setLoading(true)
      const res = await bookingCheckout(payload)
      setBooking(res?.data)
      setPaymentToken(res?.data.order.paymentToken)
      setLoading(false)
      window.snap.pay(res?.data.order.paymentToken, {
        onSuccess: async (result: any) => {
          // console.log(result)
          router.push(`/my/transaction`)
        },
        onPending: async (result: any) => {
          // console.log('Payment pending', result)
          router.push(`/my/need-payment`)
          // Add expiration check logic
        },
        onError: (error: any) => {},
        onClose: () => {
          router.push(`/my/need-payment`)
          // Additional logic on close
        },
      })
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const handleCheckReferral = async () => {
    setIsReferralCodeChecked(false)
    setIsReferralValid(false)
    try {
      const res = await checkReferralCode(referralCode)
      checkPre()
      setIsReferralCodeChecked(true)
      setIsReferralValid(true)
      setWukalaSetting(res)
    } catch (error: any) {
      setIsReferralCodeChecked(true)
      setIsReferralValid(false)
      setWukalaSetting(undefined)
    }
  }

  // Function to handle "use my data" checkbox
  const handleUseMyDataChange = (checked: any) => {
    setUseMyData(checked)

    if (jamaahList.length > 0) {
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
  const handleRemoveReferralCode = () => {
    setReferralCode('')
    setIsReferralValid(false)
    setIsReferralCodeChecked(false)
    setWukalaSetting(undefined)
    setShouldCheckPreAfterClear(true)
    // dispatch(setWukalaSetting(undefined))
  }
  useEffect(() => {
    if (shouldCheckPreAfterClear && referralCode === '') {
      checkPre()
      setShouldCheckPreAfterClear(false)
    }
  }, [referralCode, shouldCheckPreAfterClear])
  const totalMinimumDownPayment = paymentAmount * jamaahList.length
  const [rawInputValue, setRawInputValue] = useState(
    sliderValue.toLocaleString('id-ID')
  )
  useEffect(() => {
    // Sync input display when sliderValue changes externally
    setRawInputValue(sliderValue.toLocaleString('id-ID'))
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

  const value = {
    token,
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
  }

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => useContext(CheckoutContext)
