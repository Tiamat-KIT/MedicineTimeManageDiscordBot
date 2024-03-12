import { Command } from "@sapphire/framework";
import { Message,TextBasedChannelTypes } from "discord.js";

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: 'Test Command for the bot',
            name: 'ping',
            aliases: ['pong']
        });

    }
    public async messageRun(message: Message) {
        const channel = await message.channel
        if(channel.isTextBased()){
            if("send" in channel){
                const msg = await channel.send('Pinging...');
                return msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
            }
        }
    }
}