import { MessageQuestionIcon } from '@/components/icons/message-question'
import ModalKurs from '@/components/pages/detail-package/2-PackageVariant/modal/ModalKurs'
import { PACKAGE_TYPE } from '@/constant/env'
import { useState } from 'react'

const ButtonInfoTrans = ({
  currency,
  packageType,
  title,
}: {
  currency: string
  packageType: string
  title: string
}) => {
  {
  }
  const [showAlurInfo, setAlurInfo] = useState<boolean>(false)
  const handleShowAlurInfo = (param: boolean) => {
    console.log(currency)
    console.log(packageType)
    setAlurInfo(param)
  }

  return (
    <>
      <ModalKurs
        open={showAlurInfo}
        setOpen={setAlurInfo}
        onCheckout={() => {
          handleShowAlurInfo(false)
        }}
        checked={false}
        onCheckedChange={() => {
          return false
        }}
        currency={packageType === PACKAGE_TYPE.HAJJ ? currency : packageType}
        disabledCheck={true}
      />
      <button
        onClick={() => {
          handleShowAlurInfo(true)
        }}
        className="text-m-medium flex cursor-pointer items-center gap-2 align-middle text-(--primary-600)"
      >
        <MessageQuestionIcon className="w-6" />{' '}
        {title.trim().length > 0 && `Alur Transaksi ${title}`}
      </button>
    </>
  )
}

export default ButtonInfoTrans
