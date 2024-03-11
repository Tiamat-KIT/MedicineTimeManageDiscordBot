import {
  Client,
  GatewayIntentBits
} from 'discord.js'
import {
  ConvexClient
} from 'convex/browser'
import dotenv from 'dotenv'

dotenv.config()

export const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

if (process.env.CONVEX_URL === undefined) throw new Error('Convexの環境変数が設定されていません')

export const UtakataConvexClient = new ConvexClient(process.env.CONVEX_URL)
