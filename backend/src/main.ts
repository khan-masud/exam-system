import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors({
    origin: [/localhost:\d+$/, /\.exam-portal\.test$/],
    credentials: true,
  });
  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ProctorX API')
    .setDescription('Anti-cheat exam management suite')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  Logger.log(`Exam system backend started on port ${port}`, 'Bootstrap');
}

bootstrap();
