import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js'
import { UtakataConvexClient } from '../client'
import { api } from '../../convex/_generated/api'
import { type Doc } from '../../convex/_generated/dataModel'

export default {
  data: new SlashCommandBuilder()
    .setName('medicine')
    .setDescription('お薬の情報を登録')
    .addStringOption(time => time.setName('time').setDescription('時間登録').setRequired(true))
    .addStringOption(name => name.setName('name').setDescription('名前').setRequired(true))
    .addStringOption(every => every.setName('every').setDescription('繰り返す？').setRequired(true).addChoices(
      { name: '毎日', value: 'day' },
      { name: '毎週', value: 'week' },
      { name: '毎月', value: 'month' },
      { name: 'しない', value: 'none' }
    )),
  execute: async function (interaction: ChatInputCommandInteraction) {
    if (interaction.commandName === 'medicine') {
      const TimeOpt = interaction.options.getString('time')
      const NameOpt = interaction.options.getString('name')
      const EveryOpt = interaction.options.getString('every')
      if (NameOpt == null || TimeOpt == null || EveryOpt == null) throw new Error('正常な値取得ができていません')
      void UtakataConvexClient.mutation(api.medicine.AddMedicine, {
        name: NameOpt,
        time: TimeOpt,
        every: EveryOpt as Doc<'medicine'>['every']
      })
      await interaction.reply(`${NameOpt}を${TimeOpt}に${EveryOpt}飲みます`)
    }
  }
}
