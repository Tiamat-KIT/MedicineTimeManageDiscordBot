import {
  type Message,
  Events,
  type Client
} from 'discord.js'
import hey from './slash/medicine'
import { client } from './client'

client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`)
})

void client.login(process.env.DISCORD_TOKEN)
console.info('Discordサーバ起動')

while (true) {
  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) {
      return
    }

    if (message.content.startsWith('!ping')) {
      void message.reply('Pong!')
    }
  })

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    if (interaction.commandName === hey.data.name) {
      try {
        await hey.execute(interaction)
      } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true })
        } else {
          await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true })
        }
      }
    } else {
      console.error(`${interaction.commandName}というコマンドには対応していません。`)
    }
  })
}
