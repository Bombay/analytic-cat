import { QueryFilters, QueryFiltersRequest } from '@/domains/filter/filter.types'
import { parseDateRangeQuery } from '@/lib/date'
import { getServiceTrends } from '@/queries/service/getServiceTrends'
import { NextResponse } from 'next/server'

export async function getTrends(serviceId: string, requestFilters: QueryFiltersRequest) {
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

  return getServiceTrends(serviceId, filters)
}

export default async function POST(request: Request, { params }: { params: { id: string } }) {
  const requestFilters: QueryFiltersRequest = await request.json()
  const { id: serviceId } = params
  const data = await getTrends(serviceId, requestFilters)
  return NextResponse.json(data)
}
