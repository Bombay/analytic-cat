import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { rawQuery } from '@/lib/clickhouse'

interface Event {
  event_id: string
  service_id: string
  session_id: string
  user_id: string
  user_name: string
  user_team: string
  user_corp: string
  hostname: string
  browser: string
  os: string
  device: string
  screen: string
  language: string
  country: string
  subdivision1: string
  subdivision2: string
  city: string
  url_path: string
  url_query: string
  referrer_path: string
  referrer_query: string
  referrer_domain: string
  page_title: string
  event_type: number
  event_name: string
  created_at: Date
}

interface EventData {
  event_id: string
  service_id: string
  session_id: string
  url_path: string
  event_name: string
  event_key: string
  string_value: string | null
  number_value: number | null
  date_value: Date | null
  data_type: number
  created_at: Date
}

function generateRandomDate(start: Date, end: Date): Date {
  return faker.date.between(start, end)
}

function generateRandomEvent(serviceId: string, userIds: string[]): Event {
  return {
    event_id: uuidv4(),
    service_id: serviceId,
    session_id: uuidv4(),
    user_id: faker.helpers.arrayElement(userIds),
    user_name: faker.person.fullName(),
    user_team: faker.commerce.department(),
    user_corp: faker.company.name(),
    hostname: faker.internet.domainName(),
    browser: faker.internet.userAgent(),
    os: faker.commerce.productName(),
    device: faker.commerce.product(),
    screen: faker.commerce.productAdjective(),
    language: 'ko',
    country: faker.location.countryCode(),
    subdivision1: faker.location.state(),
    subdivision2: faker.location.state(),
    city: faker.location.city(),
    url_path: faker.internet.url(),
    url_query: faker.internet.url(),
    referrer_path: faker.internet.url(),
    referrer_query: faker.internet.url(),
    referrer_domain: faker.internet.domainName(),
    page_title: faker.lorem.sentence(),
    event_type: [0, 1][Math.floor(Math.random() * 2)],
    event_name: faker.lorem.word(),
    created_at: generateRandomDate(new Date(2020, 0, 1), new Date(2020, 0, 10)),
  }
}

function generateRandomEventData(event: Event): EventData {
  return {
    event_id: event.event_id,
    service_id: event.service_id,
    session_id: event.session_id,
    url_path: event.url_path,
    event_name: event.event_name,
    event_key: faker.lorem.word(),
    string_value: faker.random.word(),
    number_value: faker.datatype.number(),
    date_value: generateRandomDate(new Date(2020, 0, 1), new Date(2020, 0, 10)),
    data_type: faker.datatype.number({ min: 0, max: 4 }),
    created_at: event.created_at,
  }
}

function generateTestData() {
  const serviceId: string = uuidv4()
  const userIds: string[] = Array.from({ length: 10 }, () => uuidv4())
  const events: Event[] = []
  const eventDataList: EventData[] = []

  for (let i = 0; i < 100; i++) {
    const event = generateRandomEvent(serviceId, userIds)
    events.push(event)
    if (event.event_type === 1) {
      const eventData = generateRandomEventData(event)
      eventDataList.push(eventData)
    }
  }

  return { events, eventDataList }
}

function formatDateForClickHouse(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, '')
}

function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''")
}

function generateInsertStatements(
  events: Event[],
  eventDataList: EventData[],
): { eventInserts: string[]; eventDataInserts: string[] } {
  const eventInserts = events.map(event => {
    return `INSERT INTO event VALUES ('${escapeSqlString(event.event_id)}', '${escapeSqlString(
      event.service_id,
    )}', '${escapeSqlString(event.session_id)}', '${escapeSqlString(
      event.user_id,
    )}', '${escapeSqlString(event.user_name)}', '${escapeSqlString(
      event.user_team,
    )}', '${escapeSqlString(event.user_corp)}', '${escapeSqlString(
      event.hostname,
    )}', '${escapeSqlString(event.browser)}', '${escapeSqlString(event.os)}', '${escapeSqlString(
      event.device,
    )}', '${escapeSqlString(event.screen)}', '${escapeSqlString(
      event.language,
    )}', '${escapeSqlString(event.country)}', '${escapeSqlString(
      event.subdivision1,
    )}', '${escapeSqlString(event.subdivision2)}', '${escapeSqlString(
      event.city,
    )}', '${escapeSqlString(event.url_path)}', '${escapeSqlString(
      event.url_query,
    )}', '${escapeSqlString(event.referrer_path)}', '${escapeSqlString(
      event.referrer_query,
    )}', '${escapeSqlString(event.referrer_domain)}', '${escapeSqlString(event.page_title)}', ${
      event.event_type
    }, '${escapeSqlString(event.event_name)}', '${formatDateForClickHouse(event.created_at)}')`
  })

  const eventDataInserts = eventDataList.map(data => {
    return `INSERT INTO event_data VALUES ('${escapeSqlString(data.event_id)}', '${escapeSqlString(
      data.service_id,
    )}', '${escapeSqlString(data.session_id)}', '${escapeSqlString(
      data.url_path,
    )}', '${escapeSqlString(data.event_name)}', '${escapeSqlString(data.event_key)}', ${
      data.string_value ? `'${escapeSqlString(data.string_value)}'` : 'NULL'
    }, ${data.number_value !== null ? data.number_value : 'NULL'}, ${
      data.date_value ? `'${formatDateForClickHouse(data.date_value)}'` : 'NULL'
    }, ${data.data_type}, '${formatDateForClickHouse(data.created_at)}')`
  })

  return { eventInserts, eventDataInserts }
}

async function executeBatch(statements: string[], batchSize: number = 10) {
  for (let i = 0; i < statements.length; i += batchSize) {
    const batch = statements.slice(i, i + batchSize)
    await Promise.all(batch.map(statement => rawQuery(statement)))
  }
}

export { generateTestData, generateInsertStatements, executeBatch }
