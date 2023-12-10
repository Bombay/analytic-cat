import { ClickHouse } from 'clickhouse'
import {
  FILTER_COLUMNS,
  Operators,
  QueryFilters,
  QueryFilterValue,
} from '@/domains/filter/filter.types'
import getService from '@/queries/service/getService'

let clickhouse: ClickHouse

function getClient() {
  // @todo 환경변수로 변경
  const hostname = 'localhost'
  const port = '8123'
  const pathname = '/ancat'
  const username = 'default'
  const password = ''

  const client = new ClickHouse({
    url: hostname,
    port: Number(port),
    format: 'json',
    config: {
      database: pathname.replace('/', ''),
    },
    basicAuth: password ? { username, password } : null,
  })

  console.log('clickhouse initialized.')

  return client
}

async function connect() {
  if (!clickhouse) {
    clickhouse = getClient()
  }

  return clickhouse
}

type QueryParams = { [key: string]: string | number | boolean | null | undefined }

async function rawQuery<T>(query: string, params: QueryParams = {}): Promise<T> {
  await connect()
  params = Object.keys(params).reduce<typeof params>((result, key) => {
    let value = params[key]
    if (typeof value !== 'number' && !value) {
      value = null
    }

    result[key] = value
    return result
  }, {})
  console.log('clickhouse query', query, params)
  return clickhouse.query(query, { params }).toPromise() as Promise<T>
}

export function getDateQuery(field: string, unit: string, timezone?: string) {
  if (timezone) {
    return `date_trunc('${unit}', ${field}, '${timezone}')`
  }
  return `date_trunc('${unit}', ${field})`
}

export async function parseFilters(serviceId: string, filters: QueryFilters) {
  const service = await getService(serviceId)

  if (!service) {
    throw new Error('service not found.')
  }

  return {
    filterQuery: getFilterQuery(filters),
    params: {
      ...normalizeFilters(filters),
      serviceId,
      serviceDomain: service.domain,
    },
  }
}

function getFilterQuery(filters: QueryFilters): string {
  const queryParts = []

  for (const [key, filter] of Object.entries(filters)) {
    const column: string | undefined = FILTER_COLUMNS[key as keyof typeof FILTER_COLUMNS]
    if (filter && column) {
      const operator = isQueryFilterValue(filter) ? filter.filter : Operators.equals

      let value =
        typeof filter.value === 'string' ? `'${filter.value.replace(/'/g, "''")}'` : filter.value

      switch (operator) {
        case Operators.equals:
          queryParts.push(`${column} = ${value}`)
          break
        case Operators.notEquals:
          queryParts.push(`${column} != ${value}`)
          break
        case Operators.set:
          queryParts.push(`${column} IS NOT NULL`)
          break
        case Operators.notSet:
          queryParts.push(`${column} IS NULL`)
          break
        case Operators.contains:
          value = value.replace(/^'|'$/g, '')
          queryParts.push(`${column} LIKE '%${value}%'`)
          break
        case Operators.doesNotContain:
          value = value.replace(/^'|'$/g, '')
          queryParts.push(`${column} NOT LIKE '%${value}%'`)
          break
        case Operators.true:
          queryParts.push(`${column} = TRUE`)
          break
        case Operators.false:
          queryParts.push(`${column} = FALSE`)
          break
        case Operators.greaterThan:
          queryParts.push(`${column} > ${value}`)
          break
        case Operators.lessThan:
          queryParts.push(`${column} < ${value}`)
          break
        case Operators.greaterThanEquals:
          queryParts.push(`${column} >= ${value}`)
          break
        case Operators.lessThanEquals:
          queryParts.push(`${column} <= ${value}`)
          break
        case Operators.before:
          queryParts.push(`${column} < ${value}`)
          break
        case Operators.after:
          queryParts.push(`${column} > ${value}`)
          break
        default:
          throw new Error(`Unsupported operator: ${filter.filter}`)
      }
    }
  }

  return queryParts.length > 0 ? ' AND ' + queryParts.join(' AND ') : ''
}

function isQueryFilterValue(filter: any): filter is QueryFilterValue<any> {
  return filter && typeof filter === 'object' && 'value' in filter
}

function normalizeFilters(filters: QueryFilters) {
  const record: Record<string, string | Date | number> = {}

  Object.keys(filters).forEach(key => {
    const filter = filters[key as keyof QueryFilters]
    if (filter !== undefined) {
      if (isQueryFilterValue(filter)) {
        record[key] = filter.value
      } else {
        record[key] = filter
      }
    }
  })

  return record
}

export { rawQuery }
