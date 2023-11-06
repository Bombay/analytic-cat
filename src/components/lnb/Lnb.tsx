import Cat from '@/components/icons/Cat'

export default function Lnb({ className }: { className?: string }) {
  return (
    <section className={className + ' flex flex-col bg-accent-6'}>
      <Logo />
    </section>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Cat />
    </div>
  )
}
