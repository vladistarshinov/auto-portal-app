import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

import { getTelegramConfig } from '../../config/telegram.config';
import { ITelegramOptions } from './telegram.interface';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constant';

@Injectable()
export class TelegramService {
    bot: Telegraf;
    options: ITelegramOptions;

    constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
        this.options = options;
        this.bot = new Telegraf(this.options.token);
    }

    async sendMessage(
        msg: string,
        options?: ExtraReplyMessage,
        chatId: string = this.options.chatId
    ) {
        await this.bot.telegram.sendMessage(chatId, msg, {
            parse_mode: 'HTML',
            ...options,
        });
    }

    async sendPhoto(
        photo: string,
        msg?: string,
        chatId: string = this.options.chatId
    ) {
        await this.bot.telegram.sendPhoto(chatId, photo, {
            caption: msg,
        });
    }
}
