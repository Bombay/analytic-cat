import { NextRequest } from 'next/server'
import UAParser from 'ua-parser-js'
import { getClientIp } from 'request-ip'
import { IncomingMessage } from 'node:http'
import path from 'path'
import isLocalhost from 'is-localhost-ip'
import maxmind, { CityResponse, Reader, Response } from 'maxmind'

let lookup: Reader<Response>

class NextRequestToIncomingMessage extends IncomingMessage {
  constructor(request: NextRequest) {
    super({} as any)
    this.headers = Object.fromEntries(request.headers.entries())
    this.method = request.method
  }
}

export function getIp(request: NextRequest) {
  const req = new NextRequestToIncomingMessage(request)
  return getClientIp(req)
}

function getRegionCode(country: string | null | undefined, region: string | undefined | null) {
  if (!country || !region) {
    return undefined
  }

  return region.includes('-') ? region : `${country}-${region}`
}

function safeDecodeURIComponent(encodedURIComponent: string | null) {
  if (!encodedURIComponent) {
    return null
  }

  try {
    return decodeURIComponent(encodedURIComponent)
  } catch (e) {
    return encodedURIComponent
  }
}

export async function getLocation(ip: string | null, req: NextRequest) {
  // Ignore local ips
  if (!ip || (await isLocalhost(ip))) {
    return
  }

  // Cloudflare headers
  if (req.headers.get('cf-ipcountry')) {
    const country = safeDecodeURIComponent(req.headers.get('cf-ipcountry'))
    const subdivision1 = safeDecodeURIComponent(req.headers.get('cf-region-code'))
    const city = safeDecodeURIComponent(req.headers.get('cf-ipcity'))

    return {
      country,
      subdivision1: getRegionCode(country, subdivision1),
      city,
    }
  }

  // Vercel headers
  if (req.headers.get('x-vercel-ip-country')) {
    const country = safeDecodeURIComponent(req.headers.get('x-vercel-ip-country'))
    const subdivision1 = safeDecodeURIComponent(req.headers.get('x-vercel-ip-country-region'))
    const city = safeDecodeURIComponent(req.headers.get('x-vercel-ip-city'))

    return {
      country,
      subdivision1: getRegionCode(country, subdivision1),
      city,
    }
  }

  // Database lookup
  if (!lookup) {
    const dir = path.join(process.cwd(), 'geo')
    lookup = await maxmind.open(path.resolve(dir, 'GeoLite2-City.mmdb'))
  }

  const result = lookup.get(ip) as CityResponse | null
  if (result) {
    return {
      country: result.country?.iso_code ?? result?.registered_country?.iso_code,
      subdivision1: result.subdivisions?.[0]?.iso_code,
      subdivision2: result.subdivisions?.[1]?.names?.en,
      city: result.city?.names?.en,
    }
  }
}

export async function getClientInfo(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') as string | undefined
  const parser = new UAParser(userAgent)
  const browser = parser.getBrowser()
  const device = parser.getDevice()
  const isDesktop = device.type === undefined || !['wearable', 'mobile'].includes(device.type)
  if (isDesktop) {
    device.type = 'desktop'
  }

  const os = parser.getOS()
  const ip = getIp(request)
  const location = await getLocation(ip, request)
  const country = location?.country as string | undefined
  const subdivision1 = location?.subdivision1 as string | undefined
  const subdivision2 = location?.subdivision2 as string | undefined
  const city = location?.city as string | undefined

  return {
    browser: browser.name,
    browserVersion: browser.version,
    device: device.type,
    deviceVendor: device.vendor,
    os: os.name,
    osVersion: os.version,
    ip,
    country,
    subdivision1,
    subdivision2,
    city,
  }
}
