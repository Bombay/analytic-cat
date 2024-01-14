import { ReactNode } from 'react'
import Lnb from '@/app/analytics/_components/lnb'
import SegmentsControl from '@/app/analytics/_components/segments-control'
import Gnb from '@/app/analytics/_components/gnb'

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col">
      <Gnb className="flex h-[70px] items-center border-b border-b-gray-200 pl-4 pr-4" />
      <section className="border-1 grid min-h-[100vh] grid-cols-[220px,1fr]">
        <aside className="col-span-1 mt-3 flex flex-col border-r border-l-zinc-400 pl-4 pr-4">
          <Lnb />
        </aside>
        <main className="col-span-1 mt-3 flex flex-col pl-4 pr-4">
          <SegmentsControl />
          {children}
        </main>
      </section>
    </section>
  )
}
