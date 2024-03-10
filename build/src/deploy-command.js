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
const medicine_1 = __importDefault(require("./slash/medicine"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commands = [medicine_1.default.data.toJSON()];
if (process.env.APP_ID === undefined || process.env.GUILD_ID === undefined || process.env.DISCORD_TOKEN === undefined) {
    throw new Error('環境変数エラー');
}
const AppID = process.env.APP_ID;
const GuildID = process.env.GUILD_ID;
const Token = process.env.DISCORD_TOKEN;
const rest = new discord_js_1.REST({ version: '10' }).setToken(Token);
// eslint-disable-next-line @typescript-eslint/no-extra-parens, @typescript-eslint/no-unused-expressions
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rest.put(discord_js_1.Routes.applicationGuildCommands(AppID, GuildID), { body: commands });
    }
    catch (error) {
        console.error('コマンド登録中にエラーが発生', error);
    }
}));
