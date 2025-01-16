import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenManager } from './managers/token.manager';
import { TokenFactory } from './factories/token.factory';
import { TokenRepository } from './repositories/token.repository';
import { PrismaModule } from 'apps/fitai/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule , JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '0.15h' },
    global: true,
  }) , PrismaModule , EmailModule],
  providers: [
    AuthService,
    TokenManager,
    TokenFactory,
    TokenRepository,
    UserRepository,
  ]
})
export class AuthModule {}
