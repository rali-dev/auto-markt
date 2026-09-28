import {
  ObjectType,
  Field,
  Float,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { ProductCategory } from '@org/backend-shared-database';

// Prisma 7 erzeugt Enums als const-Objekt plus Union-Typ, nicht als TS-Enum.
// registerEnumType macht daraus einen echten GraphQL-Enum, sonst kennt das
// Schema den Typ `ProductCategory` nicht.
registerEnumType(ProductCategory, {
  name: 'ProductCategory',
  description: 'Kategorie eines Ersatzteils.',
});

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field()
  image!: string;

  @Field()
  brand!: string;

  @Field(() => ProductCategory)
  category!: ProductCategory;

  @Field()
  stripePriceId!: string;

  @Field(() => Boolean)
  isFeatured!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
