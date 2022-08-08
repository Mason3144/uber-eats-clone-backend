import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Users } from '../entities/user.entity';

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}

@InputType()
export class DeleteAccountInput extends PickType(Users, ['password']) {}
