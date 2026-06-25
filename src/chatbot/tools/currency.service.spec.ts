import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { ConfigService } from '@nestjs/config';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(async () => {
    // Mock global fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ rates: { USD: 1, EUR: 0.85, CAD: 1.25 } }),
      }),
    ) as jest.Mock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock_app_id'),
          },
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert currencies correctly based on mocked rates', async () => {
    // 100 USD to EUR (rate 0.85) -> 85
    const result = await service.convertCurrencies(100, 'USD', 'EUR');
    expect(result).toBe(85);
  });
});
