import { LOCAL_STORAGE_PEMBIAYAAN } from '@/constant/env'
import { PembiayaanDataLocalStorage } from '@/constant/types/Pembiayaan'
import { localStorageUtils } from '@/hooks/common/useLocalStorage'
import { useMemo } from 'react'

/**
 * Hook untuk generate event data package pembiayaan
 * Digunakan untuk tracking events terkait package yang dipilih
 * @returns Event data object dengan informasi package
 */
export const usePembiayaanPackageEventData = () => {
  const eventData = useMemo(() => {
    const pembiayaanData = localStorageUtils.getJSON(
      LOCAL_STORAGE_PEMBIAYAAN
    ) as PembiayaanDataLocalStorage
    const selectedPackage = pembiayaanData?.selectedPackage

    return {
      packageId: selectedPackage?.packageId || null,
      packageType: selectedPackage ? 'umrah' : null,
      title: selectedPackage?.packageName || null,
      slug: selectedPackage?.packageSlug || null,
      hotelRating: selectedPackage?.hotelRating || null,
      tripDuration: selectedPackage?.tripDuration || null,
      travelName: selectedPackage?.organizationName || null,
      travelCity: selectedPackage?.organizationCity || null,
      travelCityId: selectedPackage?.organizationCityId || null,
      travelProvinceName: selectedPackage?.organizationProvince || null,
      travelProvinceId: selectedPackage?.organizationProvinceId || null,
      section: selectedPackage?.section || 'landing',
      isLastCall: selectedPackage?.isLastCall || null,
      price: pembiayaanData?.price || null,
      organizationId: selectedPackage?.organizationId || null,
      organizationInstanceId: selectedPackage?.organizationId || null,
    }
  }, [])

  return eventData
}

/**
 * Hook untuk generate event data calculation pembiayaan
 * Digunakan untuk tracking events terkait kalkulasi tenor & total price
 * @returns Event data object dengan informasi calculation
 */
export const usePembiayaanCalculationEventData = () => {
  const eventData = useMemo(() => {
    const pembiayaanData = localStorageUtils.getJSON(
      LOCAL_STORAGE_PEMBIAYAAN
    ) as PembiayaanDataLocalStorage

    return {
      totalPrice: pembiayaanData?.price || null,
      tenor: pembiayaanData?.tenor || null,
    }
  }, [])

  return eventData
}

/**
 * Hook untuk generate event data form submission pembiayaan
 * Digunakan untuk tracking events terkait form submission
 * @returns Event data object dengan informasi form dan package
 */
export const usePembiayaanFormEventData = () => {
  const eventData = useMemo(() => {
    const pembiayaanData = localStorageUtils.getJSON(
      LOCAL_STORAGE_PEMBIAYAAN
    ) as PembiayaanDataLocalStorage
    const selectedPackage = pembiayaanData?.selectedPackage
    const formData = pembiayaanData?.formData

    return {
      // Form Data
      name: formData?.name || null,
      email: formData?.email || null,
      phoneNumber: formData?.phone_number || null,
      born: formData?.born || null,
      gender: formData?.gender || null,
      job: formData?.job || null,
      provinceName: formData?.provinceName || null,
      provinceId: formData?.provinceId || null,
      cityName: formData?.cityName || null,
      cityId: formData?.cityId || null,
      districtName: formData?.districtName || null,
      districtId: formData?.districtId || null,
      postcode: formData?.postalCode || null,
      address: formData?.address || null,

      // Package Data
      packageId: selectedPackage?.packageId || null,
      packageType: selectedPackage ? 'umrah' : null,
      title: selectedPackage?.packageName || null,
      slug: selectedPackage?.packageSlug || null,
      hotelRating: selectedPackage?.hotelRating || null,
      tripDuration: selectedPackage?.tripDuration || null,
      travelName: selectedPackage?.organizationName || null,
      travelCity: selectedPackage?.organizationCity || null,
      travelCityId: selectedPackage?.organizationCityId || null,
      travelProvinceName: selectedPackage?.organizationProvince || null,
      travelProvinceId: selectedPackage?.organizationProvinceId || null,
      price: pembiayaanData?.price || null,
      organizationId: selectedPackage?.organizationId || null,
      organizationInstanceId: selectedPackage?.organizationId || null,

      // Additional Data
      roomTypeQuantity: pembiayaanData?.totalQty || null,
      providers: pembiayaanData?.provider || null,
      manifest: formData?.manifest || null,
    }
  }, [])

  return eventData
}

// Template untuk future hooks:
// export const usePembiayaanProviderEventData = () => { ... }
