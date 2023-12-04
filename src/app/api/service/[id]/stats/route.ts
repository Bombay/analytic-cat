import { NextResponse } from 'next/server'
import { getServiceStats } from '@/queries/service/getServiceStats'
import { QueryFilters, QueryFiltersRequest } from '@/domains/filter/filter.types'
import { parseDateRangeQuery } from '@/lib/date'
import { differenceInMinutes, subMinutes } from 'date-fns'
import { ServiceStats, ServiceStatsValue } from '@/domains/service/service.types'

export async function getMetricsWithDiff(serviceId: string, requestFilters: QueryFiltersRequest) {
  const { startDate, endDate } = await parseDateRangeQuery(
    serviceId,
    requestFilters.startDate?.value,
    requestFilters.endDate?.value,
  )

  const filters: QueryFilters = {
    ...requestFilters,
    startDate: { value: startDate },
    endDate: { value: endDate },
  }

  const diff = differenceInMinutes(endDate, startDate)
  const prevStartDate = subMinutes(startDate, diff)
  const prevEndDate = subMinutes(endDate, diff)

  const [metrics, prevMetrics] = await Promise.all([
    getServiceStats(serviceId, filters),
    getServiceStats(serviceId, {
      ...filters,
      startDate: { value: prevStartDate },
      endDate: { value: prevEndDate },
    }),
  ])

  return Object.keys(metrics).reduce<ServiceStats>((stats, key) => {
    const typedKey = key as keyof ServiceStatsValue
    stats[typedKey] = {
      value: metrics ? metrics[typedKey] : 0,
      change: metrics[typedKey] - prevMetrics[typedKey],
    }
    return stats
  }, {} as ServiceStats)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const requestFilters: QueryFiltersRequest = await request.json()
  const { id: serviceId } = params

  const data = await getMetricsWithDiff(serviceId, requestFilters)
  return NextResponse.json(data)
}
