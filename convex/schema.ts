import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  medicine: defineTable({
    name: v.string(),
    time: v.string(),
    every: v.union(
      v.literal('day'),
      v.literal('week'),
      v.literal('month'),
      v.literal('none')
    )
  })
})
