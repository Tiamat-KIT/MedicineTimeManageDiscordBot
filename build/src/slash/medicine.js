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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const api_1 = require("../../convex/_generated/api");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('medicine')
        .setDescription('お薬の情報を登録')
        .addStringOption(time => time.setName('time').setDescription('時間登録').setRequired(true))
        .addStringOption(name => name.setName('name').setDescription('名前').setRequired(true))
        .addStringOption(every => every.setName('every').setDescription('繰り返す？').setRequired(true).addChoices({ name: '毎日', value: 'day' }, { name: '毎週', value: 'week' }, { name: '毎月', value: 'month' }, { name: 'しない', value: 'none' })),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.commandName === 'medicine') {
                const TimeOpt = interaction.options.getString('time');
                const NameOpt = interaction.options.getString('name');
                let EveryOpt = interaction.options.getString('every') !== 'none' ? interaction.options.getString('every') : '';
                if (EveryOpt === 'day') {
                    EveryOpt = '毎日';
                }
                else if (EveryOpt === 'week') {
                    EveryOpt = '毎週';
                }
                else if (EveryOpt === 'month') {
                    EveryOpt = '毎月';
                }
                if (NameOpt == null || TimeOpt == null)
                    throw new Error('正常な値取得ができていません');
                void client_1.ConvexBrowserClient.mutation(api_1.api.medicine.AddMedicine, {
                    name: NameOpt,
                    time: TimeOpt,
                    every: EveryOpt
                });
                yield interaction.reply(`${NameOpt}を${TimeOpt}に${EveryOpt}飲みます`);
            }
        });
    }
};
