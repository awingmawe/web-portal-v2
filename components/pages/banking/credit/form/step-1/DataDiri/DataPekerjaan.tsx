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
import { Facility } from '@/constant/types/FacilityProps'
import { UseFormReturn } from 'react-hook-form'

const FormPekerjaan = ({
  form,
  dataPekerjaan,
  disabled,
}: {
  form: UseFormReturn<any>
  dataPekerjaan: Facility[]
  disabled?: boolean
}) => {
  const dataPekerjaanOptions: SelectOption[] =
    dataPekerjaan?.map((res: Facility) => ({
      value: res.code,
      label: res.name,
      ...res,
    })) || []
  return (
    <FormField
      control={form.control}
      name="job"
      render={({ field }) => (
        <FormItem className="col-span-2 max-lg:col-span-1">
          <FormLabel>
            Pekerjaan <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <LayoutSelectDrawer
              value={field.value}
              onChangeAction={(value, option) => {
                field.onChange(value)
                form.setValue('job', option?.value || '')
              }}
              options={dataPekerjaanOptions}
              placeholder="Pilih pekerjaan"
              hasSearch={false}
              header={<p className="text-l-semibold">Pekerjaan</p>}
              disabled={disabled}
            />
          </FormControl>
          <FormMessageErrorLayout />
        </FormItem>
      )}
    />
  )
}

export default FormPekerjaan
