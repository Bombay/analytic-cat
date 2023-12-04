import { getServiceDateRange } from '@/queries/service/getServiceDateRange'
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'

export async function parseDateRangeQuery(serviceId: string, startAt?: string, endAt?: string) {
  if (!startAt || !endAt) {
    throw new Error('Missing startAt or endAt')
  }

  // All-time
  if (+startAt === 0 && +endAt === 1) {
    const result = await getServiceDateRange(serviceId)
    const { minDate, maxDate } = result
    const startDate = new Date(minDate)
    const endDate = new Date(maxDate)

    return {
      startDate,
      endDate,
      unit: getMinimumUnit(startDate, endDate),
    }
  }

  const startDate = new Date(startAt)
  const endDate = new Date(endAt)
  const minUnit = getMinimumUnit(startDate, endDate)

  return {
    startDate,
    endDate,
    unit: getMinimumUnit(startDate, endDate),
  }
}

export function getMinimumUnit(startDate: Date, endDate: Date) {
  if (differenceInMinutes(endDate, startDate) <= 60) {
    return 'minute'
  } else if (differenceInHours(endDate, startDate) <= 48) {
    return 'hour'
  } else if (differenceInCalendarDays(endDate, startDate) <= 90) {
    return 'day'
  } else if (differenceInCalendarMonths(endDate, startDate) <= 24) {
    return 'month'
  }

  return 'year'
}

export function getAllowedUnits(startDate: Date, endDate: Date) {
  const units = ['minute', 'hour', 'day', 'month', 'year']
  const minUnit = getMinimumUnit(startDate, endDate)
  const index = units.indexOf(minUnit)

  return index >= 0 ? units.splice(index) : []
}
