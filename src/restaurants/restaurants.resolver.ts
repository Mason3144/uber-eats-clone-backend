import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantsDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input')
    createRestaurantsDto: CreateRestaurantsDto,
  ): Promise<boolean> {
    console.log(createRestaurantsDto);
    try {
      await this.restaurantService.createRestaurant(createRestaurantsDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
