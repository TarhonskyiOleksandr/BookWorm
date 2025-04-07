import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(query: Partial<User>, options?: { password: boolean }) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where(query);

    if (options?.password) queryBuilder.addSelect('user.password');

    const user = await queryBuilder.getOne();

    return user;
  }

  async createUser(data: CreateUserDto) {
    const user = await this.findUser({ email: data.email });
    if (user) throw new ConflictException('User already exists');

    const password = await argon2.hash(data.password);
    const newUser = {
      ...data,
      password,
    };

    await this.userRepository.save(newUser);

    return {
      message: 'New user created',
      data,
    };
  }
}
