import { Module } from '@nestjs/common';
import { TransactionWebhookController } from './controllers/webhook/transaction.webhook.controller';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [],
  controllers: [TransactionWebhookController],
  providers: [TransactionService],
})
export class TransactionModule {}
