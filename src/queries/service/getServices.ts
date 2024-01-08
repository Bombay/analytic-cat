import { prisma } from '@/lib/prisma'

export default function getServices() {
  return prisma.service.findMany()
}
