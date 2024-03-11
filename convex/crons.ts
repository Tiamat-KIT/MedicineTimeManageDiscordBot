import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.interval(
  'Send Alert Message to Discord',
  { seconds: 1 },
  internal.medicine.internalDayNotification
)

export default crons
