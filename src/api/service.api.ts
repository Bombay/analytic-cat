import axios from '@/lib/axios'
import { Service } from '@/domains/service/service.types'

export async function getServices() {
  const { data } = await axios.get<Service[]>('/api/services')
  return data
}
