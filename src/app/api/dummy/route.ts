import { NextResponse } from 'next/server'
import {
  executeBatch,
  generateInsertStatements,
  generateTestData,
} from '../../../../db/clickhouse/dummy/dummy'

export async function GET() {
  const { events, eventDataList } = generateTestData()
  const { eventInserts, eventDataInserts } = generateInsertStatements(events, eventDataList)
  const statements = [...eventInserts, ...eventDataInserts]

  await executeBatch(statements, 10) // 예시로 10개의 쿼리를 한 번에 실행

  return NextResponse.json(statements)
}
