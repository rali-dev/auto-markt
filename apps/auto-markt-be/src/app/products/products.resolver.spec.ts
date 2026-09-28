import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

// Der Resolver wird isoliert getestet: der ProductsService ist gemockt, damit
// weder Prisma noch eine Datenbank im Spiel sind.
describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  const productsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    searchProducts: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        { provide: ProductsService, useValue: productsService },
      ],
    }).compile();

    resolver = module.get(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('findAll delegates to the service', async () => {
    const products = [{ id: '1' }];
    productsService.findAll.mockResolvedValue(products);

    await expect(resolver.findAll()).resolves.toBe(products);
  });

  it('searchProducts passes the term to the service', () => {
    resolver.searchProducts('turbo');

    expect(productsService.searchProducts).toHaveBeenCalledWith('turbo');
  });

  it('updateProduct splits the id from the update data', () => {
    resolver.updateProduct({ id: '42', price: 99.9 });

    expect(productsService.update).toHaveBeenCalledWith('42', { price: 99.9 });
  });
});
