import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits, OAuth2Scopes } from 'discord.js'
import '@sapphire/plugin-api/register'

export const client = new SapphireClient({
    defaultPrefix: '!',
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    loadMessageCommandListeners: true,
    api: {
        auth: {
            id: process.env.CLIENT_ID!,
            secret: process.env.CLIENT_SECRET!,
            scopes: [
                OAuth2Scopes.Identify,
                OAuth2Scopes.Guilds,
                OAuth2Scopes.Bot
            ],
            cookie: 'SAPPHIRE_AUTH',
            domainOverwrite: '127.0.0.1'
        },
        prefix: '',
        origin: '*',
        listenOptions: {
            port: 3000
        }
    }
})