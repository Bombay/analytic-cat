import Cat from '@/components/icons/Cat'
import classnames from 'classnames'

const services = [
  {
    id: '1',
    name: 'Biskit 분석센터',
    domain: 'biskitanalytics.sg.net',
  },
  {
    id: '2',
    name: 'Biskit 랩스',
    domain: 'biskitlabs.sg.net',
  },
]

export default function Lnb({ className }: { className?: string }) {
  return (
    <section className={classnames(className, 'flex', 'flex-col', 'bg-accent-6')}>
      <Logo />
    </section>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Cat />
      <h1 className="text-2xl font-bold">analytic-cat</h1>
    </div>
  )
}
