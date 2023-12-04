import { parseFilters, rawQuery } from '@/lib/clickhouse'
import { DEFAULT_RESET_DATE } from '@/lib/constants'

export async function getServiceDateRange(serviceId: string) {
  const { params } = await parseFilters(serviceId, {
    startDate: { value: new Date(DEFAULT_RESET_DATE) },
  })

  const result = await rawQuery<ServiceDateRange[]>(
    `
        select min(created_at) as minDate,
               max(created_at) as maxDate
        from event
        where service_id = {serviceId:UUID}
    `,
    params,
  )

  return result[0] ?? null
}

interface ServiceDateRange {
  minDate: Date
  maxDate: Date
}
