import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

export interface Product {
  displayTitle: string;
  embeddingText: string;
  url: string;
  imageUrl: string;
  productType: string;
  discount: string;
  price: string;
  variants: string;
  createDate: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private readonly logger = new Logger(ProductsService.name);

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const csvFilePath = path.resolve(process.cwd(), 'products_list.csv');
    if (!fs.existsSync(csvFilePath)) {
      this.logger.warn(
        `File ${csvFilePath} not found. Ensure it exists in the root directory.`,
      );
      return;
    }

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: Product) => this.products.push(data))
      .on('end', () => {
        this.logger.log(`Loaded ${this.products.length} products from CSV.`);
      });
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();

    const results = this.products.filter((p) => {
      const titleMatch = p.displayTitle?.toLowerCase().includes(lowerQuery);
      const textMatch = p.embeddingText?.toLowerCase().includes(lowerQuery);
      const typeMatch = p.productType?.toLowerCase().includes(lowerQuery);
      return titleMatch || textMatch || typeMatch;
    });

    return results.slice(0, 2);
  }
}
