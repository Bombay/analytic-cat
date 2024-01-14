import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/domains/service/service.api'
import { useSearchParams } from 'next/navigation'

export function useServicesQuery() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}

export function useCurrentService() {
  const services = useServicesQuery()
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('serviceId')
  if (!serviceId) {
    return null
  }

  return services.data?.find(service => service.id === serviceId) || null
}
