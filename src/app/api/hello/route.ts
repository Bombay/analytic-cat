import { NextResponse } from 'next/server'
import { rawQuery } from '@/lib/clickhouse'

export async function GET() {
  const data = await rawQuery(`SELECT * FROM event`)
  return NextResponse.json(data)
}
