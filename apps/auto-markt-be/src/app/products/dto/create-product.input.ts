import { InputType, Field, Float } from '@nestjs/graphql';
import { ProductCategory } from '@org/backend-shared-database';

@InputType()
export class CreateProductInput {
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

  // defaultValue spiegelt `@default(false)` aus dem Prisma-Schema, damit das
  // Feld in der Mutation weggelassen werden kann.
  @Field(() => Boolean, { defaultValue: false })
  isFeatured!: boolean;
}
