import { NextRequest, NextResponse } from 'next/server'
import { getServices } from '@/domains/service/service.api'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    /** cors 설정 */
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders })
    }
    const response = NextResponse.next()
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.append(key, value)
    })

    return response
  }

  /** home redirect */
  const isHome = request.nextUrl.pathname === '/'
  if (isHome) {
    return NextResponse.redirect(new URL('/analytics/dashboard', request.url))
  }

  const isEmptyServiceId =
    request.nextUrl.pathname.startsWith('/analytics') &&
    !request.nextUrl.searchParams.has('serviceId')
  if (isEmptyServiceId) {
    const services = await getServices()
    const serviceId = services[0].id
    const url = new URL(request.url)
    url.searchParams.set('serviceId', serviceId)
    return NextResponse.redirect(url)
  }
}
