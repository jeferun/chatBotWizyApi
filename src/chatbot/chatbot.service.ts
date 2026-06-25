import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ProductsService } from './tools/products.service';
import { CurrencyService } from './tools/currency.service';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    private configService: ConfigService,
    private productsService: ProductsService,
    private currencyService: CurrencyService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({ apiKey });
  }

  async handleChat(userQuery: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are a helpful customer support agent for WizyBot store. You can search products and convert currencies. CRITICAL RULE: Whenever you mention a product from the database, you MUST ALWAYS include its image using markdown: ![alt](imageUrl), a link to it, and explicitly list its available "variants" (colors, sizes, etc.) if they are provided in the data.',
      },
      { role: 'user', content: userQuery },
    ];

    const tools: OpenAI.Chat.ChatCompletionTool[] = [
      {
        type: 'function',
        function: {
          name: 'searchProducts',
          description:
            'Search for products based on a user query. Returns max 2 items.',
          parameters: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description:
                  'The search term for the product, e.g. "phone" or "watch"',
              },
            },
            required: ['query'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'convertCurrencies',
          description: 'Convert a price from one currency to another.',
          parameters: {
            type: 'object',
            properties: {
              price: {
                type: 'number',
                description: 'The price amount to convert',
              },
              from: {
                type: 'string',
                description:
                  'The 3-letter currency code to convert from, e.g. USD, EUR',
              },
              to: {
                type: 'string',
                description:
                  'The 3-letter currency code to convert to, e.g. CAD, EUR',
              },
            },
            required: ['price', 'from', 'to'],
          },
        },
      },
    ];

    try {
      let keepCalling = true;
      let finalResponse = '';

      while (keepCalling) {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          tools,
          tool_choice: 'auto',
        });

        const responseMessage = response.choices[0].message;

        if (
          responseMessage.tool_calls &&
          responseMessage.tool_calls.length > 0
        ) {
          messages.push(responseMessage); // Important: append assistant's tool calls to conversation

          for (const toolCall of responseMessage.tool_calls) {
            if (toolCall.type !== 'function') continue;

            const functionName = toolCall.function.name;
            const functionArgs = JSON.parse(toolCall.function.arguments) as {
              query?: string;
              price?: number;
              from?: string;
              to?: string;
            };
            let functionResponse = '';

            this.logger.log(
              `LLM requested function: ${functionName} with args: ${JSON.stringify(functionArgs)}`,
            );

            // Execute the function locally
            if (functionName === 'searchProducts') {
              const products = this.productsService.searchProducts(
                functionArgs.query || '',
              );
              functionResponse = JSON.stringify(products);
            } else if (functionName === 'convertCurrencies') {
              const result = await this.currencyService.convertCurrencies(
                functionArgs.price || 0,
                functionArgs.from || '',
                functionArgs.to || '',
              );
              functionResponse = JSON.stringify({ result });
            }

            // Append tool output to conversation
            messages.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              content: functionResponse,
            });
          }
        } else {
          // No more tool calls, exit loop
          keepCalling = false;
          finalResponse =
            responseMessage.content || 'I could not generate a response.';
        }
      }

      return finalResponse;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error in ChatbotService: ${msg}`);
      throw error;
    }
  }
}
