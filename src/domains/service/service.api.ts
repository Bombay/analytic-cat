import catFetch from '@/lib/cat-fetch'
import { Service } from '@/domains/service/service.types'

export async function getServices(): Promise<Service[]> {
  return catFetch('/api/services').then(res => res.json())
}
