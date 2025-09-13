import { metadata } from '@/app/shared-metadata'
import UmrahPersonalFormSection from '@/components/pages/umrah-personal/form'
import LayoutUmrahPersonalForm from '@/components/pages/umrah-personal/form/layout'
import EventTrackerImpression from '@/contexts/event-tracker/components/EventTrackerImpression'
import { TYPE_FILTER_REFERENCE } from '@/contexts/umrah-personal/constant'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { cookies } from 'next/headers'

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
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <LayoutUmrahPersonalForm token={token}>
      <UmrahPersonalFormSection dataEnumVehicle={dataEnumVehicle.results} />
      <EventTrackerImpression
        id="umrah_personal_form"
        nameDidMount="impression_umrah_personal_form"
        nameDidUnmount="exit_umrah_personal_form"
        topic="umrah"
        category="umrah-personal"
      />
    </LayoutUmrahPersonalForm>
  )
}
