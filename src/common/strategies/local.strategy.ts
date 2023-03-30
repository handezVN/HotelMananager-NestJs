import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/dto/UserDTO';
import { UserService } from 'src/user/user.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super({ email: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.loginUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
