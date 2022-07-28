import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsString, isString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

enum UserRole {
  Owner,
  Client,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Users extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Column()
  password: string;

  @Field((type) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
