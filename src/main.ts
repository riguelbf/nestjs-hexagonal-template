import { NestFactory } from '@nestjs/core';
import { AppModule } from '05-crosscutting/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerWinston } from '05-crosscutting/middlewares/logging/LoggerWinston.middleware';

const port = process.env.PORT || '3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerWinston,
    snapshot: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Z-Place')
    .setDescription('The z-place API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // GRACEFULLY SHUTDOWN
  app.enableShutdownHooks();

  await app.listen(port);
}
bootstrap();
