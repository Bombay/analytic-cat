import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Cat from '@/components/icons/cat'
import { cn } from '@/lib/utils'
import { Menu, MenuIcon, MenuItem } from '@/components/ui/menu'
import { RiDashboardFill, RiDeviceLine, RiProfileFill, RiUser3Fill } from 'react-icons/ri'
import { SiGoogleanalytics } from 'react-icons/si'
import { ImLab } from 'react-icons/im'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  domain: string
  icon: keyof typeof SERVICE_ICONS
}

const SERVICE_ICONS = {
  biskitAnalytics: <SiGoogleanalytics />,
  biskitLabs: <ImLab />,
}

const services: Service[] = [
  {
    id: '1',
    name: 'Biskit 분석센터',
    domain: 'biskitanalytics.smilegate.net',
    icon: 'biskitAnalytics',
  },
  {
    id: '2',
    name: 'Biskit 랩스',
    domain: 'biskitlabs.smilegate.net',
    icon: 'biskitLabs',
  },
]

export default function Lnb({ className }: { className?: string }) {
  return (
    <aside className={cn(className, 'flex flex-col shadow-xl')}>
      <Logo />
      <LnbServiceSelect />
      <LnbMenuList className="mt-7" />
    </aside>
  )
}

function LnbServiceSelect({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Select defaultValue={services[0].id}>
        <SelectTrigger>
          <div className="ml-2">
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {services.map(service => (
            <SelectItem key={service.id} value={service.id}>
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4">{SERVICE_ICONS[service.icon]}</div>
                {service.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className, 'flex h-[70px] items-center gap-1 pb-3 pt-3')}>
      <Cat />
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">analytic-cat</h1>
    </div>
  )
}

function LnbMenuList({ className }: { className?: string }) {
  return (
    <nav className={className}>
      <Menu>
        <MenuItem selected>
          <MenuIcon>
            <RiDashboardFill />
          </MenuIcon>
          <Link href="/analytics/dashboard">대시보드</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <RiUser3Fill />
          </MenuIcon>
          <Link href="/analytics/userActivity">이용자 활동</Link>
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <RiDeviceLine />
          </MenuIcon>
          이용자 환경
        </MenuItem>
        <MenuItem>
          <MenuIcon>
            <RiProfileFill />
          </MenuIcon>
          이벤트
        </MenuItem>
      </Menu>
    </nav>
  )
}
