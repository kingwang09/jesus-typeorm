import { TossPaymentDto } from "./payment.dto";

export class CreateTosspaymentDto {
    payment: TossPaymentDto;
}

export class ConfirmWidgetTosspaymentDto {
    paymentKey: string;
    orderId: string;
    amount: string;
}