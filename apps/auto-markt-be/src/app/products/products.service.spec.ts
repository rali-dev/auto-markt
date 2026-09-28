import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@org/backend-shared-database';
import { ProductsService } from './products.service';

// Unit-Test ohne Datenbank: der PrismaService wird durch einen Mock ersetzt,
// damit der Test auch in CI (ohne erreichbare DB) laeuft. Geprueft wird, dass
// der Service die richtigen Prisma-Aufrufe absetzt.
describe('ProductsService', () => {
  let service: ProductsService;

  const productDelegate = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: { product: productDelegate } },
      ],
    }).compile();

    service = module.get(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll returns all products', async () => {
    const products = [{ id: '1' }, { id: '2' }];
    productDelegate.findMany.mockResolvedValue(products);

    await expect(service.findAll()).resolves.toBe(products);
    expect(productDelegate.findMany).toHaveBeenCalledWith();
  });

  it('findOne looks up a product by id', async () => {
    productDelegate.findUnique.mockResolvedValue(null);

    await expect(service.findOne('42')).resolves.toBeNull();
    expect(productDelegate.findUnique).toHaveBeenCalledWith({
      where: { id: '42' },
    });
  });

  it('searchProducts matches name or description case-insensitively', async () => {
    productDelegate.findMany.mockResolvedValue([]);

    await service.searchProducts('Brembo');

    expect(productDelegate.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: 'brembo', mode: 'insensitive' } },
          { description: { contains: 'brembo', mode: 'insensitive' } },
        ],
      },
    });
  });

  it('update writes the data to the given id', async () => {
    await service.update('42', { price: 99.9 });

    expect(productDelegate.update).toHaveBeenCalledWith({
      where: { id: '42' },
      data: { price: 99.9 },
    });
  });

  it('remove deletes the product by id', async () => {
    await service.remove('42');

    expect(productDelegate.delete).toHaveBeenCalledWith({
      where: { id: '42' },
    });
  });
});
