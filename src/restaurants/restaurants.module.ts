import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  //forRoot, forFeature 둘다 config와 관련이잇지만 둘사이의 목적이 다름
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantResolver, RestaurantsService],
  controllers: [],
})
export class RestaurantsModule {}
