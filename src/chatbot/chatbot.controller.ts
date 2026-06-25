import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Send a query to the AI Customer Support Agent' })
  @ApiResponse({ status: 200, description: 'The final response from the LLM' })
  async chat(@Body() chatRequestDto: ChatRequestDto) {
    const response = await this.chatbotService.handleChat(chatRequestDto.query);
    return { response };
  }
}
