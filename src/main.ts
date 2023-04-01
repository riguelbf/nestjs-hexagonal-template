import { NestFactory } from '@nestjs/core';
import { AppModule } from './04-crosscutting/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { loggerWinston } from './04-crosscutting/middlewares/logging/logger-winston.middleware';

const port = process.env.PORT || '3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerWinston,
  });

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The z-place API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
