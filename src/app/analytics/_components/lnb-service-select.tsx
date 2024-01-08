'use client'

import { useServicesQuery } from '@/domains/service/service'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function LnbServiceSelect({ className }: { className?: string }) {
  const { data: services } = useServicesQuery()

  if (!services) {
    return null
  }

  return (
    <div className={cn('item-center flex', className)}>
      <Select defaultValue={services[0].id}>
        <SelectTrigger className="border-0 text-xl font-extrabold focus:border-0 focus:border-none focus:shadow-none focus:ring-0">
          <div className="ml-2 mr-2">
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {services.map(service => (
            <SelectItem key={service.id} value={service.id} className="font-bold">
              <div className="flex items-center">{service.name}</div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
