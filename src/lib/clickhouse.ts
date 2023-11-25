import { ClickHouse } from 'clickhouse'

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

type QueryParams = { [key: string]: string | number | boolean | null }

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

export { rawQuery }
