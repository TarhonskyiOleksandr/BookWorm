import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async verifyUser(email: string, password: string) {
    const user = await this.userService.findUser({ email }, { password: true });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
