import { Injectable } from '@nestjs/common';
import { TransactionWebhookDto } from '../dtos/transaction-webhook.dto';
import { EmailService } from 'src/email/services/email.service';
import { EMAIL_TEMPLATES } from 'src/email/constants/email.constant';
import { TRANSACTION_TYPE } from '../constants/transaction.constant';

@Injectable()
export class TransactionService {
  constructor(private readonly emailService: EmailService) {}

  async processTransaction(transaction: TransactionWebhookDto): Promise<void> {
    const { type } = transaction;

    let emailSubject = 'Transaction Processed';
    let emailTemplate = EMAIL_TEMPLATES.TRANSACTION_SUCCESS;
    if (type === TRANSACTION_TYPE.SUSPICIOUS) {
      emailSubject = 'Suspicious Transaction Alert';
      emailTemplate = EMAIL_TEMPLATES.TRANSACTION_SUSPICIOUS;
    }

    await this.emailService.sendTemplateEmail(
      transaction.userEmail,
      emailSubject,
      emailTemplate,
      { amount: transaction.amount },
    );
  }
}
