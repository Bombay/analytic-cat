export interface ServiceStatsValue {
  pageviews: number
  sessions: number
  users: number
  pageviewsPerSession: number
  sessionsPerUser: number
  avgSessionDuration: number
}

export interface ServiceMetricValue extends ServiceStatsValue {
  name: string
}

export type ServiceStats = {
  [K in keyof ServiceStatsValue]: { value: ServiceStatsValue[K]; change: number }
}
