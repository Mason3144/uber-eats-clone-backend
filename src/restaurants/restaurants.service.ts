import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantsDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  //  restaurants의 an argument로 Restaurant을 연결
  //  <Restaurant> typescript의 generic으로 Restaurant안의 타입을 스스로 알아냄

  //
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantsDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
