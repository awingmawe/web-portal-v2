// components/FormLokasi.tsx
'use client'

import {
  LayoutSelectDrawer,
  SelectOption,
} from '@/components/shared/LayoutSelectDrawer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  City,
  District,
  Province,
  SubdistrictPostalCode,
} from '@/constant/types/LocationProps'
import {
  useGetCityInfinite,
  useGetDistrictInfinite,
  useGetProvinceInfinite,
  useGetSubDistrictInfinite,
} from '@/services/hooks/identity/location-api'

import { Fragment, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface FormLokasiProps {
  form: UseFormReturn<any>
  disabled?: boolean
}

const FormLokasi = ({ form, disabled = false }: FormLokasiProps) => {
  // Watch values untuk dependency
  const provinceId = form.watch('provinceId')
  const cityId = form.watch('cityId')
  const districtId = form.watch('districtId')

  const {
    data: provinces,
    isLoading: loadingProvinces,
    isLoadingMore: loadingMoreProvinces,
    isReachingEnd: provinceReachingEnd,
    loadMore: loadMoreProvinces,
  } = useGetProvinceInfinite(
    { size: 20 }, // 20 items per page
    { showErrorToast: false }
  )

  const {
    data: cities,
    isLoading: loadingCities,
    isLoadingMore: loadingMoreCities,
    isReachingEnd: cityReachingEnd,
    loadMore: loadMoreCities,
  } = useGetCityInfinite(
    { size: 20, provinceId },
    {
      showErrorToast: false,
      isPaused: () => !provinceId,
    }
  )

  const {
    data: districts,
    isLoading: loadingDistricts,
    isLoadingMore: loadingMoreDistricts,
    isReachingEnd: districtReachingEnd,
    loadMore: loadMoreDistricts,
  } = useGetDistrictInfinite(
    { size: 20, cityId },
    {
      showErrorToast: false,
      isPaused: () => !cityId,
    }
  )

  const {
    data: subDistricts,
    isLoading: loadingSubDistricts,
    isLoadingMore: loadingMoreSubDistricts,
    isReachingEnd: subDistrictReachingEnd,
    loadMore: loadMoreSubDistricts,
  } = useGetSubDistrictInfinite(
    { size: 20, districtId },
    {
      showErrorToast: false,
      isPaused: () => !districtId,
    }
  )

  // Reset cascade fields ketika parent berubah
  useEffect(() => {
    if (provinceId) {
      form.setValue('cityId', '')
      form.setValue('cityName', '')
      form.setValue('districtId', '')
      form.setValue('districtName', '')
      form.setValue('postalCode', '')
    }
  }, [provinceId, form])

  useEffect(() => {
    if (cityId) {
      form.setValue('districtId', '')
      form.setValue('districtName', '')
      form.setValue('postalCode', '')
    }
  }, [cityId, form])

  useEffect(() => {
    if (districtId) {
      form.setValue('postalCode', '')
    }
  }, [districtId, form])

  // Transform data ke format SelectOption
  const provinceOptions: SelectOption[] =
    provinces?.map((province: Province) => ({
      value: province.id,
      label: province.name,
      ...province,
    })) || []

  const cityOptions: SelectOption[] =
    cities?.map((city: City) => ({
      value: city.id,
      label: city.name,
      ...city,
    })) || []

  const districtOptions: SelectOption[] =
    districts?.map((district: District) => ({
      value: district.id,
      label: district.name,
      ...district,
    })) || []

  const subDistrictOptions: SelectOption[] =
    subDistricts?.map((subDistrict: SubdistrictPostalCode) => ({
      value: subDistrict.postalCode,
      label: subDistrict.postalCode,
      ...subDistrict,
    })) || []

  return (
    <Fragment>
      {/* Provinsi */}
      <FormField
        control={form.control}
        name="provinceId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>Provinsi *</FormLabel>
            <FormControl>
              <LayoutSelectDrawer
                value={field.value}
                onChangeAction={(value, option) => {
                  field.onChange(value)
                  form.setValue('provinceName', option?.label || '')
                }}
                options={provinceOptions}
                placeholder="Pilih provinsi"
                searchPlaceholder="Cari provinsi..."
                emptyText="Provinsi tidak ditemukan"
                disabled={disabled}
                loading={loadingProvinces}
                // ✅ Infinite scroll props
                hasMore={!provinceReachingEnd}
                isLoadingMore={loadingMoreProvinces}
                onLoadMore={loadMoreProvinces}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Kabupaten/Kota */}
      <FormField
        control={form.control}
        name="cityId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>Kabupaten/Kota *</FormLabel>
            <FormControl>
              <LayoutSelectDrawer
                value={field.value}
                onChangeAction={(value, option) => {
                  field.onChange(value)
                  form.setValue('cityName', option?.label || '')
                }}
                options={cityOptions}
                placeholder={
                  !provinceId
                    ? 'Pilih provinsi terlebih dahulu'
                    : 'Pilih kabupaten/kota'
                }
                searchPlaceholder="Cari kabupaten/kota..."
                emptyText="Kabupaten/kota tidak ditemukan"
                disabled={disabled || !provinceId}
                loading={loadingCities}
                // ✅ Infinite scroll props
                hasMore={!cityReachingEnd}
                isLoadingMore={loadingMoreCities}
                onLoadMore={loadMoreCities}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Kecamatan */}
      <FormField
        control={form.control}
        name="districtId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>Kecamatan *</FormLabel>
            <FormControl>
              <LayoutSelectDrawer
                value={field.value}
                onChangeAction={(value, option) => {
                  field.onChange(value)
                  form.setValue('districtName', option?.label || '')
                }}
                options={districtOptions}
                placeholder={
                  !cityId
                    ? 'Pilih kabupaten/kota terlebih dahulu'
                    : 'Pilih kecamatan'
                }
                searchPlaceholder="Cari kecamatan..."
                emptyText="Kecamatan tidak ditemukan"
                disabled={disabled || !cityId}
                loading={loadingDistricts}
                // ✅ Infinite scroll props
                hasMore={!districtReachingEnd}
                isLoadingMore={loadingMoreDistricts}
                onLoadMore={loadMoreDistricts}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Kode Pos (Kelurahan/Desa) */}
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>Kode Pos *</FormLabel>
            <FormControl>
              <LayoutSelectDrawer
                value={field.value}
                onChangeAction={(value, option) => {
                  field.onChange(value)
                  form.setValue('subDistrictName', option?.name || '')
                }}
                options={subDistrictOptions}
                placeholder={
                  !districtId
                    ? 'Pilih kecamatan terlebih dahulu'
                    : 'Pilih kelurahan/kode pos'
                }
                searchPlaceholder="Cari kelurahan atau kode pos..."
                emptyText="Kelurahan tidak ditemukan"
                disabled={disabled || !districtId}
                loading={loadingSubDistricts}
                // ✅ Infinite scroll props
                hasMore={!subDistrictReachingEnd}
                isLoadingMore={loadingMoreSubDistricts}
                onLoadMore={loadMoreSubDistricts}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  )
}

export default FormLokasi
