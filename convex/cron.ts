import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.interval(
  'Send Alert Message',
  { minutes: 1 },
  internal.medicine.internalDayNotification
)
