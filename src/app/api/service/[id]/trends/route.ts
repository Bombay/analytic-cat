import { QueryFilters, QueryFiltersRequest } from '@/domains/filter/filter.types'
import { parseDateRangeQuery } from '@/lib/date'
import { getServiceTrends } from '@/queries/service/getServiceTrends'
import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const requestFilters: QueryFiltersRequest = await request.json()
  const { id: serviceId } = params
  const data = await getTrends(serviceId, requestFilters)
  return NextResponse.json(data)
}
