import { uuid } from '@/lib/crypto'
import { EVENT_NAME_LENGTH, EVENT_TYPE, URL_LENGTH } from '@/lib/constants'
import { rawQuery } from '@/lib/clickhouse'
import { saveEventData } from '@/queries/event/saveEventData'

interface SaveEventProps {
  sessionId: string
  serviceId: string
  urlPath: string
  urlQuery?: string
  referrerPath?: string
  referrerQuery?: string
  referrerDomain?: string
  pageTitle?: string
  eventName?: string
  eventData?: any
  hostname?: string
  screen?: string
  language?: string
  userId?: string
  userName?: string
  userTeam?: string
  userCorp?: string
  /* from clientInfo */
  device?: string
  deviceVendor?: string
  browser?: string
  browserVersion?: string
  os?: string
  osVersion?: string
  country?: string
  subdivision1?: string
  subdivision2?: string
  city?: string
}

export async function saveEvent({
  serviceId,
  sessionId,
  urlPath,
  urlQuery,
  referrerPath,
  referrerQuery,
  referrerDomain,
  pageTitle,
  eventName,
  eventData,
  screen,
  language,
  hostname,
  country,
  subdivision1,
  subdivision2,
  city,
  userId,
  userName,
  userTeam,
  userCorp,
  device,
  deviceVendor,
  browser,
  browserVersion,
  os,
  osVersion,
}: SaveEventProps) {
  const eventId = uuid()
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const params = {
    eventId,
    serviceId,
    sessionId,
    urlPath: urlPath?.substring(0, URL_LENGTH),
    urlQuery: urlQuery?.substring(0, URL_LENGTH),
    referrerPath: referrerPath?.substring(0, URL_LENGTH),
    referrerQuery: referrerQuery?.substring(0, URL_LENGTH),
    referrerDomain: referrerDomain?.substring(0, URL_LENGTH),
    pageTitle,
    language,
    screen,
    hostname,
    country,
    subdivision1:
      country && subdivision1
        ? subdivision1.includes('-')
          ? subdivision1
          : `${country}-${subdivision1}`
        : null,
    subdivision2: subdivision2,
    city,
    userId,
    userName,
    userTeam,
    userCorp,
    device,
    deviceVendor,
    browser,
    browserVersion,
    os,
    osVersion,
    eventType: eventName ? EVENT_TYPE.customEvent : EVENT_TYPE.pageView,
    eventName: eventName ? eventName?.substring(0, EVENT_NAME_LENGTH) : null,
    createdAt,
  }

  const query = `
      INSERT INTO ancat.event (service_id,
                               session_id,
                               event_id,
                               user_id,
                               user_name,
                               user_team,
                               user_corp,
                               hostname,
                               browser,
                               browser_version,
                               os,
                               os_version,
                               device,
                               device_vendor,
                               screen,
                               language,
                               country,
                               subdivision1,
                               subdivision2,
                               city,
                               url_path,
                               url_query,
                               referrer_path,
                               referrer_query,
                               referrer_domain,
                               page_title,
                               event_type,
                               event_name,
                               created_at)
      VALUES ({serviceId : UUID},
                 {sessionId : UUID},
                 {eventId : UUID},
                 {userId : String},
                 {userName : String},
                 {userTeam : String},
                 {userCorp : String},
                 {hostname : String},
                 {browser : String},
                 {browserVersion : String},
                 {os : String},
                 {osVersion : String},
                 {device : String},
                 {deviceVendor : String},
                 {screen : String},
                 {language : String},
                 {country : String},
                 {subdivision1 : String},
                 {subdivision2 : String},
                 {city : String},
                 {urlPath : String},
                 {urlQuery : String},
                 {referrerPath : String},
                 {referrerQuery : String},
                 {referrerDomain : String},
                 {pageTitle : String},
                 {eventType : UInt32},
                 {eventName : String},
                 {createdAt : DateTime('UTC')});
  `

  await rawQuery(query, params)

  if (eventData) {
    await saveEventData({
      eventId,
      serviceId,
      sessionId,
      urlPath,
      eventName,
      eventData,
      createdAt,
    })
  }

  return params
}
