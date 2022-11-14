import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      // access_token: this.jwtService.sign(payload),
      access_token: 'jwt',
      user,
    };
  }
}
