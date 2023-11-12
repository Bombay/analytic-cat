import { ReactNode } from 'react'
import Lnb from '@/components/common/lnb'
import FilterControls from '@/components/common/filter-controls'

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="border-1 flex grid min-h-[100vh] grid-cols-[250px,1fr]">
      <Lnb className="col-span-1 pl-4 pr-4" />
      <main className="col-span-1 flex flex-col pl-4 pr-4">
        <FilterControls />
        {children}
      </main>
    </section>
  )
}
