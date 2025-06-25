import { metadata } from '@/app/shared-metadata'
import UmrahPersonalFormSection from '@/components/pages/umrah-personal/form'
import LayoutUmrahPersonalForm from '@/components/pages/umrah-personal/form/layout'
import { TYPE_FILTER_REFERENCE } from '@/contexts/umrah-personal/constant'
import { getFacilityEnum } from '@/services/general-service'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Umrah Personal Form',
      'Muslim 101 Umrah Personal Form'
    ),
  }
}

export default async function UmrahPersonalForm() {
  const dataEnumVehicle = await getFacilityEnum(TYPE_FILTER_REFERENCE)

  return (
    <LayoutUmrahPersonalForm>
      <UmrahPersonalFormSection dataEnumVehicle={dataEnumVehicle.results} />
    </LayoutUmrahPersonalForm>
  )
}
