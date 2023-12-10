import { DATA_TYPE } from '@/lib/constants'

export interface DynamicData {
  [key: string]: number | string | DynamicData | number[] | string[] | DynamicData[]
}

type ObjectValues<T> = T[keyof T]
export type DynamicDataType = ObjectValues<typeof DATA_TYPE>
