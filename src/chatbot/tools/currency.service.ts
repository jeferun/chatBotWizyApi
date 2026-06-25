import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private configService: ConfigService) {}

  async convertCurrencies(
    price: number,
    from: string,
    to: string,
  ): Promise<number> {
    const appId = this.configService.get<string>('OPEN_EXCHANGE_RATES_APP_ID');
    if (!appId) {
      throw new Error('OPEN_EXCHANGE_RATES_APP_ID is not configured');
    }

    const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`;

    try {
      const response = await fetch(url);
      const data = (await response.json()) as {
        rates?: Record<string, number>;
      };

      if (!data.rates) {
        throw new Error('Invalid response from currency API');
      }

      const rates = data.rates;
      const rateFrom = rates[from];
      const rateTo = rates[to];

      if (!rateFrom || !rateTo) {
        throw new Error('Currency code not found in rates');
      }

      const priceInUSD = price / rateFrom;
      const finalPrice = priceInUSD * rateTo;

      return Number(finalPrice.toFixed(2));
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Currency conversion error: ${msg}`);
      throw new Error(`Failed to convert currency: ${msg}`);
    }
  }
}
