import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Users } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verifications extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  //One to One relationship, one user can have one verification and one verification can have one user as well.
  //One to Many relationship, one user can have many restaurants or one post can have many likes, for example
  @OneToOne((type) => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
