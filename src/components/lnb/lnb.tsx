import Cat from '@/components/icons/Cat'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const services = [
  {
    id: '1',
    name: 'Biskit 분석센터',
    domain: 'biskitanalytics.smilegate.net',
  },
  {
    id: '2',
    name: 'Biskit 랩스',
    domain: 'biskitlabs.smilegate.net',
  },
]

export default function Lnb({ className }: { className?: string }) {
  return (
    <section className={className + ' flex flex-col bg-zinc-100 gap-5'}>
      <Logo />
      <Select>
        <SelectTrigger>
          <SelectValue defaultValue={services[0].id} />
        </SelectTrigger>
        <SelectContent>
          {services.map(service => (
            <SelectItem key={service.id} value={service.id}>
              {service.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-1">
      <Cat />
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">analytic-cat</h1>
    </div>
  )
}
