import { Module } from '@nestjs/common';
import { TosspaymentsService } from './tosspayments.service';
import { TosspaymentsController } from './tosspayments.controller';
import { TossPayment } from './entities/tosspayment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TossPayment])
  ],
  controllers: [TosspaymentsController],
  providers: [TosspaymentsService],
  exports: [TosspaymentsService],
})
export class TosspaymentsModule {}
