import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/api/service.api'

export function useServicesQuery() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}
