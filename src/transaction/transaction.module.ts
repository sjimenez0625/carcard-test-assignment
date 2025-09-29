import { Module } from '@nestjs/common';
import { TransactionWebhookController } from './controllers/webhook/transaction.webhook.controller';
import { TransactionService } from './services/transaction.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [TransactionWebhookController],
  providers: [TransactionService],
})
export class TransactionModule {}
