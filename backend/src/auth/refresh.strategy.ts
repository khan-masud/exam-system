import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'exam-refresh',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { sub: string }) {
    const refreshToken = (request as any).body?.refreshToken;
    const valid = await this.authService.validateRefreshToken(payload.sub, refreshToken);
    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { id: payload.sub };
  }
}
