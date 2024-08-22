export class TossPaymentDto{
    version: string;
    paymentKey: string;
    type: TossPaymentType;
    orderId: string;
    orderName: string;
    mId: string;
    currency: string;
    method: TossPaymentMethod;
    totalAmount: number;
    balanceAmount: number;
    status: TossPaymentStatus;
    requestedAt: string;
    approvedAt?: string;
    useEscrow: boolean;
    lastTransactionKey?: string;
    suppliedAmount: number;
    vat: number;
    cultureExpense: boolean;
    taxFreeAmount: number;
    taxExemptionAmount: number;
    cancels?: TossCanceled[];
    isPartialCancelable: boolean;
    card?: TossCard;
    virtualAccount?: TossVirtualAccount;
    secret?: string;
    mobilePhone?: TossMobilePhone;
    giftCertificate?: TossGiftCertificate;
    transfer?: TossTransfer;
    receipt?: TossReceipt;
    checkout?: TossCheckout;
    easyPay?: TossEasyPay;
    country: string;
    failure?: TossFailure;
    cashReceipt?: TossCashReceipt;
    //cacheReceipts: 부분 결제 취소 안하면 사용안해도 될듯
    discount?: TossDiscount;
}

enum TossPaymentType{
    normal = 'NORMAL',
    billing = 'BILLING',
    brandpay = 'BRANDPAY',
}

enum TossPaymentMethod{
    card = '카드', 
    virtualAccount = '가상계좌', 
    easyPay = '간편결제', 
    phone = '휴대폰', 
    bankTransfer = '계좌이체', 
    cultualVouchers = '문화상품권', 
    bookCultualVouchers = '도서문화상품권', 
    gameCultualVouchers = '게임문화상품권',
}

enum TossPaymentStatus{
    ready ='READY',
    in_progress = 'IN_PROGRESS',
    waiting_for_deposit = 'WAITING_FOR_DEPOSIT',
    done = 'DONE',
    canceled = 'CANCELED',
    partial_canceled = 'PARTIAL_CANCELED',
    aborted = 'ABORTED',
    expired = 'EXPIRED',
}

export class TossCanceled{
    cancelAmount: number;
    cancelReason: string;
    taxFreeAmount: number;
    taxExemptionAmount: number;
    refundableAmount: number;
    easyPayDiscountAmount: number;
    canceledAt: string;
    transactionKey: string;
    receiptKey?: string;
    cancelStatus: string;
    cancelRequestId?: string;
}

export class TossCard{
    amount: number;
    issuerCode: string;
    acquirerCode?: string;
    number: string;
    installmentPlanMonths: number; //일시불 = 0
    approveNo: string;
    useCardPoint: boolean;
    cardType: TossCardType;
    ownerType: TossOwnerType;
    acquireStatus: TossCardAcquireStatus;
    isInterestFree: boolean;
    interestPayer?: TossCardInterestPayer;
}

enum TossCardType{
    credit = '신용',
    check = '체크',
    gift = '기프트',
    unknown = '미확인',
}

enum TossOwnerType{
    personal = '개인',
    corperate = '법인',
    unknown = '미확인',
}

enum TossCardAcquireStatus{
    ready = 'READY',
    requested = 'REQUESTED',
    completed = 'COMPLETED',
    cancel_requested = 'CANCEL_REQUESTED',
    canceled = 'CANCELED',
}

enum TossCardInterestPayer{
    buyer = 'BUYER', //고객이 할부 수수료 부담
    card_company = 'CARD_COMPANY',
    merchant = 'MERCHANT',
}

export class TossVirtualAccount{
    accountType: string;
    accountNumber: string;
    bankCode: string;
    customerName: string;
    dueDate: string;
    refundStatus: string;
    expired: boolean;
    settlementStatus: string;
    refundReceiveAccount: TossRefundReceiveAccount;
}

export class TossRefundReceiveAccount{
    bank: string;
    accountNumber: string;
    holderName: string;
}

export class TossMobilePhone{
    customerMobilePhone: string;
    settlementStatus: string;
    receiptUrl: string;
}

export class TossGiftCertificate{
    approveNo: string;
    settlementStatus: string;
}

export class TossTransfer{
    bankCode: string;
    settlementStatus: string;
}

export class TossReceipt{
    url: string;
}

export class TossCheckout{
    url: string;
}

export class TossEasyPay{
    provider: string;
    amount: number;
    discountAmount: number;
}

export class TossFailure{
    code: string;
    message: string;
}

export class TossCashReceipt{
    type: string;
    receiptKey: string;
    issueNumber: string;
    receiptUrl: string;
    amount: number;
    taxFreeAmount: number;
}

export class TossDiscount{
    amount: number;
}