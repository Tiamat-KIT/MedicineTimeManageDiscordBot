"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const medicine_1 = __importDefault(require("./slash/medicine"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ]
});
client.once(discord_js_1.Events.ClientReady, (c) => {
    var _a;
    console.log(`Ready! Logged in as ${(_a = c.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot) {
        return;
    }
    if (message.content.startsWith('!ping')) {
        void message.reply('Pong!');
    }
}));
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === medicine_1.default.data.name) {
        try {
            yield medicine_1.default.execute(interaction);
        }
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
            else {
                yield interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    }
    else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
}));
void client.login(process.env.DISCORD_TOKEN);
