'use client'

import CheckoutHeader from '@/components/pages/checkout/1-CheckoutHeader/CheckoutHeader'
import FlightDetails from '@/components/pages/checkout/2-FlightDetails/FlightDetails'
import JamaahSection from '@/components/pages/checkout/3-JamaahSection/JamaahSection'
import PaymentSection from '@/components/pages/checkout/4-PaymentSection/PaymentSection'
import PaymentMethodSection from '@/components/pages/checkout/5-PaymentMethodSection/PaymentMethodSection'
import ReferralSection from '@/components/pages/checkout/6-ReferralSection/ReferralSection'
import TermsAndCheckout from '@/components/pages/checkout/7-TermsAndCheckout/TermsAndCheckout'
import PackageDetails from '@/components/pages/checkout/8-PackageDetails.tsx/PackageDetails'
import ModalCheckout from '@/components/pages/checkout/modal/modalCheckout'
import ModalPengembalianDana from '@/components/pages/checkout/modal/modalPengembalianDana'
import { useCheckoutLogic } from '@/hooks/checkout-hooks/useCheckoutLogic'

const CheckoutPage = () => {
  const {
    isLinkAja,
    isOpenModal,
    setOpenModal,
    isOpenModalPengembalian,
    setOpenModalPengembalian,
    isHaveRefferalCode,
    disabledButtonCheckout,
    detailVariant,
    selectedVariant,
    prebookingLoading,
    preBooking,
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
    handleInputChange,
    formatNumber,
    rawInputValue,
    setRawInputValue,
    handleSliderChange,
    dataSK,
    parsedContent,
    dataRefundPolicy,
    isEmptyRoomType,
    setSelectedRoomType,
    setShouldRunCheckPre,
    paymentAmount,
    totalQty,
    selectedPayment,
    setSelectedPayment,
    sliderStep,
  } = useCheckoutLogic()

  return (
    <div className="mt-5 min-h-screen bg-white font-sans">
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <CheckoutHeader />

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left section */}
          <div className="w-full space-y-6 lg:w-2/3">
            {/* Flight details */}
            <FlightDetails detailVariant={detailVariant} />

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
            />

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

            {/* Terms and conditions */}
            <TermsAndCheckout
              termsAccepted={termsAccepted}
              setTermsAccepted={setTermsAccepted}
              setOpenModal={setOpenModal}
              setOpenModalPengembalian={setOpenModalPengembalian}
              isEmptyRoomType={isEmptyRoomType}
              disabledButtonCheckout={disabledButtonCheckout}
              handleCheckout={handleCheckout}
              isLinkAja={isLinkAja}
              selectedPayment={selectedPayment}
            />
          </div>

          {/* Right section - Package details */}
          <PackageDetails
            detailVariant={detailVariant}
            selectedVariant={selectedVariant}
            paymentDetails={paymentDetails}
          />
        </div>
      </main>

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
    </div>
  )
}

export default CheckoutPage
