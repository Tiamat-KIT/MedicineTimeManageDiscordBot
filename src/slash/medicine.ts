import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js'

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
      let EveryOpt = interaction.options.getString('every') !== 'none' ? interaction.options.getString('every') : ''
      if (EveryOpt === 'day') {
        EveryOpt = '毎日'
      } else if (EveryOpt === 'week') {
        EveryOpt = '毎週'
      } else if (EveryOpt === 'month') {
        EveryOpt = '毎月'
      }
      await interaction.reply(`${NameOpt}を${TimeOpt}に${EveryOpt}飲みます`)
    }
  }
}
