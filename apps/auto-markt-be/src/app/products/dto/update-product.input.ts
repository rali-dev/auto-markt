import { CreateProductInput } from './create-product.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

// PartialType macht alle Felder aus CreateProductInput optional -- bis auf die
// id, die hier bewusst wieder als Pflichtfeld deklariert wird.
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  id!: string;
}
