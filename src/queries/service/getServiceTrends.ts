import { getDateQuery, parseFilters, rawQuery } from '@/lib/clickhouse'
import { QueryFilters } from '@/domains/filter/filter.types'
import { ServiceTrendValue } from '@/domains/service/service.types'
import { EVENT_TYPE } from '@/lib/constants'

export async function getServiceTrends(serviceId: string, filters: QueryFilters) {
  const { timezone = 'UTC', unit = 'day' } = filters
  const { filterQuery, params } = await parseFilters(serviceId, {
    ...filters,
    eventType: EVENT_TYPE.pageView,
  })

  const result = await rawQuery<ServiceTrendValue[]>(
    `
        WITH stats AS (select time_series,
                              sum(t.c)                                                               as pageviews,
                              count(distinct t.session_id)                                           as sessions,
                              count(distinct t.user_id)                                              as users,
                              sum(if(max_time < min_time + interval 1 hour, max_time - min_time, 0)) as totaltime
                       from (select session_id,
                                    ${getDateQuery('created_at', unit, timezone)} time_series,
                                    max(user_id)                                  user_id,
                                    count(*)                                      c,
                                    min(created_at)                               min_time,
                                    max(created_at)                               max_time
                             from event
                             where service_id = {serviceId:UUID}
                               and created_at between {startDate:DateTime}
                               and {endDate:DateTime}
                               and event_type = {eventType:UInt32} ${filterQuery}
                             group by session_id, time_series) as t
                       group by time_series)
        select time_series          as timeSeries,
               pageviews,
               sessions,
               users,
               pageviews / sessions as pageviewsPerSession,
               sessions / users     as sessionsPerUser,
               totaltime / sessions as avgSessionTime
        from stats
        order by time_series ASC;
    `,
    params,
  )
  return result
}
