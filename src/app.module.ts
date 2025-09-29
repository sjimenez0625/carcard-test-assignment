import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TransactionModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
