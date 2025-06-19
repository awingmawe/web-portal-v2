import { metadata } from '@/app/shared-metadata'
import UmrahPersonalFormSection from '@/components/pages/umrah-personal/form'
import LayoutUmrahPersonalForm from '@/components/pages/umrah-personal/form/layout'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Umrah Personal Form',
      'Muslim 101 Umrah Personal Form'
    ),
  }
}

export default async function UmrahPersonalForm() {
  return (
    <LayoutUmrahPersonalForm>
      <UmrahPersonalFormSection />
    </LayoutUmrahPersonalForm>
  )
}
