import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService, ConfigType } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { AuthService } from '../services/auth.service';
import { PayloadToken } from '../models/token.model';
import config from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: PayloadToken) {
    return payload;
  }
}
