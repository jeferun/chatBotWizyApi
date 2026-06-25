import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ProductsService } from './tools/products.service';
import { CurrencyService } from './tools/currency.service';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, ProductsService, CurrencyService]
})
export class ChatbotModule {}
