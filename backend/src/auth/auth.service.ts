import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenPair } from './dto/token-pair.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly refreshTokens = new Map<string, string>();

  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto): Promise<TokenPair> {
    const passwordHash = await argon2.hash(dto.password);
    const user = this.usersRepo.create({
      email: dto.email.toLowerCase(),
      phone: dto.phone,
      passwordHash,
      passwordlessEnabled: dto.passwordless ?? false,
    });
    await this.usersRepo.save(user);
    await this.usersService.assignDefaultRoles(user.id);
    return this.issueTokens(user);
  }

  async validateUser(identifier: string, password?: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: [{ email: identifier }, { phone: identifier }], select: ['id', 'email', 'passwordHash'] });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!password) {
      if (!user.passwordlessEnabled) {
        throw new UnauthorizedException('Password required');
      }
      return user;
    }
    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto): Promise<TokenPair> {
    const user = await this.validateUser(dto.identifier, dto.password);
    return this.issueTokens(user);
  }

  async issueTokens(user: User): Promise<TokenPair> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET || 'exam-secret',
      expiresIn: parseInt(process.env.JWT_ACCESS_TTL || '900', 10),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'exam-refresh',
      expiresIn: parseInt(process.env.JWT_REFRESH_TTL || '604800', 10),
    });
    this.refreshTokens.set(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      expiresIn: parseInt(process.env.JWT_ACCESS_TTL || '900', 10),
    };
  }

  async refresh(userId: string, refreshToken: string): Promise<TokenPair> {
    const storedToken = this.refreshTokens.get(userId);
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token revoked');
    }
    const user = await this.usersRepo.findOneOrFail({ where: { id: userId } });
    return this.issueTokens(user);
  }

  async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
    return this.refreshTokens.get(userId) === refreshToken;
  }

  async revoke(userId: string): Promise<void> {
    this.refreshTokens.delete(userId);
  }
}
