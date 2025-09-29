import { Body, Controller, Post } from '@nestjs/common';
import { TransactionWebhookDto } from 'src/transaction/dtos/transaction-webhook.dto';

@Controller('transaction')
export class TransactionWebhookController {
  @Post('webhook')
  handleWebhook(@Body() payload: TransactionWebhookDto) {
    // Handle the webhook payload
  }
}
