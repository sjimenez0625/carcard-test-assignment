import { Body, Controller, Post } from '@nestjs/common';
import { AppLogger } from 'src/shared/logger/logger.service';
import { TransactionWebhookDto } from 'src/transaction/dtos/transaction-webhook.dto';
import { TransactionService } from 'src/transaction/services/transaction.service';

@Controller('transaction')
export class TransactionWebhookController {
  constructor(
    private readonly logger: AppLogger,
    private readonly transactionService: TransactionService,
  ) {
    this.logger.setContext(TransactionWebhookController.name);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: TransactionWebhookDto) {
    this.logger.log('Received transaction webhook', payload);
    await this.transactionService.processTransaction(payload);
  }
}
