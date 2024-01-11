import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/domains/service/service.api'

export function useServicesQuery() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}
