import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './create-restaurant.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantsDto) {}
//PartialType은 CreateRestaurantsDto안의 property들이 optional일때 사용

@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
