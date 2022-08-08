import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { DeleteAccountInput } from './dtos/delete-account.dto';
import { Verifications } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    @InjectRepository(Verifications)
    private readonly verifications: Repository<Verifications>,
    private readonly jwtService: JwtService,
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
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
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
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<Users> {
    return this.users.findOne({ where: { id } });
  }

  async editProfile(
    id: number,
    { email, password }: EditProfileInput,
  ): Promise<Users> {
    const user = await this.users.findOne({ where: { id } });
    if (email) {
      user.email = email;
      user.verified = false;
      await this.verifications.save(this.verifications.create({ user }));
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
    // userID is in @AuthUser used in user.resolver
    // {...editProfileInput} activate only changed values in an object
  }
  async deleteAccount(
    id: number,
    { password }: DeleteAccountInput,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const user = await this.users.findOne({ where: { id } });
      const checkPassword = await user.checkPassword(password);
      if (!checkPassword) {
        return { ok: false, error: "This password doesn't match. Try again" };
      }
      await this.users.remove(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
