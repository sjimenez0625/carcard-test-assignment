import { Body, Controller, Post } from '@nestjs/common';
import { TransactionWebhookDto } from 'src/transaction/dtos/transaction-webhook.dto';
import { TransactionService } from 'src/transaction/services/transaction.service';

@Controller('transaction')
export class TransactionWebhookController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('webhook')
  async handleWebhook(@Body() payload: TransactionWebhookDto) {
    await this.transactionService.processTransaction(payload);
  }
}
