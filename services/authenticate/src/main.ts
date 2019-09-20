import { NestFactory } from '@nestjs/core';
import { AuthenticateModule } from './authenticate.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //await app.listen(3000);
  const app = await NestFactory.createMicroservice(AuthenticateModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222'
    }
  });
  app.listen(() => Logger.log("Microservice is listening", "Authenticate Service"));
}
bootstrap();
