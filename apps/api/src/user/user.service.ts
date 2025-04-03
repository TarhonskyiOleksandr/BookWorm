import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUser(query: Partial<User>, options: { password: boolean }) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where(query);

    if (options.password) queryBuilder.addSelect('user.password');

    const user = await queryBuilder.getOne();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createUser(data: CreateUserDto) {
    const password = await argon2.hash(data.password);
    const user = {
      ...data,
      password,
    };

    this.userRepository.save(user);
  }
}
