import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => ({
    chatId: configService.get('CHAT_ID'),
    token: configService.get('TELEGRAM_TOKEN'),
});
