import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import * as jwt from 'jsonwebtoken';
import { LoginInput } from './dtos/login.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    private readonly config: ConfigService,
  ) {}
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: 'The email is already taken' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: `Couldn't create account, ${e} ` };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: "This email doesn't exsist. Create an account first",
        };
      }
      const checkPassword = await user.checkPassword(password);
      // const userPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return { ok: false, error: "This password doesn't match. Try again" };
      }
      const token = jwt.sign({ id: user.id }, this.config.get('TOKEN_SECRET'));
      return { ok: true, token: 'jajaja' };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
