import { NextResponse } from 'next/server'
import { getServiceMetric } from '@/queries/service/getServiceMetric'

export async function POST(
  request: Request,
  { params }: { params: { id: string; column: string } },
) {
  let filters = await request.json()

  const { id: serviceId, column } = params
  filters = {
    ...filters,
    startDate: { value: new Date('2019-06-01T00:00:00.000Z') },
    endDate: { value: new Date('2020-06-30T23:59:59.999Z') },
  }
  const data = await getServiceMetric(serviceId, column, filters)
  return NextResponse.json(data)
}
