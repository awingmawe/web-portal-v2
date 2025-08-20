import CheckoutDrawerMobile from '@/components/pages/detail-package/mobile/DrawerCheckout'
import BadgePromo from '@/components/shared/Badge'
import { Package, PackageVariant } from '@/constant/types/PackageProps'
import { dissolve } from '@/lib/animation-setup'
import { isEmpty } from '@/lib/utils'
import React from 'react'

interface VariantSelectionProps {
  variants: PackageVariant[]
  selectedVariantId: number | null
  lg: boolean
  pkg: Package
  token: string
  onVariantSelect: (variantId: number) => void
  handleBadgePromo: (
    discountType: string,
    discountAmount: number | string,
    currency: string
  ) => string | null
  handlePushEvent: (name: string, withVariant?: boolean) => void
}

const VariantSelection: React.FC<VariantSelectionProps> = ({
  variants,
  selectedVariantId,
  lg,
  pkg,
  token,
  onVariantSelect,
  handleBadgePromo,
  handlePushEvent,
}) => {
  if (variants.length === 0) return null

  return (
    <div className="mb-2 max-lg:h-[60px]">
      <div className="mb-2 h-[0.5px] bg-[#D2D2D1] max-lg:hidden" />

      <div className="text-s-regular mb-2 text-neutral-800 max-lg:hidden">
        Varian
      </div>
      <div
        className={`no-scrollbar ${variants.some((e) => {
          if (!isEmpty(e.discountAmount)) return 'mt-7.5'
        })} flex flex-wrap items-center gap-4 gap-y-6 max-lg:-mx-2 max-lg:-mt-1 max-lg:h-[100px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:px-2 max-lg:pb-2`}
      >
        {variants.map((variant) =>
          lg ? (
            <CheckoutDrawerMobile
              key={variant.id}
              title={pkg.title}
              variants={variants}
              image={pkg.thumbnail}
              currency={pkg.currency}
              packageType={pkg.packageType}
              token={token}
            >
              <div
                key={variant.id}
                id={`variant-btn-${variant.id}`}
                onClick={() => {
                  onVariantSelect(variant.id)
                  handlePushEvent('click_package_variant', true)
                }}
                className={`${dissolve} hover:bg-primary-100 relative min-w-[90px] cursor-pointer rounded-lg p-2.5 max-lg:flex-shrink-0 ${
                  selectedVariantId === variant.id
                    ? 'border-primary-500 bg-primary-100 border-2'
                    : 'border-2 border-neutral-200 bg-transparent'
                }`}
              >
                <p className="text-m-regular text-neutral-900">
                  {variant.name || `Varian ${variant.id}`}
                </p>
                {variant.discountAmount &&
                  Number(variant.discountAmount) > 0 && (
                    <BadgePromo
                      className="!text-s-semibold -top-[24px] left-0"
                      title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, pkg.currency)}`}
                    />
                  )}
              </div>
            </CheckoutDrawerMobile>
          ) : (
            <div
              key={variant.id}
              id={`variant-btn-${variant.id}`}
              onClick={() => onVariantSelect(variant.id)}
              className={`${dissolve} hover:bg-primary-100 relative min-w-[90px] cursor-pointer rounded-lg p-2.5  max-lg:flex-shrink-0 ${
                selectedVariantId === variant.id
                  ? 'border-primary-500 bg-primary-100 border-2'
                  : 'border-2 border-neutral-200 bg-transparent'
              }`}
            >
              <p className="text-m-regular text-neutral-900">
                {variant.name || `Varian ${variant.id}`}
              </p>
              {variant.discountAmount && Number(variant.discountAmount) > 0 && (
                <BadgePromo
                  className="!text-s-semibold -top-[25px] left-0"
                  title={`Diskon ${handleBadgePromo(variant.discountType, variant.discountAmount, pkg.currency)}`}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default VariantSelection
