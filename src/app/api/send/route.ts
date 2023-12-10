import { NextRequest, NextResponse } from 'next/server'
import isbot from 'isbot'
import { getClientInfo } from '@/lib/detect'
import { saveEvent } from '@/queries/event/saveEvent'

export async function POST(request: NextRequest) {
  if (isbot(request.headers.get('user-agent'))) {
    return new Response(null, { status: 200 })
  }

  const { type, payload } = await request.json()
  const {
    url,
    referrer,
    name: eventName,
    data: eventData,
    title: pageTitle,
    sessionId,
    service,
    hostname,
    screen,
    language,
    userId,
    userName,
    userTeam,
    userCorp,
  } = payload

  const clientInfo = await getClientInfo(request)

  let [urlPath, urlQuery] = url?.split('?') || []
  let [referrerPath, referrerQuery] = referrer?.split('?') || []
  let referrerDomain

  if (!urlPath) {
    urlPath = '/'
  }

  if (referrerPath?.startsWith('http')) {
    const refUrl = new URL(referrer)
    referrerPath = refUrl.pathname
    referrerQuery = refUrl.search.substring(1)
    referrerDomain = refUrl.hostname.replace(/www\./, '')
  }

  urlPath = urlPath.replace(/.+\/$/, '')

  await saveEvent({
    sessionId,
    serviceId: service,
    urlPath,
    urlQuery,
    referrerPath,
    referrerQuery,
    referrerDomain,
    pageTitle,
    eventName,
    eventData,
    hostname,
    screen,
    language,
    userId,
    userName,
    userTeam,
    userCorp,
    ...clientInfo,
  })

  return NextResponse.json(clientInfo)
}
