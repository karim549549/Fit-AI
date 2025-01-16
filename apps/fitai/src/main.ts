import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import  { join } from 'path';
import {
  AUTH_PACKAGE_NAME
} from '@app/common'
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto'),
        url: 'localhost:5003',
      },
    } 
  );
  await app.listen();
}
bootstrap();