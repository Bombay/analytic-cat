import { prisma } from '@/lib/prisma'

export default function getService(serviceId: string) {
  return prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  })
}
