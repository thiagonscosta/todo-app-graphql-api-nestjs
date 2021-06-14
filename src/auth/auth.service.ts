import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth-input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  
  constructor(
    private userService: UserService, 
    private jwtService: JwtService
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findByEmail(data.email);

    const validPassword = compareSync(data.password, user.password);

    if(!validPassword) {
      throw new UnauthorizedException('Incorrect Password')
    }

    const token = await this.jwtTokenGenerate(user);

    return {
      user, token
    }
  }

  private async jwtTokenGenerate(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
