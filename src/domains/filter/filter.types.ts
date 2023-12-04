export enum Operators {
  equals = 'eq', // 값이 동일
  notEquals = 'neq', // 값이 동일하지 않음
  set = 's', // 값이 설정됨 (null 아님)
  notSet = 'ns', // 값이 설정되지 않음 (null)
  contains = 'c', // (문자열에서) 값 포함
  doesNotContain = 'dnc', // (문자열에서) 값 미포함
  true = 't', // 값이 참 (true)
  false = 'f', // 값이 거짓 (false)
  greaterThan = 'gt', // 값이 주어진 값보다 큼
  lessThan = 'lt', // 값이 주어진 값보다 작음
  greaterThanEquals = 'gte', // 값이 주어진 값 이상
  lessThanEquals = 'lte', // 값이 주어진 값 이하
  before = 'bf', // (날짜가) 주어진 날짜보다 이전
  after = 'af', // (날짜가) 주어진 날짜보다 이후
}

export type QueryFilterValue<T> = { filter?: Operators; value: T }

export interface QueryFilters {
  startDate?: QueryFilterValue<Date>
  endDate?: QueryFilterValue<Date>
  timezone?: QueryFilterValue<string>
  unit?: QueryFilterValue<string>
  eventType?: QueryFilterValue<number>
  url?: QueryFilterValue<string>
  referrer?: QueryFilterValue<string>
  title?: QueryFilterValue<string>
  query?: QueryFilterValue<string>
  os?: QueryFilterValue<string>
  browser?: QueryFilterValue<string>
  device?: QueryFilterValue<string>
  country?: QueryFilterValue<string>
  region?: QueryFilterValue<string>
  city?: QueryFilterValue<string>
  language?: QueryFilterValue<string>
  event?: QueryFilterValue<string>
  team?: QueryFilterValue<string>
  corp?: QueryFilterValue<string>
  lang?: QueryFilterValue<string>
}

export interface QueryFiltersRequest extends Omit<QueryFilters, 'startDate' | 'endDate'> {
  startDate: QueryFilterValue<string>
  endDate: QueryFilterValue<string>
}

export const FILTER_COLUMNS = {
  url: 'url_path',
  referrer: 'referrer_domain',
  title: 'page_title',
  query: 'url_query',
  os: 'os',
  browser: 'browser',
  device: 'device',
  country: 'country',
  region: 'subdivision1',
  city: 'city',
  language: 'language',
  event: 'event_name',
  team: 'user_team',
  corp: 'user_corp',
}
