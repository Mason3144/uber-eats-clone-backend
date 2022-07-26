import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantsDto extends OmitType(Restaurant, ['id']) {}
