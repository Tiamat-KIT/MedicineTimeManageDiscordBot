import {
  REST,
  Routes
} from 'discord.js'
import hey from './slash/medicine'
import dotenv from 'dotenv'
dotenv.config()
const commands = [hey.data.toJSON()]

if (process.env.APP_ID === undefined || process.env.GUILD_ID === undefined || process.env.DISCORD_TOKEN === undefined) {
  throw new Error('環境変数エラー')
}
const AppID = process.env.APP_ID
const GuildID = process.env.GUILD_ID
const Token = process.env.DISCORD_TOKEN

const rest = new REST({ version: '10' }).setToken(Token)

// eslint-disable-next-line @typescript-eslint/no-extra-parens, @typescript-eslint/no-unused-expressions
void (async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        AppID,
        GuildID
      ), { body: commands }
    )
    console.log('コマンド追加できました')
  } catch (error) {
    console.error('コマンド登録中にエラーが発生', error)
  }
})()
