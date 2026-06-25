import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(private configService: ConfigService) {}

  async convertCurrencies(price: number, from: string, to: string): Promise<number> {
    const appId = this.configService.get<string>('OPEN_EXCHANGE_RATES_APP_ID');
    if (!appId) {
      throw new Error('OPEN_EXCHANGE_RATES_APP_ID is not configured');
    }

    try {
      const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
      const data = await response.json();

      if (!data || !data.rates) {
        throw new Error('Failed to fetch exchange rates');
      }

      const rates = data.rates;
      const rateFrom = rates[from];
      const rateTo = rates[to];

      if (!rateFrom || !rateTo) {
        throw new Error(`Unsupported currency conversion: ${from} to ${to}`);
      }

      // Convert via base currency (USD usually in free tier)
      const priceInUsd = price / rateFrom;
      const finalPrice = priceInUsd * rateTo;

      return parseFloat(finalPrice.toFixed(2));
    } catch (error) {
      this.logger.error(`Error converting currencies: ${error.message}`);
      throw error;
    }
  }
}
