import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) // for Validation
@ObjectType() //for GraphQL
@Entity() // for TypeOrm
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String) //for GraphQL
  @Column() // for TypeOrm
  @IsString() // for Validation
  @Length(2) // for Validation
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;
}
