import { Injectable } from '@nestjs/common';
import { UsersService } from './../../users/services/users.service';
import * as brypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await brypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }
}
