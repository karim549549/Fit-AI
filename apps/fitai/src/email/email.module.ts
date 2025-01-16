import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailFactory } from './factories/email.factory';
@Module({
  imports: [],
  providers: [
    EmailService,
    EmailFactory,
  ],
  exports: [EmailService],
})
export class EmailModule {}
