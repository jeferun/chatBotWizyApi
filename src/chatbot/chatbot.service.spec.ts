import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotService } from './chatbot.service';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from './tools/products.service';
import { CurrencyService } from './tools/currency.service';

// Mock of the official OpenAI library
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'Mocked AI Response',
                  tool_calls: undefined,
                },
              },
            ],
          }),
        },
      },
    };
  });
});

describe('ChatbotService', () => {
  let service: ChatbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('mock_openai_key') },
        },
        {
          provide: ProductsService,
          useValue: { searchProducts: jest.fn().mockResolvedValue([]) },
        },
        {
          provide: CurrencyService,
          useValue: { convertCurrencies: jest.fn().mockResolvedValue(100) },
        },
      ],
    }).compile();

    service = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a plain text response when no tools are requested', async () => {
    const response = await service.handleChat('Hello, text test');
    expect(response).toBe('Mocked AI Response');
  });
});
