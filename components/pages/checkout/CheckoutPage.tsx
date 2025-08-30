'use client'

import { CashReceiptIcon } from '@/components/icons/cash-receipt'
import { LinkAja, LinkAjaSyariah } from '@/components/icons/linkaja'
import CheckoutHeader from '@/components/pages/checkout/1-CheckoutHeader/CheckoutHeader'
import FlightDetails from '@/components/pages/checkout/2-FlightDetails/FlightDetails'
import JamaahSection from '@/components/pages/checkout/3-JamaahSection/JamaahSection'
import PaymentSection from '@/components/pages/checkout/4-PaymentSection/PaymentSection'
import PaymentMethodSection from '@/components/pages/checkout/5-PaymentMethodSection/PaymentMethodSection'
import ReferralSection from '@/components/pages/checkout/6-ReferralSection/ReferralSection'
import TermsAndCheckout from '@/components/pages/checkout/7-TermsAndCheckout/TermsAndCheckout'
import PackageDetails from '@/components/pages/checkout/8-PackageDetails.tsx/PackageDetails'
import ActionButton from '@/components/pages/checkout/component/ActionButton'
import PriceBreakdown from '@/components/pages/checkout/component/PriceBreakdown'
import ModalCheckout from '@/components/pages/checkout/modal/ModalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/ModalPengembalianDana'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MIDTRANS_CLIENT_KEY, PACKAGE_TYPE, SNAP_URL } from '@/constant/env'
import { useCheckoutLogic } from '@/hooks/checkout-hooks/useCheckoutLogic'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { getSlugByVariantPackage } from '@/lib/utils'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import Script from 'next/script'
import renderHTML from 'react-render-html'

const CheckoutPage = () => {
  const {
    // General
    token,
    isLinkAja,
    isOpenModal,
    setOpenModal,
    isOpenModalPengembalian,
    setOpenModalPengembalian,
    isOpenModalDisclaimer,
    setOpenModalDisclaimer,
    isHaveRefferalCode,
    disabledButtonCheckout,

    // Detail variant and selected variant
    detailVariant,
    selectedVariant,

    // Prebooking
    prebookingLoading,
    preBooking,

    // Payment
    paymentDetails,
    referralCode,
    setReferralCode,
    handleCheckReferral,
    setPaymentAmount,
    totalPrice,
    sliderValue,
    setSliderValue,
    handleCheckout,
    termsAccepted,
    setTermsAccepted,
    isReferralValid,
    isReferralCodeChecked,
    wukalaSetting,
    handleRemoveReferralCode,

    // Input
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,

    // Data
    dataSK,
    parsedContent,
    dataRefundPolicy,
    dataLegal,

    // Additional
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    paymentAmount,
    totalQty,
    selectedPayment,
    setSelectedPayment,
    sliderStep,
  } = useCheckoutLogic()

  const { title } = getSlugByVariantPackage(detailVariant?.package.variantType)

  const { lg } = useTailwindBreakpoint()

  const handleCheckoutClick = () => {
    if (!isEmptyRoomType && termsAccepted) {
      if (detailVariant?.package.packageType === PACKAGE_TYPE.HAJJ) {
        setOpenModalDisclaimer(true)
      } else {
        handleCheckout(
          isLinkAja
            ? {
                linkAja: true,
                linkAjaSyariah: selectedPayment === 'linkAjaSyariah',
              }
            : {}
        )
      }
    }
  }

  if (!token || !selectedVariant || !detailVariant) {
    return (
      <div className=" grid h-[78dvh] place-content-center p-8">
        <div className="border-primary-500 h-5 w-5 animate-spin rounded-full border-b-2" />
      </div>
    )
  }

  return (
    <>
      {/* Main content */}
      <main className="max-lg:mt-[50px] max-lg:pb-[50px]">
        <div className="container mx-auto py-6 lg:px-4">
          {/* Back button */}
          <CheckoutHeader />

          <div className="flex flex-col gap-5 max-lg:gap-4 lg:flex-row">
            {/* Left section */}
            <div className="w-full space-y-5 max-lg:order-2 max-lg:space-y-4 lg:w-2/3">
              {/* Divider */}
              <div className="h-1 w-full bg-neutral-100 lg:hidden" />

              {/* Flight details */}
              <div className="max-lg:hidden">
                <FlightDetails detailVariant={detailVariant} />
              </div>

              {/* Jamaah data */}
              <JamaahSection
                detailVariant={detailVariant}
                selectedVariant={selectedVariant}
                totalQty={totalQty}
                prebookingLoading={prebookingLoading}
                isLinkAja={isLinkAja}
                sliderValue={sliderValue}
                setSelectedRoomType={setSelectedRoomType}
                setShouldRunCheckPre={setShouldRunCheckPre}
                setPaymentAmount={setPaymentAmount}
                setRawInputValue={setRawInputValue}
                paymentAmount={paymentAmount}
                isMobile={lg}
              />

              {/* Divider */}
              <div className="h-1 w-full bg-neutral-100 lg:hidden" />

              {/* Payment section */}
              <PaymentSection
                detailVariant={detailVariant}
                selectedVariant={selectedVariant}
                totalQty={totalQty}
                isLinkAja={isLinkAja}
                rawInputValue={rawInputValue}
                formatNumber={formatNumber}
                handleInputChange={handleInputChange}
                prebookingLoading={prebookingLoading}
                setSliderValue={setSliderValue}
                setPaymentAmount={setPaymentAmount}
                setRawInputValue={setRawInputValue}
                preBooking={preBooking}
                totalPrice={totalPrice}
                sliderValue={sliderValue}
                handleSliderChange={handleSliderChange}
                sliderStep={sliderStep}
              />

              {/* Payment Method */}
              <PaymentMethodSection
                isLinkAja={isLinkAja}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              />

              {/* Referral code */}
              <ReferralSection
                isHaveRefferalCode={isHaveRefferalCode}
                referralCode={referralCode}
                setReferralCode={setReferralCode}
                wukalaSetting={wukalaSetting}
                handleCheckReferral={handleCheckReferral}
                handleRemoveReferralCode={handleRemoveReferralCode}
                isReferralCodeChecked={isReferralCodeChecked}
                isReferralValid={isReferralValid}
              />

              {/* Divider */}
              <div className="h-1 w-full bg-neutral-100 lg:hidden" />

              {/* Price breakdown */}
              <div className="lg:hidden">
                <PriceBreakdown
                  detailVariant={detailVariant}
                  paymentDetails={paymentDetails}
                  globalCurrencyRate={preBooking?.globalCurrencyRate}
                />
              </div>

              {/* Terms and conditions */}
              <TermsAndCheckout
                currency={detailVariant?.package?.currency}
                termsAccepted={termsAccepted}
                preBookingLoading={prebookingLoading}
                setTermsAccepted={setTermsAccepted}
                setOpenModal={setOpenModal}
                setOpenModalPengembalian={setOpenModalPengembalian}
                isEmptyRoomType={isEmptyRoomType}
                disabledButtonCheckout={disabledButtonCheckout}
                handleCheckout={handleCheckoutClick}
              />

              {/* Soon will refactor */}
              {lg && isLinkAja && (
                <div className="bg-white">
                  <div className="rounded-[16px] border border-b border-neutral-200">
                    <div className="flex items-center border-b border-neutral-200 p-4">
                      <CashReceiptIcon className="text-neutral-900" size={20} />
                      <h2 className="text-m-semibold ml-2.5 text-neutral-900">
                        Metode Pembayaran
                      </h2>
                    </div>
                    <RadioGroup
                      value={selectedPayment}
                      onValueChange={setSelectedPayment}
                      className="p-4"
                    >
                      {/* LinkAja Syariah */}
                      <div
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                        onClick={() => setSelectedPayment('linkAjaSyariah')}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem
                            value="linkAjaSyariah"
                            id="linkAjaSyariah"
                            className="h-4 w-4"
                          />
                          <div className="flex items-center gap-2">
                            <LinkAjaSyariah
                              className="h-4 w-4"
                              id="linkajaSyariahIcon"
                            />
                            <Label
                              htmlFor="linkAjaSyariah"
                              className="text-l-medium cursor-pointer"
                            >
                              LinkAja Syariah
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* LinkAja */}
                      <div
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3"
                        onClick={() => setSelectedPayment('linkAja')}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem
                            value="linkAja"
                            id="linkaja"
                            className="h-4 w-4"
                          />
                          <div className="flex items-center gap-2">
                            <LinkAja className="h-4 w-4" id="linkajaIcon" />
                            <Label
                              htmlFor="linkaja"
                              className="text-l-medium cursor-pointer"
                            >
                              LinkAja
                            </Label>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
            </div>

            {/* Right section - Package details */}
            <PackageDetails
              detailVariant={detailVariant}
              selectedVariant={selectedVariant}
              paymentDetails={paymentDetails}
              globalCurrencyRate={preBooking?.globalCurrencyRate}
            />
          </div>
        </div>
      </main>

      {/* Action Buttons For Mobile Version */}
      <ActionButton
        disabledButtonCheckout={disabledButtonCheckout}
        preBookingLoading={prebookingLoading}
        downPayment={preBooking?.downPayment}
        currency={detailVariant?.package?.currency}
        handleCheckoutClick={handleCheckoutClick}
      />

      {/* Modals */}
      <ModalCheckout
        open={isOpenModal}
        onOpenChange={setOpenModal}
        dataSK={dataSK}
      />
      <ModalPengembalianDana
        open={isOpenModalPengembalian}
        onOpenChange={setOpenModalPengembalian}
        parsedContent={parsedContent}
        dataRefundPolicy={dataRefundPolicy}
      />
      <LayoutDrawerDialog
        hideCloseButton={false}
        isOpen={isOpenModalDisclaimer}
        setIsOpen={setOpenModalDisclaimer}
        trigger={<div className="hidden" />}
        title={
          <p className="heading-4-semibold max-lg:p-4">
            <em>Disclaimer</em> {title}
          </p>
        }
        content={
          <div className="scrollbar-hide flex max-h-[70vh] flex-col gap-4 lg:overflow-y-auto">
            <p className="text-m-regular text-neutral-500">
              Terakhir diperbarui:{' '}
              {dataLegal &&
                format(dataLegal?.modifiedAt, 'MM yyyy', { locale: id })}
            </p>
            <div className="prose prose-img:inline prose-ul:[list-style:inherit] prose-ol:[list-style:in] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs prose-li:[:marker:initial]  break-word min-w-full marker:text-inherit">
              {dataLegal && renderHTML(dataLegal?.body || '')}
            </div>
          </div>
        }
        footerContent={
          <div className="ml-auto flex w-full justify-end gap-3 lg:max-w-sm">
            <Button
              variant="default"
              className="px-10 py-3 max-lg:w-full"
              onClick={() => {
                handleCheckout(
                  isLinkAja
                    ? {
                        linkAja: true,
                        linkAjaSyariah: selectedPayment === 'linkAjaSyariah',
                      }
                    : {}
                )
                setOpenModalDisclaimer(false)
              }}
              isLoading={disabledButtonCheckout}
            >
              Setuju & Lanjutkan
            </Button>
          </div>
        }
      />

      {/* Midtrans */}
      <Script
        src={SNAP_URL}
        data-client-key={MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
        onError={() => {}}
      />
    </>
  )
}

export default CheckoutPage
