import { ReactNode } from 'react'
import Lnb from '@/app/analytics/_components/lnb'
import FilterControls from '@/app/analytics/_components/filter-controls'
import Gnb from '@/app/analytics/_components/gnb'

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col">
      <Gnb className="flex h-[70px] items-center border-b border-b-gray-200 pl-4 pr-4" />
      <section className="border-1 grid min-h-[100vh] grid-cols-[220px,1fr]">
        <Lnb className="col-span-1 pl-4 pr-4" />
        <main className="col-span-1 flex flex-col pl-4 pr-4">
          <FilterControls />
          {children}
        </main>
      </section>
    </section>
  )
}
