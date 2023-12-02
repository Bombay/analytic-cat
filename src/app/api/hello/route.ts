import { NextResponse } from 'next/server'
import { getServiceStats } from '@/queries/service/getServiceStats'

export async function GET() {
  const serviceId = 'e25a0666-6dbd-41ea-9204-46a044852f64'
  const filters = {
    startDate: { value: new Date('2019-06-01T00:00:00.000Z') },
    endDate: { value: new Date('2020-06-30T23:59:59.999Z') },
  }

  const data = await getServiceStats(serviceId, filters)

  return NextResponse.json(data)
}
