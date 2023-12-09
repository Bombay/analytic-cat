import { parseFilters, rawQuery } from '@/lib/clickhouse'
import { QueryFilters } from '@/domains/filter/filter.types'
import { EVENT_TYPE } from '@/lib/constants'
import { ServiceMetricValue } from '@/domains/service/service.types'

export async function getServiceMetric(serviceId: string, column: string, filters: QueryFilters) {
  const { filterQuery, params } = await parseFilters(serviceId, {
    ...filters,
    eventType: EVENT_TYPE.pageView,
  })

  let optionalCountrySelect = ''
  let optionalCountryGroupBy = ''
  if (column === 'city' || column === 'subdivision1') {
    optionalCountrySelect = ', country'
    optionalCountryGroupBy = 'country,'
  }
  let excludeDomain = ''
  if (column === 'referrer_domain') {
    excludeDomain = 'and referrer_domain != {serviceDomain:String}'
  }

  return rawQuery<ServiceMetricValue[]>(
    `WITH stats AS (select name,
                           sum(t.c)                                                               as pageviews,
                           count(distinct t.session_id)                                           as sessions,
                           count(distinct t.user_id)                                              as users,
                           sum(if(max_time < min_time + interval 1 hour, max_time - min_time, 0)) as totaltime
                        ${optionalCountrySelect}
                    from (select ${column}                                    name,
                                 session_id,
                                 date_trunc('hour', created_at, 'Asia/Seoul') time_series,
                                 max(user_id)                                 user_id,
                                 count(*)                                     c,
                                 min(created_at)                              min_time,
                                 max(created_at)                              max_time
                              ${optionalCountrySelect}
                          from event
                          where service_id = {serviceId:UUID}
                            and created_at between {startDate:DateTime}
                            and {endDate:DateTime}
                            and event_type = {eventType:UInt32} ${excludeDomain} ${filterQuery}
                          group by ${optionalCountryGroupBy} name, session_id, time_series) as t
                    group by ${optionalCountryGroupBy} name)
    select name,
           pageviews,
           sessions,
           users,
           if(sessions = 0, 0, pageviews / sessions) as pageviewsPerSession,
           if(users = 0, 0, sessions / users)     as sessionsPerUser,
           if(sessions = 0, 0, totaltime / sessions) as avgSessionTime
        ${optionalCountrySelect}
    from stats
    order by pageviews ASC;`,
    params,
  )
}
