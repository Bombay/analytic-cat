import { isValid, parseISO } from 'date-fns'
import { DynamicDataType } from '@/types/types'
import { DATA_TYPE } from '@/lib/constants'

export function flattenJSON(
  eventData: { [key: string]: any },
  keyValues: { key: string; value: any; dynamicDataType: DynamicDataType }[] = [],
  parentKey = '',
): { key: string; value: any; dynamicDataType: DynamicDataType }[] {
  return Object.keys(eventData).reduce(
    (acc, key) => {
      const value = eventData[key]
      const type = typeof eventData[key]

      // nested object
      if (value && type === 'object' && !Array.isArray(value) && !isValid(value)) {
        flattenJSON(value, acc.keyValues, getKeyName(key, parentKey))
      } else {
        createKey(getKeyName(key, parentKey), value, acc)
      }

      return acc
    },
    { keyValues, parentKey },
  ).keyValues
}

function createKey(key: string, value: any, acc: { keyValues: any[]; parentKey: string }) {
  const type = getDataType(value)

  let dynamicDataType = null

  switch (type) {
    case 'number':
      dynamicDataType = DATA_TYPE.number
      break
    case 'string':
      dynamicDataType = DATA_TYPE.string
      break
    case 'boolean':
      dynamicDataType = DATA_TYPE.boolean
      value = value ? 'true' : 'false'
      break
    case 'date':
      dynamicDataType = DATA_TYPE.date
      break
    case 'object':
      dynamicDataType = DATA_TYPE.array
      value = JSON.stringify(value)
      break
    default:
      dynamicDataType = DATA_TYPE.string
      break
  }

  acc.keyValues.push({ key, value, dynamicDataType })
}

export function getDataType(value: any): string {
  let type: string = typeof value

  if ((type === 'string' && isValid(value)) || isValid(parseISO(value))) {
    type = 'date'
  }

  return type
}

function getKeyName(key: string, parentKey: string) {
  if (!parentKey) {
    return key
  }

  return `${parentKey}.${key}`
}
