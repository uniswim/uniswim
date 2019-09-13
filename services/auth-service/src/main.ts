import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //await app.listen(3000);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222'
    }
  });
  app.listen(() => console.log("Auth Microservice is listening"))
}
bootstrap();
