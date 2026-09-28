import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  type Product as ProductModel,
} from '@org/backend-shared-database';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput): Promise<ProductModel> {
    return this.prisma.product.create({ data: createProductInput });
  }

  findAll(): Promise<ProductModel[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string): Promise<ProductModel | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async searchProducts(term: string): Promise<ProductModel[]> {
    const lowercaseTerm = term.toLowerCase();
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: lowercaseTerm, mode: 'insensitive' } },
          { description: { contains: lowercaseTerm, mode: 'insensitive' } },
        ],
      },
    });
  }

  update(
    id: string,
    data: Omit<UpdateProductInput, 'id'>,
  ): Promise<ProductModel> {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: string): Promise<ProductModel> {
    return this.prisma.product.delete({ where: { id } });
  }
}
