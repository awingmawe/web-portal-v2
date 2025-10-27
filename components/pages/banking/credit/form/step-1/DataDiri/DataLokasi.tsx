// components/FormLokasi.tsx
'use client'

import { FormMessageErrorLayout } from '@/components/pages/banking/credit/form/step-1/MainForm'
import {
  LayoutSelectDrawer,
  SelectOption,
} from '@/components/shared/LayoutSelectDrawer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  City,
  District,
  Province,
  SubdistrictPostalCode,
} from '@/constant/types/LocationProps'
import { capitalizeText, isEmpty } from '@/lib/utils'
import {
  useGetCityInfinite,
  useGetDistrictInfinite,
  useGetProvinceInfinite,
  useGetSubDistrictInfinite,
} from '@/services/hooks/identity/location-api'
import { PAGE_SIZE } from '@/services/use-swr-fetcher'

import { Fragment, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface FormLokasiProps {
  form: UseFormReturn<any>
  disabled?: boolean
}

const FormLokasi = ({ form, disabled = false }: FormLokasiProps) => {
  // Watch values untuk dependency
  const provinceId = form.watch('provinceId')
  const cityId = form.watch('cityId')
  const districtId = form.watch('districtId')

  const [inputProvince, setInputProvince] = useState('')
  const [inputCity, setInputCity] = useState('')
  const [inputDistrict, setInputDistrict] = useState('')
  const [inputSubDistrict, setInputSubDistrict] = useState('')

  const debouncedProvince = useDebounce(inputProvince, 500)
  const debouncedCity = useDebounce(inputCity, 500)
  const debouncedDistrict = useDebounce(inputDistrict, 500)
  const debouncedSubDistrict = useDebounce(inputSubDistrict, 500)

  const {
    data: provinces,
    isLoading: loadingProvinces,
    isLoadingMore: loadingMoreProvinces,
    isReachingEnd: provinceReachingEnd,
    loadMore: loadMoreProvinces,
  } = useGetProvinceInfinite(
    {
      size: PAGE_SIZE,
      ['name:likeLower']: isEmpty(debouncedProvince)
        ? undefined
        : `%${debouncedProvince}%`,
    },
    { showErrorToast: false }
  )

  const {
    data: cities,
    isLoading: loadingCities,
    isLoadingMore: loadingMoreCities,
    isReachingEnd: cityReachingEnd,
    loadMore: loadMoreCities,
  } = useGetCityInfinite(
    {
      size: 20,
      provinceId,
      ['name:likeLower']: isEmpty(debouncedCity)
        ? undefined
        : `%${debouncedCity}%`,
    },
    {
      showErrorToast: false,
    }
  )

  const {
    data: districts,
    isLoading: loadingDistricts,
    isLoadingMore: loadingMoreDistricts,
    isReachingEnd: districtReachingEnd,
    loadMore: loadMoreDistricts,
  } = useGetDistrictInfinite(
    {
      size: 20,
      cityId,
      ['name:likeLower']: isEmpty(debouncedDistrict)
        ? undefined
        : `%${debouncedDistrict}%`,
    },
    {
      showErrorToast: false,
    }
  )

  const {
    data: subDistricts,
    isLoading: loadingSubDistricts,
    isLoadingMore: loadingMoreSubDistricts,
    isReachingEnd: subDistrictReachingEnd,
    loadMore: loadMoreSubDistricts,
  } = useGetSubDistrictInfinite(
    {
      size: 20,
      districtId,
      ['name:likeLower']: isEmpty(debouncedSubDistrict)
        ? undefined
        : `%${debouncedSubDistrict}%`,
    },
    {
      showErrorToast: false,
    }
  )

  useEffect(() => {
    if (provinceId) {
      form.setValue('cityId', '')
      form.setValue('cityName', '')
      form.setValue('districtId', '')
      form.setValue('districtName', '')
      form.setValue('postalCode', '')
      setInputCity('') // Reset search kota
      setInputDistrict('') // Reset search kecamatan
      setInputSubDistrict('') // Reset search kodepos
    }
  }, [provinceId, form])

  useEffect(() => {
    if (cityId) {
      form.setValue('districtId', '')
      form.setValue('districtName', '')
      form.setValue('postalCode', '')
      setInputDistrict('') // Reset search kecamatan
      setInputSubDistrict('') // Reset search kodepos
    }
  }, [cityId, form])

  useEffect(() => {
    if (districtId) {
      form.setValue('postalCode', '')
      setInputSubDistrict('') // Reset search kodepos
    }
  }, [districtId, form])

  const provinceOptions: SelectOption[] =
    provinces?.map((province: Province) => ({
      value: province.id,
      label: capitalizeText(province.name),
      ...province,
    })) || []

  const cityOptions: SelectOption[] =
    cities?.map((city: City) => ({
      value: city.id,
      label: capitalizeText(city.name),
      ...city,
    })) || []

  const districtOptions: SelectOption[] =
    districts?.map((district: District) => ({
      value: district.id,
      label: capitalizeText(district.name),
      ...district,
    })) || []

  const subDistrictOptions: SelectOption[] =
    subDistricts?.map((subDistrict: SubdistrictPostalCode) => ({
      value: subDistrict.postalCode,
      label: capitalizeText(subDistrict.postalCode),
      ...subDistrict,
    })) || []

  return (
    <Fragment>
      {/* --- Provinsi --- */}
      <FormField
        control={form.control}
        name="provinceId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>
              Provinsi <span className="text-red-500">*</span>
            </FormLabel>
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
                hasMore={!provinceReachingEnd}
                isLoadingMore={loadingMoreProvinces}
                onLoadMore={loadMoreProvinces}
                searchValue={inputProvince}
                onSearchChangeAction={setInputProvince}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      {/* --- Kabupaten/Kota --- */}
      <FormField
        control={form.control}
        name="cityId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>
              Kabupaten/Kota <span className="text-red-500">*</span>
            </FormLabel>
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
                hasMore={!cityReachingEnd}
                isLoadingMore={loadingMoreCities}
                onLoadMore={loadMoreCities}
                searchValue={inputCity}
                onSearchChangeAction={setInputCity}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      {/* --- Kecamatan --- */}
      <FormField
        control={form.control}
        name="districtId"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>
              Kecamatan <span className="text-red-500">*</span>
            </FormLabel>
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
                hasMore={!districtReachingEnd}
                isLoadingMore={loadingMoreDistricts}
                onLoadMore={loadMoreDistricts}
                searchValue={inputDistrict}
                onSearchChangeAction={setInputDistrict}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />

      {/* --- Kode Pos (Kelurahan/Desa) --- */}
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem className="col-span-1 max-lg:col-span-1">
            <FormLabel>
              Kode Pos <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <LayoutSelectDrawer
                value={field.value}
                onChangeAction={(value, option) => {
                  field.onChange(value)
                  form.setValue('subDistrictName', option?.label)
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
                hasMore={!subDistrictReachingEnd}
                isLoadingMore={loadingMoreSubDistricts}
                onLoadMore={loadMoreSubDistricts}
                searchValue={inputSubDistrict}
                onSearchChangeAction={setInputSubDistrict}
              />
            </FormControl>
            <FormMessageErrorLayout />
          </FormItem>
        )}
      />
    </Fragment>
  )
}

export default FormLokasi
