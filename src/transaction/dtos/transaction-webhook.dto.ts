import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TRANSACTION_TYPE } from '../constants/transaction.constant';

export class TransactionWebhookDto {
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TRANSACTION_TYPE)
  type: TRANSACTION_TYPE;

  @IsString()
  @IsNotEmpty()
  userEmail: string;
}
