import { Module } from '@nestjs/common';
import { RestayrantResolver } from './restaurants.resolver';

@Module({
  providers: [RestayrantResolver],
})
export class RestaurantsModule {}
