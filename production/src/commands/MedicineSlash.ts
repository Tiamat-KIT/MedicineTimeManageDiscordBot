import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { SlashCommandBuilder } from 'discord.js';

const MedicineCommand = (builder: SlashCommandBuilder) => builder
    .setName('medicine')
    .setDescription('お薬の情報を登録')
    .addStringOption(time => time
      .setName('time')
      .setDescription('時間登録')
      .setRequired(true)
      .setMaxLength(5)
      .setMinLength(5)
    )
    .addStringOption(name => name.setName('name').setDescription('名前').setRequired(true).setMinLength(3))
    .addStringOption(every => every.setName('every').setDescription('繰り返す？').setRequired(true).addChoices(
      { name: '毎日', value: 'day' },
      { name: '毎週', value: 'week' },
      { name: '毎月', value: 'month' },
      { name: 'しない', value: 'none' }
    ))

@ApplyOptions<Command.Options>({
	description: 'A basic slash command'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(MedicineCommand);
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		if (interaction.commandName === 'medicine') {
			const TimeOpt = interaction.options.getString('time')
			const NameOpt = interaction.options.getString('name')
			const EveryOpt = interaction.options.getString('every') as Doc<'medicine'>['every']
			if (NameOpt == null || TimeOpt == null || EveryOpt == null) throw new Error('正常な値取得ができていません')
			const TimeRegexed = TimeOpt.match(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
			const TimeRegexedText = TimeRegexed?.[0]
			if (TimeRegexed === null || TimeRegexedText === undefined) {
			  await interaction.reply('時間指定が間違っています')
			  return
			}
			const getHour = parseInt(TimeRegexed[1].toString())
			const getMinute = parseInt(TimeRegexed[2].toString())
			const NowDate = new Date()
			NowDate.setHours(getHour)
			NowDate.setMinutes(getMinute)
			const InputItem = await UtakataConvexClient.mutation(api.medicine.AddMedicine, {
			  name: NameOpt,
			  time: NowDate.toLocaleTimeString(),
			  every: EveryOpt as Doc<'medicine'>['every']
			})
			const resultEvery = EveryOpt === 'day' ? '毎日' : EveryOpt === 'week' ? '毎週' : '毎月'
			console.log(InputItem)
			await interaction.reply(`${NameOpt}を${TimeOpt}に${resultEvery}飲みます`)
		  }
	}
}

