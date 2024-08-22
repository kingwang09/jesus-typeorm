import { Injectable } from '@nestjs/common';
import { ConfirmWidgetTosspaymentDto, CreateTosspaymentDto } from './dto/create-tosspayment.dto';
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

  
  async confirmWidget(confirmDto: ConfirmWidgetTosspaymentDto) {
    // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // @docs https://docs.tosspayments.com/reference/using-api/api-keys
    const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedWidgetSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
    const { paymentKey, orderId, amount } = confirmDto;
    // 결제 승인 API를 호출하세요.
    // 결제를 승인하면 결제수단에서 금액이 차감돼요.
    // @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration#3-결제-승인하기
    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: encryptedWidgetSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      }),
    });
    if(response.ok){
      // TODO: 결제 완료 비즈니스 로직을 구현하세요.
      return await response.json();
    }
    // TODO: 결제 승인 실패 비즈니스 로직을 구현하세요.
    return {
      code: 'error'
    };
  }
}
