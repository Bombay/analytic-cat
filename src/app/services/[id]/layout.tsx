import { ReactNode } from 'react'
import Lnb from '@/components/lnb/lnb'

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-[230px,1fr] min-h-[100vh]">
      <Lnb className="col-span-1 p-4" />
      <main className="col-span-1">{children}</main>
    </section>
  )
}
