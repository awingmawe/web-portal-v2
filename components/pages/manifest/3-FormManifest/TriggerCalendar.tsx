import { CustomCalendarView } from '@/components/shared/CustomCalendar'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'

const TriggerCalendar = ({ field }: { field: any }) => {
  const { lg: isMobile } = useTailwindBreakpoint()

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left">
          <span
            className={`text-m-regular w-full text-left ${!field.value && 'text-neutral-400'}`}
          >
            {field.value
              ? format(new Date(field.value), 'dd MMMM yyyy', { locale: id })
              : 'Pilih tanggal lahir'}
          </span>
          <CalendarDays size={18} />
        </DrawerTrigger>
        <DrawerContent className="w-auto p-0">
          <DrawerHeader className="border-b border-gray-200 px-4 py-3">
            <DrawerTitle className="text-lg font-medium">
              Pilih tanggal lahir
            </DrawerTitle>
          </DrawerHeader>
          <DrawerContent className="p-4">
            <CustomCalendarView
              name="Pilih tanggal lahir"
              value={field.value ? new Date(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
              }
              disabled={(date) => date > new Date()}
              locale={id}
              minYear={1890}
              maxYear={new Date().getFullYear()}
            />
            <DrawerTrigger asChild>
              <div className="max-lg:bg-neutral-0 hidden max-lg:fixed max-lg:right-0 max-lg:bottom-0 max-lg:left-0 max-lg:z-50 max-lg:block max-lg:p-4 max-lg:shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.10)]">
                <Button className="w-full">Simpan</Button>
              </div>
            </DrawerTrigger>
            <div className="hidden max-lg:block max-lg:h-16"></div>
          </DrawerContent>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        className={`flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left`}
      >
        <span
          className={`text-m-regular w-full text-left ${!field.value && 'text-neutral-400'}`}
        >
          {field.value
            ? format(new Date(field.value), 'dd MMMM yyyy', { locale: id })
            : 'Pilih tanggal lahir'}
        </span>
        <CalendarDays size={18} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CustomCalendarView
          name="Pilih tanggal lahir"
          value={field.value ? new Date(field.value) : undefined}
          onChange={(date) =>
            field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
          }
          disabled={(date) => date > new Date()}
          locale={id}
          minYear={1890}
          maxYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  )
}

export default TriggerCalendar
