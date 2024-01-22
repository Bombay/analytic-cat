import { ReactNode } from 'react'

/**
 * 차트를 담는 리포트. 차트 여러 개를 담을 수 있음
 * 크기는 디비에 저장되서 설정됨
 */
export default function Report({ children }: ReportProps) {
  return <div className="rounded border border-gray-200 shadow-sm">{children}</div>
}
interface ReportProps {
  children: ReactNode
  minWidth?: number
  minHeight?: number
  flexDirection?: 'row' | 'column'
}
