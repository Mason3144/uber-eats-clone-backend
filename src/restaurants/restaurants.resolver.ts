import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver()
export class RestayrantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurants(
    @Args()
    createRestaurantsDto: CreateRestaurantsDto,
  ): boolean {
    console.log(createRestaurantsDto);
    return true;
  }
}
