import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { AttemptsModule } from './attempts/attempts.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { InstallModule } from './install/install.module';
import { LicenseModule } from './license/license.module';
import { RedisModule } from './infra/redis.module';
import { DatabaseEntities } from './common/database.entities';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 120 }]),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    }),
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'exam',
      password: process.env.DB_PASS || 'exam',
      database: process.env.DB_NAME || 'exam',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature(DatabaseEntities),
    AuthModule,
    UsersModule,
    ExamsModule,
    AttemptsModule,
    LeaderboardModule,
    PaymentsModule,
    NotificationsModule,
    AnalyticsModule,
    InstallModule,
    LicenseModule,
  ],
})
export class AppModule {}
