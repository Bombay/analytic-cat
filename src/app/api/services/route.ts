import getServices from '@/queries/service/getServices'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await getServices()
  return NextResponse.json(data)
}
