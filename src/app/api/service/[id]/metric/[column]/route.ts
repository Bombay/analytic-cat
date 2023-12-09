import { NextResponse } from 'next/server'
import { getServiceMetric } from '@/queries/service/getServiceMetric'
import { QueryFilters, QueryFiltersRequest } from '@/domains/filter/filter.types'
import { parseDateRangeQuery } from '@/lib/date'

export async function getMetrics(
  serviceId: string,
  requestFilters: QueryFiltersRequest,
  column: string,
) {
  const { startDate, endDate } = await parseDateRangeQuery(
    serviceId,
    requestFilters.startDate,
    requestFilters.endDate,
  )
  const filters: QueryFilters = {
    ...requestFilters,
    startDate,
    endDate,
  }

  return getServiceMetric(serviceId, column, filters)
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; column: string } },
) {
  const requestFilters: QueryFiltersRequest = await request.json()
  const { id: serviceId, column } = params
  const data = await getMetrics(serviceId, requestFilters, column)
  return NextResponse.json(data)
}
