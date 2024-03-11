import { internalMutation, mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const GetAllMedicine = query({
  async handler (ctx) {
    const medicine = await ctx.db.query('medicine').order('desc').collect()
    return medicine
  }
})

export const NameGetMedicine = query({
  args: {
    name: v.string()
  },
  async handler (ctx, args) {
    const medicine = await ctx.db
      .query('medicine')
      .filter(q => q.eq(q.field('name'), args.name)).first()
    return medicine
  }
})

export const AddMedicine = mutation({
  args: {
    name: v.string(),
    time: v.string(),
    every: v.union(
      v.literal('day'),
      v.literal('week'),
      v.literal('month'),
      v.literal('none')
    )
  },
  async handler (ctx, args) {
    const medicineId = await ctx.db
      .insert('medicine', {
        name: args.name,
        time: args.time,
        every: args.every
      })
    return `Success Add ${medicineId}`
  }
})

export const internalDayNotification = internalMutation({
  async handler (ctx) {
    const medicine = await ctx.db.query('medicine').order('desc').collect()
    medicine.forEach(function (medicine) {
      if (medicine.every === 'day') {
        const date = new Date()
        const NowDateTime = date.toLocaleString()
        const NowTimeOnly = NowDateTime.match(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        const DBTime = medicine.time.match(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)

        if (NowTimeOnly === null) throw new Error('プログラムの時刻形式に誤りがあります')
        if (DBTime === null) throw new Error('データベースの時刻形式に誤りがあります')
        if (DBTime[0] === NowTimeOnly[0]) {
          const response = fetch(`https://discordapp.com/api/channels/${process.env.CHANEL_ID}/messages`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Authorization: `Bot ${process.env.DISCORD_TOKEN}`
            },
            body: JSON.stringify(
              { username: 'UtakataBot', content: `${medicine.name}を飲む時間(${medicine.time})になりました` }
            )
          })
          void response.then((c) => {
            if (!(c.ok)) {
              throw new Error('投稿に失敗しました')
            }
          })
        }
      }
    })
  }
})
