import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

interface jwtPayload {
  name: string;
  id: string;
}

export interface UserDetails {
  id: string;
  name: string;
  email?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const { username, password, assets, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user: UserDetails): { access_token: string } {
    const payload: jwtPayload = {
      id: user.id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async verify(token: string): Promise<User> {
    const decoded: jwtPayload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.userService.findByName(decoded.name);
    return user;
  }
}
