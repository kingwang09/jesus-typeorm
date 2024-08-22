import { Injectable } from '@nestjs/common';
import { CreateTosspaymentDto } from './dto/create-tosspayment.dto';
import { UpdateTosspaymentDto } from './dto/update-tosspayment.dto';
import { TossPaymentDto } from './dto/payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TossPayment } from './entities/tosspayment.entity';

@Injectable()
export class TosspaymentsService {
  constructor(
    @InjectRepository(TossPayment) 
    private paymentRepository: Repository<TossPayment>,
  ){}
  async create(createTosspaymentDto: CreateTosspaymentDto) {
    const newPayment: TossPayment = {
      payment: createTosspaymentDto.payment,
      createdAt: new Date(),
    }
    console.log('create: ', newPayment);
    await this.paymentRepository.save(newPayment);
    return `new Payment(id=${newPayment.id})`;
  }

  findAll() {
    return `This action returns all tosspayments`;
  }

  async findOne(id: number) {
    const findPayment = await this.paymentRepository.findOneBy({id: id});
    console.log('findPayment: ', JSON.stringify(findPayment));
    return findPayment;
  }

  update(id: number, updateTosspaymentDto: UpdateTosspaymentDto) {
    return `This action updates a #${id} tosspayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} tosspayment`;
  }
}
