import { Injectable } from '@nestjs/common';
import { TransactionWebhookDto } from '../dtos/transaction-webhook.dto';
import { EmailService } from 'src/email/services/email.service';

@Injectable()
export class TransactionService {
  constructor(private readonly emailService: EmailService) {}

  async processTransaction(transaction: TransactionWebhookDto): Promise<void> {
    console.log('Processing transaction:', transaction);
    await this.emailService.sendEmail(
      transaction.userEmail,
      'Transaction Received',
      `Your transaction of amount ${transaction.amount} has been processed.`,
    );
  }
}
