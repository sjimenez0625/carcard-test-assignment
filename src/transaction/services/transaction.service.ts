import { Injectable } from '@nestjs/common';
import { TransactionWebhookDto } from '../dtos/transaction-webhook.dto';
import { EmailService } from 'src/email/services/email.service';
import { EMAIL_TEMPLATES } from 'src/email/constants/email.constant';
import { TRANSACTION_TYPE } from '../constants/transaction.constant';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly logger: AppLogger,
    private readonly emailService: EmailService,
  ) {
    this.logger.setContext(TransactionService.name);
  }

  async processTransaction(transaction: TransactionWebhookDto): Promise<void> {
    const { type, amount } = transaction;

    let emailSubject = 'Transaction Processed';
    let emailTemplate = EMAIL_TEMPLATES.TRANSACTION_SUCCESS;
    if (type === TRANSACTION_TYPE.SUSPICIOUS) {
      emailSubject = 'Suspicious Transaction Alert';
      emailTemplate = EMAIL_TEMPLATES.TRANSACTION_SUSPICIOUS;
    }

    try {
      await this.emailService.sendTemplateEmail(
        transaction.userEmail,
        emailSubject,
        emailTemplate,
        { amount },
      );

      this.logger.debug('Transaction processed successfully', {
        userEmail: transaction.userEmail,
        amount,
        type,
      });
    } catch (error) {
      this.logger.error(
        'Error processing transaction',
        error as Record<string, any>,
      );
      throw new Error('Failed to process transaction. Please try again later.');
    }
  }
}
