import { getDateQuery, parseFilters, rawQuery } from '@/lib/clickhouse'
import { ServiceStatsValue } from '@/domains/service/service.types'
import { QueryFilters } from '@/domains/filter/filter.types'
import { EVENT_TYPE } from '@/lib/constants'

export async function getServiceStats(serviceId: string, filters: QueryFilters) {
  const { filterQuery, params } = await parseFilters(serviceId, {
    ...filters,
    eventType: { value: EVENT_TYPE.pageView },
  })

  const result = await rawQuery<ServiceStatsValue[]>(
    `
        WITH stats AS (select sum(t.c)                                                               as pageviews,
                              count(distinct t.session_id)                                           as sessions,
                              count(distinct t.user_id)                                              as users,
                              sum(if(max_time < min_time + interval 1 hour, max_time - min_time, 0)) as totaltime
                       from (select session_id,
                                    ${getDateQuery('created_at', 'day')} time_series,
                                    max(user_id)                         user_id,
                                    count(*)                             c,
                                    min(created_at)                      min_time,
                                    max(created_at)                      max_time
                             from event
                             where service_id = {serviceId:UUID}
                               and created_at between {startDate:DateTime}
                               and {endDate:DateTime}
                               and event_type = {eventType:UInt32} ${filterQuery}
                             group by session_id, time_series) as t)
        select pageviews,
               sessions,
               users,
               if(sessions = 0, 0, pageviews / sessions) as pageviewsPerSession,
               if(users = 0, 0, sessions / users)     as sessionsPerUser,
               if(sessions = 0, 0, totaltime / sessions) as avgSessionTime
        from stats;`,
    params,
  )
  return result[0]
}
