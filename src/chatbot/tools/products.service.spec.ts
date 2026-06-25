import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService, Product } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    // Inject mocked data into memory to avoid depending on the real CSV in the test

    service['products'] = [
      {
        displayTitle: 'iPhone 13',
        embeddingText: 'Apple phone',
        productType: 'electronics',
      },
      {
        displayTitle: 'Samsung S21',
        embeddingText: 'Android phone',
        productType: 'electronics',
      },
      {
        displayTitle: 'MacBook Pro',
        embeddingText: 'Laptop',
        productType: 'computers',
      },
    ] as Product[];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find products by query and limit to 2', () => {
    const results = service.searchProducts('phone');
    expect(results.length).toBe(2);
    expect(results[0].displayTitle).toBe('iPhone 13');
  });

  it('should find products by type', () => {
    const results = service.searchProducts('computers');
    expect(results.length).toBe(1);
    expect(results[0].displayTitle).toBe('MacBook Pro');
  });
});
