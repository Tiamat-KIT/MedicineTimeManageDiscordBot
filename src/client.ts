import {
  Client,
  GatewayIntentBits
} from 'discord.js'
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
