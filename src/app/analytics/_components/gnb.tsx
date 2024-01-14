import { cn } from '@/lib/utils'
import Cat from '@/components/icons/cat'
import ServiceSelect from '@/app/analytics/_components/service-select'

export default function Gnb({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Logo className="mb-3 mt-3 border-r border-l-zinc-400 pr-7" />
      <section className="flex">
        <ServiceSelect />
      </section>
    </section>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className, 'flex items-center gap-1')}>
      <Cat />
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">analytic-cat.</h1>
    </div>
  )
}
