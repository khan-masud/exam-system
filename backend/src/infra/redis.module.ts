import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: async () => {
        const client = createClient({
          url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
        });
        client.on('error', (err) => console.error('Redis error', err));
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
